const projects = require('../../data/helpers/projectModel')
const actions = require('../../data/helpers/actionModel')

function validateProjectId(req, res, next) {
    const id = Number(req.params.id)
    projects.get(req.body.project_id || id)
        .then(response => {
            if (!response) {
                res.status(404).json({ message: 'No project by that ID was found' })
            } else {
                next()
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'There was an error retreiving that project' })
        })
}

function validateProject(req, res, next) {
    if (!req.body.name || !req.body.description) {
        res.status(401).json({ message: 'Please include name and description' })
    } else {
        next()
    }
}

function validateActionId(req, res, next) {
    actions.get(Number(req.params.id))
        .then(response => {
            if (!response) {
                res.status(404).json({ message: 'no action by that ID was found' })
            } else {
                next()
            }
        })
        .catch(error => {
            res.status(500).json({ message: error })
        })
}

function validateAction(req, res, next) {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(401).json({ message: 'project id, description, and notes required' })
    } else {
        next()
    }
}

module.exports = {
    validateProjectId,
    validateProject,
    validateActionId,
    validateAction
}