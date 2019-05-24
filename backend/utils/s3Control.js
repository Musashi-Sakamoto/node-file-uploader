const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { promisify } = require('util');

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: 'ap-northeast-1',
  endpoint: process.env.STORAGE_ENDPOINT,
  s3ForcePathStyle: true,
  signatureVersion: 'v4'
});

const s3 = new aws.S3();
const getSignedUrlAsync = promisify(s3.getSignedUrl.bind(s3));

const getS3SignedUrl = async (key, op = 'getObject') => {
  const params = {
    Bucket: 'images',
    Key: key
  };
  return getSignedUrlAsync(op, params);
};

const s3ForMinio = new aws.S3();
s3ForMinio.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: 'ap-northeast-1',
  endpoint: process.env.STORAGE_ENDPOINT_MINIO,
  s3ForcePathStyle: true,
  signatureVersion: 'v4'
});
const upload = multer({
  storage: multerS3({
    s3: s3ForMinio,
    bucket: 'images',
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    }
  })
});

const deleteS3Object = (key) => {
  const params = {
    Bucket: 'images',
    Key: key
  };

  return s3.deleteObject(params).promise();
};

module.exports = {
  deleteS3Object,
  upload,
  getS3SignedUrl
};
