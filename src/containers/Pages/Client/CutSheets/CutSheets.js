import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import CategoryCard from "./Cards/CategoryCard";

const CutSheets = (props) => {
    const [cutSheetCategories, setCutSheetCategories] = useState([]);

    useEffect(() => {
        //const unique = [...new Set(props.cutSheets.sort((a, b) => a.category > b.category ? 1 : -1).map(item => item.category.trim()))];

        const categories = [{
            "id": "1",
            "category": "Air Compressor",
            "picname": "IMG_0843",
            "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/cutsheets%2Fcategories%2F1?alt=media&token=3e0dd318-a6d7-4930-87d0-24bb4b628f8a"
        }, {
            "id": "2",
            "category": "Bay Door",
            "picname": "IMG_0864",
            "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/cutsheets%2Fcategories%2F2?alt=media&token=fc239ccc-8dfa-4d09-a800-f30dc8a68f22"
        }, {
            "id": "3",
            "category": "Detergent Dispensing",
            "picname": "IMG_0838",
            "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/cutsheets%2Fcategories%2F3?alt=media&token=dd5e59d9-6af6-4c8c-a156-b514591cbd76"
        }, {
            "id": "4",
            "category": "Heater",
            "picname": "IMG_0862",
            "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/cutsheets%2Fcategories%2F4?alt=media&token=7c729dc7-2a68-4fa6-9140-e3aaadf3b5e0"
        }, {
            "id": "5",
            "category": "Hydraulic",
            "picname": "IMG_0861",
            "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/cutsheets%2Fcategories%2F5?alt=media&token=f85436b5-ba65-48d8-a429-33dc756bbe82"
        }, {
            "id": "6",
            "category": "Hydraulic Pump",
            "picname": "IMG_0845",
            "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/cutsheets%2Fcategories%2F6?alt=media&token=8c7d8d4a-d101-46d7-bad1-8ecc9ec2bdd4"
        }, {
            "id": "7",
            "category": "Lighting",
            "picname": "IMG_0865",
            "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/cutsheets%2Fcategories%2F7?alt=media&token=13982a7a-ec2c-45af-9f31-9cd8252e41c6"
        }, {
            "id": "8",
            "category": "Mat Washer",
            "picname": "IMG_0876",
            "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/cutsheets%2Fcategories%2F8?alt=media&token=a01282be-b535-401a-882b-32344ed11d4e"
        }, {
            "id": "9",
            "category": "Motor",
            "picname": "IMG_0868",
            "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/cutsheets%2Fcategories%2F9?alt=media&token=c283492a-dd65-4408-a9f9-044b1ae30c2a"
        }, {
            "id": "10",
            "category": "Point of Sale",
            "picname": "IMG_0866",
            "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/cutsheets%2Fcategories%2F10?alt=media&token=c231a01a-e5bf-45c8-8815-2f57473340ef"
        }, {
            "id": "11",
            "category": "Reclaim",
            "picname": "IMG_0856",
            "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/cutsheets%2Fcategories%2F11?alt=media&token=58dff48c-53a2-4ba0-ba8d-580c83fc7497"
        }, {
            "id": "12",
            "category": "Reverse Osmosis",
            "picname": "IMG_0854",
            "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/cutsheets%2Fcategories%2F12?alt=media&token=74c7b768-0443-483f-990d-f29adbc1ea88"
        }, {
            "id": "13",
            "category": "Vacuum",
            "picname": "IMG_0877",
            "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/cutsheets%2Fcategories%2F13?alt=media&token=a91f5239-2dd6-473d-b312-e177b8669ced"
        }, {
            "id": "14",
            "category": "Water Heater",
            "picname": "IMG_0851",
            "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/cutsheets%2Fcategories%2F14?alt=media&token=e9dd9ed2-b8b9-4bdb-82cd-dd321df7e323"
        }, {
            "id": "15",
            "category": "Water Pump",
            "picname": "IMG_0849",
            "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/cutsheets%2Fcategories%2F15?alt=media&token=8199f17a-a244-4604-a599-be21b24e7b0d"
        }, {
            "id": "16",
            "category": "Water Softener",
            "picname": "IMG_0850",
            "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/ec-wash.appspot.com/o/cutsheets%2Fcategories%2F16?alt=media&token=d3ae58f5-50ca-4f45-a2cd-1adbfe95f926"
        }];
        setCutSheetCategories(categories);
    }, []);

    return (
        <Container>
            <Grid container spacing={2}>
                {cutSheetCategories.map(item => {
                    return (
                        <Grid item xs={12} md={6} lg={4} key={item.id}>
                            <CategoryCard
                                name={item.category}
                                cutSheets={props.cutSheets}
                                categoryPicture={item.pictureUrl}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        cutSheets: state.cutSheets.cutSheets,
    };
};

export default connect(mapStateToProps)(CutSheets);
