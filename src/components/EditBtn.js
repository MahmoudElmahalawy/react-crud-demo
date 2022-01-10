import React from "react";

import { Link } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const EditBtn = ({ btnData: { userId } }) => {
	return (
		<Tooltip title="Edit">
			<IconButton component={Link} to={"/edit/" + userId}>
				<EditIcon />
			</IconButton>
		</Tooltip>
	);
};

export default EditBtn;
