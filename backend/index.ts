import express, { Response } from 'express';
import config from './config';
import { authorize } from './services/authService';
require('./server');
const app = express();

app.use((req, res: Response, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
    res.header("Access-Control-Allow-Headers", "Authorization, authorization, Origin, X-Requested-With, Content-Type, Accept");

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else
        next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(async (req, res, next) => {
    try {
        if(req.body.password === undefined)
            return res.sendStatus(400);
        let token = await authorize(req.body.password);
        return res.status(200).json({
            token: token
        });
    }
    catch(e) {
        return res.status(400).json({
            error: e.message
        });
    }
});

app.listen(config.port, config.host, 0, () => {
    console.log(`App is running on ${config.host}:${config.port}`);
});