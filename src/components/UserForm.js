import React, { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import TextField from "@mui/material/TextField";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import BackBtn from "./BackBtn";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const skillNames = ["React", "Angular", "Vue", "JavaScript", "TypeScript", "Flutter", "PHP"];

const UserForm = ({ formType, addUser, editUser, data, setData }) => {
	const { userId } = useParams();
	const navigate = useNavigate();
	let currentUser;
	if (formType === "edit") {
		currentUser = data.find((user) => user.id === userId);
	}

	const [userFirstName, setFirstName] = useState(currentUser ? currentUser.full_name.split(" ")[0] : "");
	const [userLastName, setLastName] = useState(currentUser ? currentUser.full_name.split(" ")[1] : "");
	const [userMobile, setUserMobile] = useState("");
	const [userEmail, setEmail] = useState(currentUser ? currentUser.user_email : "");
	const [userBirthDate, setUserBirthDate] = useState(currentUser ? currentUser.birth_date : "2019-12-31");
	const [userSkills, setUserSkills] = useState(currentUser ? currentUser.skills : []);

	const handleSkillsSelection = (event) => {
		const {
			target: { value },
		} = event;
		setUserSkills(
			// On autofill we get a the stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let newUserData;
		switch (formType) {
			case "add":
				const randomId = Math.random().toString(36).slice(2);
				const userAvatar = "http://placehold.it/320x320/" + Math.floor(Math.random() * (999 - 100) + 100);
				newUserData = {
					id: randomId,
					user_avatar: userAvatar,
					full_name: userFirstName + " " + userLastName,
					user_email: userEmail,
					birth_date: userBirthDate,
					skills: userSkills,
				};
				setData([...data, newUserData]);
				addUser(newUserData);
				navigate("/");
				break;
			case "edit":
				newUserData = {
					user_avatar: "http://placehold.it/320x320/000",
					full_name: userFirstName + " " + userLastName,
					user_email: userEmail,
					birth_date: userBirthDate,
					skills: userSkills,
				};
				let copyData = JSON.parse(JSON.stringify(data));
				const currentUserIndex = copyData.findIndex((user) => user.id === userId);
				copyData[currentUserIndex] = { ...copyData[currentUserIndex], ...newUserData };

				setData(copyData);
				editUser(userId, newUserData);
				navigate("/");
				break;
		}
	};

	return (
		<>
			<BackBtn />
			<Typography sx={{ textAlign: "center", m: 5 }} component="h1" variant="h5">
				{formType === "edit" ? "Edit user: " + currentUser.full_name : "Add new user"}
			</Typography>
			<Box sx={{ maxWidth: 460, margin: "0 auto" }}>
				<form onSubmit={(e, userId) => handleSubmit(e, userId)}>
					<Stack spacing={3}>
						<TextField
							value={userFirstName}
							onChange={(e) => setFirstName(e.target.value)}
							label="First Name"
							variant="outlined"
							inputProps={{
								required: "required",
							}}
						/>
						<TextField
							value={userLastName}
							onChange={(e) => setLastName(e.target.value)}
							label="Last Name"
							variant="outlined"
							inputProps={{
								required: "required",
							}}
						/>
						<TextField
							value={userMobile}
							onChange={(e) => setUserMobile(e.target.value)}
							label="Mobile"
							variant="outlined"
							inputProps={{
								required: "required",
								pattern: "[0-9]{10}",
							}}
						/>
						<TextField
							type="email"
							value={userEmail}
							onChange={(e) => setEmail(e.target.value)}
							label="Email"
							variant="outlined"
							inputProps={{
								required: "required",
								pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2, 4}$",
							}}
						/>

						<TextField
							id="date"
							label="Birthday"
							type="date"
							value={userBirthDate}
							onChange={(e) => {
								setUserBirthDate(e.target.value);
							}}
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{
								max: "2019-12-31",
							}}
						/>

						<FormControl>
							<InputLabel id="demo-multiple-chip-label">Skills</InputLabel>
							<Select
								labelId="demo-multiple-chip-label"
								id="demo-multiple-chip"
								multiple
								value={userSkills}
								onChange={handleSkillsSelection}
								input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
								renderValue={(selected) => (
									<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
										{selected.map((value) => (
											<Chip key={value} label={value} />
										))}
									</Box>
								)}
								MenuProps={MenuProps}
							>
								{skillNames.map((name) => (
									<MenuItem key={name} value={name}>
										{name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
					<Button
						style={{ margin: "1rem auto", display: "flex" }}
						size="large"
						type="submit"
						variant="contained"
					>
						Submit
					</Button>
				</form>
			</Box>
		</>
	);
};

export default UserForm;
