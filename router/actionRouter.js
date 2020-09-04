const express = require('express')
const router = express.Router()

const actions = require('../data/helpers/actionModel')

const { validateActionId, validateAction, validateProjectId } = require('./middleware')

//GET all actions, no validation required
router.get('/', (req, res) => {
    actions.get()
        .then(response => {
            res.status(200).json({ data: response })
        })
        .catch(error => {
            res.status(500).json({ message: 'there was an error retreving actions' })
        })
})

//GET action by Project Id -- validate ID
router.get('/:id', validateActionId, (req, res) => {
    const id = Number(req.params.id)
    actions.get(id)
        .then(response => {
            res.status(200).json({ data: response })
        })
        .catch(error => {
            res.status(500).json({ message: 'there was an error retreving actions' })
        })
})

//POST new action, validate req.body
router.post('/', validateProjectId, validateAction, (req, res) => {
    actions.insert(req.body)
        .then(response => {
            console.log(response)
            res.status(201).json({ data: response })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        })

})

//UPDATE existing action -- validate ID and req.body
router.put('/:id', validateActionId, validateAction, (req, res) => {
    const id = Number(req.params.id)
    actions.update(id, req.body)
        .then(response => {
            res.status(201).json({ data: response })
        })
        .catch(error => {
            res.status(500).json({ message: 'there was an error retreving actions' })
        })
})

//DELETE exsting action -- validate ID
router.delete('/:id', validateActionId, (req, res) => {
    const id = Number(req.params.id)
    actions.remove(id)
        .then(response => {
            //validation does not recognize NaN, validate here
            if (response > 0) {
                res.status(201).json({ message: 'successfully deleted action' })
            } else {
                res.status(404).json({ message: 'action by that ID cannot be found' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'there was an error retreving actions' })
        })

})

module.exports = router

// .then(response => {
//     console.log(response)
// })
// .catch(error => {
//     res.status(500).json({message: 'there was an error retreving actions'})
// })
