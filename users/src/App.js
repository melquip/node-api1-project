import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:4000/api/users').then(response => {
			setUsers(response.data);
		}).catch(err => console.log(err));
	}, []);

	const addUser = e => {
		const newUser = {
			name: "Oladimeji",
			bio: "My bio is awesome"
		}
		axios.post('http://localhost:4000/api/users', newUser).then(response => {
			setUsers([...users, { ...newUser, id: response.data.id }]);
		}).catch(err => console.log(err));
	}
	
	const removeUser = id => e => {
		axios.delete('http://localhost:4000/api/users/' + id).then(response => {
			setUsers(users.filter(user => Number(user.id) !== Number(id)));
		}).catch(err => console.log(err));
	}

	return (
		<div className="App">
			{
				users ? users.map(user => (
					<div key={user.id} className="user">
						<p>ID: {user.id}</p>
						<p>Name: {user.name}</p>
						<p>Bio: {user.bio}</p>
						<button className="removeUser" onClick={removeUser(user.id)}>Remove</button>
					</div>
				)) : null
			}
			<br />
			<button className="addUser" onClick={addUser}>Add user</button>
		</div>
	);
}

export default App;
