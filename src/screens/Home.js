import React from "react";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import DataTable from "../components/DataTable";
import AddBtn from "../components/AddBtn";

const Home = ({ data, setData, currentUser, changeCurrentUser, deleteUser }) => {
	return data?.length > 0 ? (
		<div style={{ margin: "3rem auto", maxWidth: 970 }}>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Avatar
					sx={{ display: "inline-block", minHeight: 100, minWidth: 100, m: 5 }}
					src={currentUser?.user_avatar}
				/>
				<Typography component="h1" variant="h6">
					{currentUser?.user_email}
				</Typography>
			</Box>
			<AddBtn />
			<DataTable
				data={data}
				setData={setData}
				tableHeaders={[
					{ fieldName: "full_name", label: "Full Name" },
					{ fieldName: "birth_date", label: "Birth Date" },
					{ fieldName: "age", label: "Age", minWidth: 80 },
					{ fieldName: "skills", label: "Skills", isArray: true },
					{ fieldName: "actions", label: "Actions" },
				]}
				changeCurrentUser={changeCurrentUser}
				deleteUser={deleteUser}
			/>
		</div>
	) : (
		<Box sx={{ margin: "3rem auto", textAlign: "center" }}>
			<CircularProgress />
		</Box>
	);
};

export default Home;
