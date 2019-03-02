const mongoose = require('mongoose');

const InstructionSchema = new mongoose.Schema({
    InstructionName: String,
    UserName: String,
    InstructionTitle: String,
    InstructionImg: String,
    InstructionContent: String,
    InstructionTegs: String
});

mongoose.model('Instruction', InstructionSchema);