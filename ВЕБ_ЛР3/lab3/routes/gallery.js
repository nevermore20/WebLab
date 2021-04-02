import express from 'express'
import Picture from "../models/Picture"

var router = express.Router();

router.get('/get', (req, res) => {//приходит id
    try {
        res.send({status: 'success', data: Picture.getEntity(req.query.id ? req.query.id : undefined)});
    } catch (e) {
        res.send({status: 'error', data: e});
    }
});

router.get('/card', (req, res) => {
    try {
        res.render('gallery/picture_card', {picture: Picture.getEntity(req.query.id), id: req.query.id})
    } catch (e) {
        res.send({status: 'error', data: e});
    }
});

router.post('/create', (req, res) => {
    let id = Picture.addEntity(undefined, Picture.pictureFromRequest(req.body));
    if (req.files.image_preview) {
        req.files.image_preview.mv(`public/img/preview/${id}.${req.files.image_preview.name.split('.')[1]}`)
    }
    res.send({status: 'success', data: {id}});
});

router.get('/create', (req, res) => res.render('gallery/create', {picture: new Picture()}));

router.post('/update', (req, res) => {
    let id = Picture.addEntity(req.query.id, Picture.pictureFromRequest(req.body));
    if (req.files.image_preview) {
        req.files.image_preview.mv(`public/img/preview/${id}.${req.files.image_preview.name.split('.')[1]}`)
    }
    res.send({status: 'success', data: {id}});
});

router.get('/update', (req, res) => {
    try {
        res.render('gallery/update', {picture: Picture.getEntity(req.query.id)})
    } catch (e) {
        res.send({status: 'error', data: e});
    }
});

router.delete('/delete', (req, res) => {
    Picture.deleteEntity(req.query.id);
    res.send({status: 'success'});
});

export default router;