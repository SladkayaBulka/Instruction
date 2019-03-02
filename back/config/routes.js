const users = require('../app/controllers/users');
const instruction = require('../app/controllers/Instruction');
const steps = require('../app/controllers/InstructionSteps');
const authMidleware = require('../auth');
module.exports = (app) => {
    app.get('/users', users.getAllUsers);
    app.post('/users', users.createUser);
    app.put('/users/:username', authMidleware, users.updateUser);
    app.delete('/users/:username', users.removeUser);
    app.post('/signIn', users.signIn);
    app.get('/instruction', instruction.getAllInstruction);
    app.post('/instruction', instruction.createInstruction);
    app.put('/instruction/:InstructionName', instruction.updateInstruction);
    app.post('/instruction/:UserName', instruction.getUserInstruction);
    app.post('/steps', steps.createStep);
    app.put('/steps/:StepName', steps.updateStep);
    app.post('/steps/:idInstruction', steps.getAllSteps);
    app.get('/verify/:regtoken', users.verifyUser);
};