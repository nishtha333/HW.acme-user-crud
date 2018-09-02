const db = require('../db');
const { Users } = db.models;

const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', (req, res, next) => {
    Users.findAll()
        .then(users => res.send(users))
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    Users.findById(req.params.id)
        .then(user => res.send(user))
        .catch(next);
});

router.post('/', (req, res, next) => {
    Users.create(req.body)
        .then(user => res.send(user))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Users.destroy( {where: {id: req.params.id} })
        .then(() => res.sendStatus(200))
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    db.updateUser(req.params.id, req.body)
        .then(user => res.send(user))
        .catch(next);
});


