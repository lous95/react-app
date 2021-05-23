
const users = require('./routes/users');
const express = require('express');
const app = express();
const auth = require('./routes/auth');
const events = require('./routes/events');
const http = require('http').Server(app);
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");
// const __dirname = path.resolve();

mongoose.connect(process.env.MONGODB_URL  || 'mongodb://localhost/react',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=> console.log('Connected to MongoDb...')
).catch(err => console.error("Could not connect to MongoDB..."));

app.use(cors());
app.use(express.json());

app.use(express.static('/frontend/build'));
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
// );

app.use('/api/users', users);
app.use('/api/auth/',auth);
app.use('/api/events', events);

const port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Listening on port ${port}...`));
