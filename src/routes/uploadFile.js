const AWS = require('aws-sdk');

// Enter the name of the bucket that you have created here
const BUCKET_NAME = process.env.AWS_BUCKET;

// Initializing S3 Interface
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

// Method for uploading file into the AWS S3 bucket
const uploadFile = async (file, fileName) => {
    // Upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file.buffer
    };

    // Upload the file
    s3.upload(params, function(err, data) {
        if (err) throw err 
        console.log(`File uploaded successfully. ${data.Location}`)
    });
};

exports.uploadFile = uploadFile;