const express = require('express');
const cors = require('cors');

const server = express();

const db = require('./data/db.js');

server.use(cors());

server.post('/api/users', (req, res) => {
	const user = req.params;
	if (!user.name || !user.bio) {
		res.status(400).json({
			errorMessage: "Please provide name and bio for the user."
		});
	} else {
		db.insert({
			name: user.name,
			bio: user.bio,
		}).then(data => {
			console.log('response', data);
			res.status(201).json(data);
		}).catch(err => {
			console.log(err);
			res.status(500).json({ error: "There was an error while saving the user to the database" })
		});
	}
});

server.get('/api/users', (req, res) => {
	db.find().then(data => {
		res.status(201).json(data);
	}).catch(err => {
		console.log(err);
		res.status(500).json({ error: "The users information could not be retrieved." })
	});
});

server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;
	if(!id || Number(id) < 0) {
		res.status(404).json({ message: "The user with the specified ID does not exist." });
	}
	db.findById(id).then(data => {
		res.status(201).json(data);
	}).catch(err => {
		console.log(err);
		res.status(500).json({ error: "The user information could not be retrieved." })
	});
});

server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;
	if(!id || Number(id) < 0) {
		res.status(404).json({ message: "The user with the specified ID does not exist." });
	}
	db.remove(id).then(data => {
		res.status(201).json(data);
	}).catch(err => {
		console.log(err);
		res.status(500).json({ error: "There was an error while saving the user to the database" })
	});
});

server.put('/api/users/:id', (req, res) => {
	const user = req.params;
	db.update(user.id, {
		name: user.name,
		bio: user.bio,
	}).then(data => {
		console.log('response', data);
		res.status(201).json(data);
	}).catch(err => {
		console.log(err);
		res.status(500).json({ error: "There was an error while saving the user to the database" })
	});
});

server.get('*', (req, res) => {
	res.status(404).json({ errorMessage: 'Page not found!' })
});

server.listen(process.env.PORT || 3000, () => {
	console.log('Listening at port', (process.env.PORT || 3000));
});