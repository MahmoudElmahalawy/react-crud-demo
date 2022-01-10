import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const DeleteBtn = ({ data, setData, btnAction, btnData }) => {
	return (
		<Tooltip title="Delete">
			<IconButton
				onClick={() => {
					setData(data.filter((user) => user.id !== btnData.userId));
					btnAction(btnData);
				}}
			>
				<DeleteIcon />
			</IconButton>
		</Tooltip>
	);
};

export default DeleteBtn;
