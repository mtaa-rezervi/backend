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
async function uploadFile(file, fileName) {
    // Upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file.buffer
    };

    // Upload the file
    const dataURL = s3.upload(params).promise().then(function(data) {
        //console.log(`File uploaded successfully. ${data.Location}`);
        return data.Location;
    }).catch(function(err) {
        if (err) throw err 
    });

    return dataURL;
};

exports.uploadFile = uploadFile;