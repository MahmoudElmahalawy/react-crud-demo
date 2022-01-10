import React from "react";

import UserForm from "../components/UserForm";

const EditUser = ({ data, setData, editUser }) => {
	return <UserForm formType={"edit"} data={data} setData={setData} editUser={editUser} />;
};

export default EditUser;
