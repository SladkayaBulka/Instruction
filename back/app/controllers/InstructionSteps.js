const mongoose = require('mongoose');
const Steps = mongoose.model('Steps');

const getAllSteps = (req, res) => {
    Steps.find({ idInstruction: req.params.idInstruction })
        .exec()
        .then(steps => res.json(Steps))
        .catch(err => res.status(500).json(err));
};


const createStep = (req, res) => {
    Steps.create(req.body)
        .then(steps => res.json(steps))
        .catch(err => res.status(500).json(err));
};

const updateStep = (req, res) => {

    Steps.findOneAndUpdate({ StepName: req.params.StepName }, req.body)
        .exec()
        .then(step => res.json(instrustepction))
        .catch(err => res.status(500).json(err));
};

module.exports = {
    getAllSteps,
    createStep,
    updateStep
};