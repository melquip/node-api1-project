const express = require('express');
const cors = require('cors');

const server = express();

const db = require('./data/db.js');

server.use(cors());

server.post('/api/users', (req, res) => {
	
});

server.get('*', (req, res) => {
	console.log('cool')
});

server.listen(process.env.PORT || 3000, () => {
	console.log('Listening at port', (process.env.PORT || 3000));
});