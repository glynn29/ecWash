import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import React from "react";

const PictureButton = (props) => {
    return (
        props.tempPicture ?
            <Fab component="span">
                <HighlightOffIcon onClick={props.handleRemovePictureClick} color={"error"} fontSize={"large"}/>
            </Fab>
            :
            <div>
                <input
                    accept="image/*"
                    style={{display: "none"}}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={props.handleAddPictureClick}
                />
                <label htmlFor="contained-button-file">
                    <Fab component="span">
                        <AddPhotoAlternateIcon/>
                    </Fab>
                </label>
            </div>
    );
};

export default PictureButton;
