import { Application } from 'express';
import express from "express";
import {router} from "./routes/index.js";
import bodyParser from 'body-parser';

const app: Application = express();

app.use(bodyParser.json());
app.use('/api', router);
app.set('port', 8090);
const httpServer: any = app.listen(app.get('port'), () => {
    console.log('HTTP REST API Server running at http://localhost:' + httpServer.address().port);
});
