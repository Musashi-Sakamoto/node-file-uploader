const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { promisify } = require('util');

let s3config = {
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: 'ap-northeast-1'
};

if (process.env.NODE_ENV !== 'production') {
  s3config = {
    ...s3config,
    endpoint: process.env.STORAGE_ENDPOINT,
    s3ForcePathStyle: true
  };
}

const s3 = new aws.S3(s3config);
const getSignedUrlAsync = promisify(s3.getSignedUrl.bind(s3));

const getS3SignedUrl = async (key, op = 'getObject') => {
  if (process.env.NODE_ENV !== 'production') {
    s3.endpoint = 'http://localhost:9000';
  }
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key
  };
  return getSignedUrlAsync(op, params);
};

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.BUCKET_NAME,
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      const extArray = file.mimetype.split('/');
      const extension = extArray[extArray.length - 1];
      cb(null, `${req.user.id}-${file.originalname}.${extension}`);
    }
  })
});

const deleteS3Object = (key) => {
  if (process.env.NODE_ENV !== 'production') {
    s3.endpoint = process.env.STORAGE_ENDPOINT;
  }
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key
  };
  return s3.deleteObject(params).promise();
};

module.exports = {
  deleteS3Object,
  upload,
  getS3SignedUrl
};
