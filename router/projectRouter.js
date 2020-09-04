const express = require('express')
const router = express.Router()

const projects = require('../data/helpers/projectModel')

const { validateProjectId, validateProject } = require('./middleware')

//GET all projects
router.get('/', (req, res) => {
    projects.get()
        .then(response => {
            res.status(200).json({ data: response })
        })
        .catch(error => {
            res.status(500).json({ message: 'there was an error retrieving projects' })
        })
})

//GET project by id (validate with middleware)
router.get('/:id', validateProjectId, (req, res) => {
    const id = req.params.id
    projects.get(id)
        .then(response => {
            res.status(200).json({ data: response })
        })
        .catch(error => {
            res.status(500).json({ message: 'there was an error retrieving projects' })
        })
})

//GET all actions by project id (validate ID)
router.get('/:id/actions', validateProjectId, (req, res) => {
    const id = Number(req.params.id)
    projects.getProjectActions(id)
        .then(response => {
            res.status(200).json({ data: response })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        })
})

//POST new project (validate req.body middlware)
router.post('/', validateProject, (req, res) => {
    projects.insert(req.body)
        .then(response => {
            res.status(201).json({ message: 'successfully added new project' })
        })
        .catch(error => {
            res.status(500).json({ message: 'there was an error trying to add new project' })
        })
})

//PUT edit existing project (validate ID and req.body)
router.put('/:id', validateProjectId, validateProject, (req, res) => {
    const id = Number(req.params.id)
    projects.update(id, req.body)
        .then(response => {
            //if passing a string to validateProjectId, it will not return null, need to check here too
            if (!response) {
                res.status(404).json({ message: 'project by that ID cannot be found' })
            } else {
                res.status(201).json({ message: 'successfully updated the project' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'there was an error updating that project' })
        })
})

//DELETE existing project (validate ID)
router.delete('/:id', validateProjectId, (req, res) => {
    const id = Number(req.params.id)
    projects.remove(id)
        .then(response => {
            if (response > 0) {
                res.status(201).json({ message: 'successfully deleted user' })
            } else {
                //validateProjectId does not check for NaN, but this will return 0 if NaN was entered
                res.status(404).json({ message: 'user by that ID cannot be found' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'there was a problem deleting that project' })
        })
})

module.exports = router