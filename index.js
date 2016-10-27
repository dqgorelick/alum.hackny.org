const path = require('path');
const express = require('express');
const app = express();
const basicAuth = require('basic-auth');

const PORT = process.env.DEVELOPMENT ? 8000 : 9000;
const LOGIN = process.env.LOGIN;
const PASSWORD = process.env.PASSWORD;

authenticate = (username, password) => {
    return (req, res, next) => {
        const user = basicAuth(req);

        if (!user || user.name !== username || user.pass !== password) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            return res.sendStatus(401);
        }
        next();
    };
};

if (!LOGIN || !PASSWORD) {
    console.error('please set ENV variables for LOGIN and PASSWORD');
} else {
    app.use('/', authenticate(LOGIN, PASSWORD));
    app.use(express.static(path.join(__dirname, 'public')));
    app.listen(PORT, () => {
        console.log(`serving public on ${PORT}`);
    });
}

