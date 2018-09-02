const express = require('express');
const app = express();

module.exports = app;

app.use(express.json());
app.use('/api/users', require('./api/users'));

app.use((req, res, next) => {
    let error = new Error("Could not find the resource");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || "Error occurred with the request");
});