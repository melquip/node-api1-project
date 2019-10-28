import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		axios.get('http://localhost:3000/api/users').then(response => {
			console.log(response);
		}).catch(err => console.log(err));
	}, [])
	return (
		<div className="App">
			{
				users ? users.map(user => (
					<div className="user">
						<p>ID: {user.id}</p>
					</div>
				)) : null
			}
		</div>
	);
}

export default App;
