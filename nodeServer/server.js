import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import router from "./route.js";
var app = express();
var port = 3000;


const options = {
    origin: 'http://localhost:5173',
}
app.use(cors(options));

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors())

app.use('/', router);

app.listen(port, ()=> {
    console.log(`Node server is listening on port ${port}`)
});

export default app;