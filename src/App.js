import React, { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./screens/Home";
import AddUser from "./screens/AddUser";
import EditUser from "./screens/EditUser";
import NotFound from "./screens/NotFound";

const App = () => {
	const [data, setData] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);

	const calcAge = (birthDate) => Math.floor((Date.now() - new Date(birthDate)) / (365 * 24 * 60 * 60 * 1000));

	const changeCurrentUser = (users, currentUserId) => {
		setCurrentUser(users.find((user) => user.id === currentUserId) || users[0]);
	};

	const addUser = (newUserData) => {
		const URL = "http://localhost:8000/users";

		fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newUserData),
		}).then(console.log);
	};

	const editUser = (userId, newUserData) => {
		console.log(userId);
		const URL = "http://localhost:8000/users/" + userId;

		fetch(URL, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newUserData),
		}).then(console.log);
	};

	const deleteUser = ({ userId }) => {
		const URL = "http://localhost:8000/users/" + userId;

		fetch(URL, {
			method: "DELETE",
		}).then(console.log);
	};

	useEffect(() => {
		fetch("http://localhost:8000/users")
			.then((res) => res.json())
			.then((users) => {
				setData(users.map((user) => ({ ...user, age: calcAge(user.birth_date) })));
				setCurrentUser(users[0]);
			});
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					exact
					path="/"
					element={
						<Home
							data={data}
							setData={setData}
							currentUser={currentUser}
							changeCurrentUser={changeCurrentUser}
							deleteUser={deleteUser}
						/>
					}
				/>
				<Route exact path="/add" element={<AddUser data={data} setData={setData} addUser={addUser} />} />
				<Route
					exact
					path="/edit/:userId"
					element={<EditUser data={data} setData={setData} editUser={editUser} />}
				/>
				<Route exact path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
