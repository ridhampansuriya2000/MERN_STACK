const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");

const router = require("./src/router/register");
const app = express();

//Backend Errors
const cors = require('cors');
app.use(cors());
//database connection
require("./mongo")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);
//multer-using-fileupload-------------->


app.use(cookieParser());


app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
res.header("Access-Control-Allow-Methods", "*");
next();
});

app.use(express.static(__dirname + '/public/uploads'));

//conection to PORT
app.listen(3001, () => {
    console.log(`Server started on port 3001`);
});