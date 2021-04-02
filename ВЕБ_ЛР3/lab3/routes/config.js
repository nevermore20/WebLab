import express from 'express'

var router = express.Router();

router.post('/', (req, res) => {
    let id = ParticipantList.addParticipant(undefined, Participant.participantFromRequest(req.body));
    res.send({status: 'success', data: {id}});
});

router.get('/', (req, res) => res.render('participant/create', {participant: new Participant()}));

export default router;