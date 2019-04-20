const express = require('express');
const router = require('express-promise-router')();
const upload = require('./uploader');
const util = require('util');

const singleUpload = util.promisify(upload.single('image'));

router.post('/image-upload', async (req, res, next) => {
    try {
        await singleUpload(req, res);
    } catch (error) {
        next(error);
        return;
    }
    if (!req.file) {
        const error = new Error();
        error.status = 400;
        error.message = 'File not uploaded';
        next(error);
        return;
    }
    return res.json({
        imageUrl: req.file.location,
    })
})

module.exports = router;