import React, { Fragment, useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Switch from "@material-ui/core/Switch";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";

import useStyles from "../../../components/UI/Styles/formStyle";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "black",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: "white",
        },
        '&:nth-of-type(even)': {
            backgroundColor: "lightgray",
        },
        "&:hover": {
            color: 'black',
        },
    },
}))(TableRow);

const StyledSortLabel = withStyles(() => ({
    root: {
        color: 'white',
        '&:hover': {
            color: 'white',
        },
        '&$active': {
            color: 'white',
        },
    },
    active: {
        color: 'white',
    },
    icon: {
        color: 'inherit !important'
    },
}))(TableSortLabel);

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const {classes, order, orderBy, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                {props.headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align="left"
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.noSort ?
                            headCell.label :
                        <StyledSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id
                                ?
                                (<span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>)
                                :
                                null}
                        </StyledSortLabel>}
                    </StyledTableCell>
                ))}
                {props.edit &&<StyledTableCell align="left">Edit</StyledTableCell>}
                {props.accept && <StyledTableCell align="left">Accept</StyledTableCell>}
                {props.delete && <StyledTableCell align="left">Delete</StyledTableCell>}
                {props.actions && <StyledTableCell align="left">Actions</StyledTableCell>}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

function EnhancedTable(props) {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('first');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState(props.data);

    const {data} = props;
    useEffect(() => {
        setRows(data);
        setRowsPerPage(data.length >= 25 && !props.noPagination ? 25 : -1);
    },[data, props.noPagination]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <Fragment>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                {props.add && <Button className={classes.addButton} disabled={props.addDisabled} variant="contained" onClick={() => props.add()}>Add</Button>}
                {props.handleApprovedSwitch &&
                    <span>{props.approvedLabel} <Switch checked={props.approvedSwitch} onChange={props.handleApprovedSwitch}/></span>
                }
            </div>
            <TableContainer component={Paper} style={{...props.straightCorners,maxHeight: 550}}>
                <Table
                    stickyHeader
                    aria-labelledby="tableTitle"
                    size={'small'}
                    aria-label="enhanced table"
                >
                    {props.caption && <caption>{props.caption}</caption>}
                    <EnhancedTableHead
                        {...props}
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {(rowsPerPage > 0 ? stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : stableSort(rows, getComparator(order, orderBy)))
                            .map((row, index) => {
                                return (
                                    <StyledTableRow
                                        style={row.partialOrder ? {backgroundColor: "lightyellow"} : null}
                                        hover
                                        key={index}
                                    >
                                        {/*go through all the normal cells in the head cells array*/}
                                        {props.headCells.map((cell, index) => {

                                            if (cell.noSort) {
                                                const buttonStyle = cell.buttonClass;
                                                return (
                                                    <StyledTableCell key={index} align="left">
                                                        <Button onClick={() => {cell.click(row, index)}} variant="contained" className={classes[buttonStyle]}>{cell.label}</Button>
                                                    </StyledTableCell>
                                                );
                                            } else {
                                                let data = row;

                                                if (cell.id) {
                                                    data = row[cell.id];
                                                }
                                                return (
                                                    <StyledTableCell component="th" key={index} scope="row" align="left">{data}</StyledTableCell>
                                                );
                                            }
                                        })}
                                        {/*special columns for specific tables*/}
                                        {props.accept &&
                                        <StyledTableCell align="left">
                                            <Button onClick={() => {props.accept(row)}} variant="contained" className={classes.detailsButton}>Accept</Button>
                                        </StyledTableCell>
                                        }
                                        {props.edit &&
                                            <StyledTableCell align="left">
                                                <Button onClick={() => {props.edit(row, index)}} variant="contained" className={classes.editButton}>Edit</Button>
                                            </StyledTableCell>
                                        }
                                        {props.delete &&
                                            <StyledTableCell align="left">
                                                <Button onClick={() => {props.delete(row)}} variant="contained" className={classes.deleteButton}>Delete</Button>
                                            </StyledTableCell>
                                        }
                                        {props.actions &&
                                        <StyledTableCell align="left">
                                            <span style={{display: 'flex'}}>
                                                <Button onClick={() => {props.actionEdit(row)}} variant="contained" className={classes.editButton} style={{marginRight: 10}}>Edit</Button>
                                                <Button onClick={() => {props.actionDelete(row)}} variant="contained" className={classes.deleteButton}>Delete</Button>
                                            </span>
                                        </StyledTableCell>
                                        }
                                    </StyledTableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 33 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {!props.noPagination && <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}
        </Fragment>
    );
}
export default EnhancedTable;
