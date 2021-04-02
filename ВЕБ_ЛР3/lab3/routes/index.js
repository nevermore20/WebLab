import express from 'express'
import Config from "../models/Config";

var router = express.Router();

router.get('/', (req, res) => res.redirect('/gallery'));

router.get('/gallery', (req, res) => res.render('gallery/index'));

router.get('/participant', (req, res) => res.render('participant/index'));

router.post('/config', (req, res) => {
    Config.addEntity('main', Config.configFromRequest(req.body));
    res.redirect('/config');
});

router.get('/config', (req, res) => {
    try {
        res.render('config/index', {config: Config.getEntity('main')})
    } catch (e) {
        res.render('config/index', {config: new Config()})
    }
});

export default router