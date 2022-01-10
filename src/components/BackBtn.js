import React from "react";

import { Link } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const BackBtn = () => {
	return (
		<Tooltip title="Go Back">
			<IconButton component={Link} to="/">
				<ArrowBackIcon />
			</IconButton>
		</Tooltip>
	);
};

export default BackBtn;
