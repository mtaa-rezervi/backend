const express = require('express');
const { verifyJWT } = require('../middleware');
const Message = require('../../models/Messages');
const User = require('../../models/Users');

const router = express.Router();

// Returns a list of users
router.get('/:id', verifyJWT, async (req, res) => {
    const mongoQuery = {
        $or: [
            { from: req.params.id },
            { to: req.params.id }
        ]
    };

    // Find users with whose the specified user started a dm
    const usersFrom = await Message.distinct('to', mongoQuery);
    const usersTo = await Message.distinct('from', mongoQuery);

    let union = new Set([
      ...usersFrom.map(user => user.toString()), 
      ...usersTo.map(user => user.toString())
    ]);
    union.delete(req.params.id);
    //console.log(union);

    const users = await User.find({ _id: { $in: [...union] }},
      {_id: 1, "name.first_name": 1, "name.last_name": 1, "credentials.username": 1, profile_pic: 1}
    );
    
    res.send(users);
});

module.exports = router;