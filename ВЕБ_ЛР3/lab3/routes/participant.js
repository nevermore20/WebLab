import express from 'express'
import Participant from "../models/Participant"

var router = express.Router();

router.get('/get', (req, res) => {
    try {
        res.send({status: 'success', data: Participant.getEntity(req.query.id ? req.query.id : undefined)});
    } catch (e) {
        res.send({status: 'error', data: e});
    }

});

router.post('/create', (req, res) => {
    let id = Participant.addEntity(undefined, Participant.participantFromRequest(req.body));
    res.send({status: 'success', data: {id}});
});

router.get('/create', (req, res) => res.render('participant/create', {participant: new Participant()}));

router.post('/update', (req, res) => {
    let id = Participant.addEntity(req.query.id, Participant.participantFromRequest(req.body));
    res.send({status: 'success', data: {id}});
});

router.get('/update', (req, res) => {
    try {
        res.render('participant/update', {participant: Participant.getEntity(req.query.id)})
    } catch (e) {
        res.send({status: 'error', data: e});
    }
});

router.delete('/delete', (req, res) => {
    Participant.deleteEntity(req.query.id);
    res.send({status: 'success'});
});

export default router;