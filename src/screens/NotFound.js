import React from "react";

import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

const NotFound = () => {
	return (
		<div style={{ textAlign: "center", margin: "3rem auto" }}>
			<h1>OOPS!</h1>
			<p>We can't seem to find the page you are looking for.</p>
			<Button sx={{ marginTop: 5 }} component={Link} to="/">
				Go Back
			</Button>
		</div>
	);
};

export default NotFound;
