import React from "react";

import UserForm from "../components/UserForm";

const AddUser = ({ data, setData, addUser }) => {
	return <UserForm formType={"add"} data={data} setData={setData} addUser={addUser} />;
};

export default AddUser;
