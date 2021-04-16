
const users = require('./routes/users');
const express = require('express');
const app = express();
const auth = require('./routes/auth');
const events = require('./routes/events');
const http = require('http').Server(app);
const mongoose = require('mongoose');
const cors = require("cors");

mongoose.connect('mongodb://localhost/react',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=> console.log('Connected to MongoDb...')
).catch(err => console.error("Could not connect to MongoDB..."));

app.use(cors());
app.use(express.json());

app.use('/api/users', users);
app.use('/api/auth/',auth);
app.use('/api/events', events);

const port = 5000;
http.listen(port, () => console.log(`Listening on port ${port}...`));
