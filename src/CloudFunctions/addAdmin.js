import React, { useState } from "react";
import { functions } from "../firebase";

export const AddAdmin = () => {
    const [email, setEmail] = useState("");
    const adminFunction = (event) => {
        event.preventDefault();
        const addAdminRole = functions.httpsCallable('addAdminRole');
        addAdminRole({email: email})
            .then(result => console.log("added: " + result.message))
            .catch(error => console.log(error.message));
    };

    return (
        <form onSubmit={adminFunction} noValidate>
            <input type="text" onChange={event => {
                setEmail(event.target.value)
            }}/>
            <button type="submit">Add Admin</button>
        </form>
    );
};

export default AddAdmin;
