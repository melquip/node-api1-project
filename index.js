const express = require('express');
const cors = require('cors');

const server = express();

const db = require('./data/db.js');

server.use(express.json());
server.use(cors());

server.post('/api/users', (req, res) => {
	const user = req.body;
	if (!user.name || !user.bio) {
		res.status(400).json({ errorMessage: "Please provide name and bio for the user." }).end();
	}
	db.insert({
		name: user.name,
		bio: user.bio,
	}).then(data => {
		console.log('response', data);
		res.status(201).json(data);
	}).catch(err => {
		console.log(err);
		res.status(500).json({ error: "There was an error while saving the user to the database" }).end();
	});
});

server.get('/api/users', (req, res) => {
	db.find().then(data => {
		res.status(200).json(data);
	}).catch(err => {
		console.log(err);
		res.status(500).json({ error: "The users information could not be retrieved." }).end();
	});
});

server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;
	db.findById(id).then(data => {
		if (!data) {
			res.status(404).json({ message: "The user with the specified ID does not exist." });
		}
		res.status(200).json(data);
	}).catch(err => {
		console.log(err);
		res.status(500).json({ error: "The user information could not be retrieved." }).end();
	});
});

server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;
	db.remove(id).then(data => {
		if (!data) {
			res.status(404).json({ message: "The user with the specified ID does not exist." });
		}
		res.status(200).json(data);
	}).catch(err => {
		console.log(err);
		res.status(500).json({ error: "The user could not be removed" }).end();
	});
});

server.put('/api/users/:id', (req, res) => {
	const { id } = req.params;
	const user = req.body;
	if (!user.name || !user.bio) {
		res.status(400).json({ errorMessage: "Please provide name and bio for the user." }).end();
	}
	db.update(id, {
		name: user.name,
		bio: user.bio,
	}).then(data => {
		if (!data) {
			res.status(404).json({ message: "The user with the specified ID does not exist." });
		}
		res.status(200).json(data);
	}).catch(err => {
		console.log(err);
		res.status(500).json({ error: "The user information could not be modified." }).end();
	});
});

server.get('*', (req, res) => {
	res.status(404).json({ errorMessage: 'Page not found!' })
});

server.listen(process.env.PORT || 4000, () => {
	console.log('Listening at port', (process.env.PORT || 4000));
});