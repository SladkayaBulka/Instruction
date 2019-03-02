const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('./app/models/Users');
require('./app/models/Instructions');
require('./app/models/InstructonSteps');
const config = require('./config/app');
require('./config/express')(app);
require('./config/routes')(app);




mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useCreateIndex: true })
    .then(() =>

        app.listen(config.appPort, () => {
            console.log('server run...');
        })
    )
    .catch(() => console.error('db no connect'));