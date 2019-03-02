const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/app');
const nodemailer = require('nodemailer');

const Users = mongoose.model('Users');

let transporter = nodemailer.createTransport({
    sevice: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: 'samuraiskizakon@gmail.com',
        pass: 'wasatank12345'
    },
    tlc: {
        rejectUnauthorized: false
    }
});

const signIn = (req, res) => {
    const { email, password } = req.body;
    Users.findOne({ useremail: email })
        .exec()
        .then((user) => {
            if (!user) {
                res.status(401).json({ message: 'user does not exist!' });
            }
            const isValid = bCrypt.compareSync(password, user.userpass);
            if (isValid) {
                const token = jwt.sign(user, jwtSecret);
                res.json({ token });
            } else {
                res.status(401).json({ message: 'invalid password' });
            }
        })
        .catch(err => res.status(500).json({ message: err.message }));

};

const getAllUsers = (req, res) => {
    Users.find()
        .exec()
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));

};
const createUser = async(req, res) => {
    const salt = bCrypt.genSaltSync(10);
    const newuser = {
        username: req.body.username,
        userpass: bCrypt.hashSync(req.body.userpass, salt),
        useremail: req.body.useremail,
        isblock: req.body.isblock,
        isadmin: req.body.isadmin,
        isverify: req.body.isverify
    }
    Users.create(newuser)
        .then(createusers => res.json(createusers))
        .catch(err => res.status(500).json(err));
    const regtoken = jwt.sign(newuser, jwtSecret);
    let mailOptions = {
        from: 'samuraiskizakon@gmail.com',
        to: newuser.useremail,
        subject: "VERIFY",
        text: "Click to link to verify email",
        html: "<a href=\"http://localhost:5000/verify/" + regtoken + "\">Click yet</a>"
    };
    console.log(regtoken);
    let info = await transporter.sendMail(mailOptions);
};

const verifyUser = (req, res) => {
    const User = jwt.verify(req.params.regtoken, jwtSecret);
    Users.findOneAndUpdate({ username: User.username, useremail: User.useremail }, { isverify: true })
        .exec()
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
};

const updateUser = (req, res) => {
    Users.findOneAndUpdate({ username: req.params.username }, req.body)
        .exec()
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
};

const removeUser = (req, res) => {
    Users.deleteOne({ username: req.params.username })
        .exec()
        .then(() => res.json({ success: true }))
        .catch(err => res.status(500).json(err));
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    removeUser,
    signIn,
    verifyUser
};