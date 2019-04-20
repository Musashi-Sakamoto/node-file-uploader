const express = require('express');
const router = require('express-promise-router')();
const upload = require('./uploader');
const util = require('util');

const singleUpload = util.promisify(upload.single('image'));

router.post('/image-upload', async (req, res, next) => {
    let result;
    try {
        result = await singleUpload(req, res);
    } catch (error) {
        next(error);
    }
    return res.json({
        imageUrl: req.file.location,
    })
})

module.exports = router;