import React, { useEffect, useState } from "react";

import { Dialog, DialogTitle, List, ListItem } from "@material-ui/core";

const ManagerDialog = (props) => {
    const {onClose, open} = props;
    const [user, setUser] = useState({});

    useEffect(() => {
        if (props.users && props.formData && props.open) {
            const userIndex = props.users.findIndex(tempUser => tempUser.email === props.formData.email);
            const tempUser = props.users[userIndex];
            setUser(tempUser);
        }
    }, [props.users, props.formData, props.open]);

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Manager Info</DialogTitle>
            <List>
                <ListItem>Name: {user.first} {user.last}</ListItem>
                <ListItem>Phone Number: {user.managerPhone}</ListItem>
                <ListItem>Zip: {user.zip}</ListItem>
            </List>
        </Dialog>
    );
}

export default ManagerDialog;
