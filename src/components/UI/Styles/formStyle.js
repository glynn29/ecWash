import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#d8222b !important',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formGridScroll: {
        overflow: 'scroll',
        maxHeight: '750px'
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
        resize: 'both'
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing(3),
    },
    modalPaper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 0, 3),
        borderRadius: 15,
        paddingTop: '0',
        position: 'relative'
    },
    modalFormWrapper: {
        maxHeight: '80vh',
        '& .MuiGrid-container': {
            maxHeight: '80vh',
            overflow: 'auto'
        },
    },
    modalExitButton: {
        cursor: 'pointer',
        position: 'absolute',
        left: 'calc(100% - 35px)',
        top: '0',
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: '25px'
    },
    deleteButton: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
    editButton: {
        backgroundColor: theme.palette.green.main,
        color: theme.palette.green.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.green.dark,
        },
    },
    detailsButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    addButton: {
        margin: theme.spacing(1, 0, 1),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        minWidth: 200,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    cancelButton: {
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        '&:hover': {
            color: theme.palette.secondary.dark,
            borderColor: theme.palette.secondary.dark,
        },
    },
    visuallyHidden: {
        display: 'none'
    },
    active: {
        color: 'yellow'
    },
    menuPaper: {
        maxHeight: 300
    },
    container: {
        textAlign: 'center',
        alignItems: 'center',
    },
    input: {
        display: 'none'
    },
    button: {
        color: 'blue',
        margin: 10
    },
    root: {
        flexGrow: 1,
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
        flex: 1,
        '& fieldset': {
            border: 'none'
        }
    },
    searchIconButton: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    filterSwitch: {
        flexDirection: 'column',
        whiteSpace: 'nowrap',
        marginRight: 0,
        marginLeft: 0
    },
    homeTitle: {
        fontWeight: 'bold !important',
        fontSize: 26,
        [theme.breakpoints.up('sm')]: {
            fontSize: 35
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 40
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: 45
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: 50
        }
    },
    homeTagLine: {
        fontWeight: 'bold !important',
        color: theme.palette.secondary.main,
        fontStyle: 'italic',
        fontSize: 17,
        [theme.breakpoints.up('sm')]: {
            fontSize: 22
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 28
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: 32
        },
        [theme.breakpoints.up('xl')]: {
            fontSize: 38
        }
    },
    cartItem: {
        boxShadow: theme.shadows[3],
        width: '98%',
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '1px solid lightgrey',
        borderBottom: 'none'
    }
}));

export default useStyles;
