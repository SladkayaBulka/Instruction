const mongoose = require('mongoose');

const StepSchema = new mongoose.Schema({
    idInstruction: String,
    StepName: String,
    StepTitle: String,
    StepImg: String,
    StepContent: String
});

mongoose.model('Steps', StepSchema);