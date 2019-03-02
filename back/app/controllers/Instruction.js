const mongoose = require('mongoose');
const Instruction = mongoose.model('Instruction');

const getAllInstruction = (req, res) => {
    Instruction.find()
        .exec()
        .then(instruction => res.json(instruction))
        .catch(err => res.status(500).json(err));
};

const getUserInstruction = (req, res) => {
    Instruction.find({ UserName: req.params.UserName })
        .exec()
        .then(instruction => res.json(instruction))
        .catch(err => res.status(500).json(err));
};

const createInstruction = (req, res) => {
    Instruction.create(req.body)
        .then(instruction => res.json(instruction))
        .catch(err => res.status(500).json(err));
};

const updateInstruction = (req, res) => {

    Instruction.findOneAndUpdate({ InstructionName: req.params.InstructionName }, req.body)
        .exec()
        .then(instruction => res.json(instruction))
        .catch(err => res.status(500).json(err));
};

module.exports = {
    getAllInstruction,
    getUserInstruction,
    createInstruction,
    updateInstruction
};