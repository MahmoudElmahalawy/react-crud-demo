import React from "react";

import { Link } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const AddBtn = () => {
	return (
		<Tooltip title="New User">
			<IconButton component={Link} to="/add">
				<AddCircleIcon />
			</IconButton>
		</Tooltip>
	);
};

export default AddBtn;
