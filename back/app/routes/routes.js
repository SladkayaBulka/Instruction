module.exports = function(app, db) {
    app.post('/addUser', (req, res) => {
        res.send('Hello')
    });
};