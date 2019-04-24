const AWS = require('aws-sdk');
const { promisify } = require('util');

const s3 = new AWS.S3({
  signatureVersion: 'v4'
});

const getSignedUrlAsync = promisify(s3.getSignedUrl);

const getS3PresignedUrl = async (key, op = 'getObject') => {
  const params = {
    Bucket: 'images',
    Key: key
  };
  return getSignedUrlAsync(op, params);
};

const deleteS3Object = (key) => {
  const params = {
    Bucket: 'images',
    Key: key
  };

  return s3.deleteObject(params).promise();
};

module.exports = {
  getS3PresignedUrl,
  deleteS3Object
};
