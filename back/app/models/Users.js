const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    username: { type: String, required: true, lowercase: true, unique: true },
    userpass: { type: String, required: true },
    useremail: { type: String, required: true, lowercase: true, unique: true },
    isblock: { type: Boolean, required: true, default: false },
    isadmin: { type: Boolean, required: true, default: false },
    isverify: { type: Boolean, required: true, default: false },
});

mongoose.model('Users', UsersSchema);