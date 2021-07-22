import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#d8222b',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        minWidth: 200
    },
    formControl: {
        minWidth: 200,
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textarea: {
        resize: "both"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(3),
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 0, 3),
        maxHeight: '80vh',
        overflow: 'auto',
        borderRadius: 15
    },
    deleteButton:{
        backgroundColor: "red",
        color: "white"
    },
    editButton:{
        backgroundColor: "green",
        color: "white"
    },
    detailsButton:{
        backgroundColor: "blue",
        color: "white"
    },
    addButton: {
        margin: theme.spacing(1, 0, 1),
        backgroundColor: "blue",
        color: "white",
        minWidth: 200
    },
    cancelButton: {
        color: "red",
    },
    visuallyHidden: {
        display: "none"
    },
    active: {
        color: "yellow"
    },
    menuPaper: {
        maxHeight: 300
    },
    Container: {
        textAlign: 'center',
        alignItems: 'center',
    },
    input: {
        display: "none"
    },
    button: {
        color: "blue",
        margin: 10
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    cartButton: {
        marginLeft: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    frame: {
        height: 4
    },
    searchBar: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '30em',
        margin: 'auto',
    },
    searchInput: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    searchIconButton: {
        padding: 10,
    },
}));

export default useStyles;
