require('./config/config');
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const Debug = require('debug');

// parse applicattion /x-www/form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(require('./config/headers'));
dotenv.config();
const debug = new Debug('backend-api:root');
app.use(require('./api/routes/indexRoutes'));

app.set('view engine', 'ejs');
console.log(' dir name node', __dirname + 'public');
app.use(express.static(__dirname + 'public'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, resp) => {
    if (err) console.log(err)
    console.log('DB Connection sucessfully', process.env.URLDB);
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
});