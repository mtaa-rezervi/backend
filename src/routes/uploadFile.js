const AWS = require('aws-sdk');

// Initializing S3 Interface
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

// Method for uploading files into the AWS S3 bucket
const uploadFile = async (file, fileName) => {
    // Upload parameters
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileName,
        Body: file.buffer
    };

    // Upload the file
    const dataURL = s3.upload(params).promise().then(function(data) {
        return data.Location;
    }).catch(function(err) {
        if (err) throw err;
    });

    return dataURL;
};

exports.uploadFile = uploadFile;