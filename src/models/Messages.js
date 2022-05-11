const mongoose = require('mongoose');
const Schema = mongoose;

const messageSchema = new mongoose.Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    time: { type: Date, required: true },
    message: { type: String }
}, {versionKey: false});

messageSchema.set('timestamps', {
    createdAt: 'created_at', 
    updatedAt: 'updated_at' 
});

module.exports = mongoose.model('Message', messageSchema);