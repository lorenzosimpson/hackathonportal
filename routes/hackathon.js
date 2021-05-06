const express = require('express')
const router = express.Router()
const Hackathon = require('../database/models/hackathon')
const User = require('../database/models/user');

router.post('/', (req, res) => {
    console.log('hackathon creation');

    const newHackathon = new Hackathon(req.body)
    newHackathon.save((err, savedHackathon) => {
        if (err) {
            console.log(err)
            return res.status(400).json(err)
        }
        else {
            res.status(201).json(savedHackathon)
        }
    })
})

router.get('/explore', (req, res) => {
    // returns 4 random hackathons from present and future
    const date = new Date()
    Hackathon.aggregate([
        { $match: { start_date: { $gte: date } } },
        { $sample: { size: 3 } }]
        , (err, hackathons) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).json(hackathons)
            }
        })
})

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    if (req.user) {
        const userID  = req.user._id;
        User.findById(userID, (err, user) => {
            if (err) {
                console.log('could not find user id, returning all hackathons')
                returnAllHackathons()
            }
            else {
                Hackathon.find({ _id: { $nin: user.hackathons } }, (err, hackathons) => {
                    if (err) res.status(500).json({ error: 'Could not find hackathons that the user is not currently associated with' })
                    else {
                        console.log('\n === user found, returning hackathons available for them === ')
                        res.status(200).json(hackathons)
                    }
                })
            }
        })
    } else {
        returnAllHackathons()
    }
    function returnAllHackathons() {
        Hackathon.find((err, hackathons) => {
            if (err) return res.status(500).json({ error: err })
            if (hackathons.length) {
                return res.json(hackathons)
            }
        })
    }
})

router.get('/u/:id', (req, res) => {
    const userId = req.params.id;
    console.log('\nUserId', userId)
    User.findById(userId, (err, user) => {
        if (err) {
            console.log('err finding user', err)
            res.status(500).json(err)
        }
        else {
            Hackathon.find({ _id: { $in: user.hackathons } })
                .then(hackathons => res.status(200).json(hackathons))
                .catch(err => res.status(500).json(err))
        }
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Hackathon.findById(id, (err, hackathon) => {
        if (err) {
            console.log(err)
            res.status(500).json(err)
        }
        res.status(200).json(hackathon)
    })
})



module.exports = router