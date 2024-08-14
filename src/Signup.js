import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, Grid, Snackbar, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField, ThemeProvider, Typography
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ModeEdit as ModeEditIcon, Delete as DeleteIcon, Close as CloseIcon, Lock as LockOutlinedIcon } from '@mui/icons-material';
import { registerEmployee, editEmployee, deleteEmployee } from './features/employee/employeeSlice';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const defaultTheme = createTheme();

export default function SignUp() {

  //Redux Store
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.employees);

  //state variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editEmpObj, seteditEmpObj] = useState({});

  //pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  const paginatedEmployees = employee.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  //Snackbar
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerEmployee({ id: uuidv4(), firstName, lastName, email, password, designation }));
    setOpen(true);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setDesignation('');
};

  const editHandler = (rowObj) => {
    seteditEmpObj(rowObj);
    setFirstName(rowObj.firstName)
    setLastName(rowObj.lastName);
    setEmail(rowObj.email);
    setPassword(rowObj.password);
    setDesignation(rowObj.designation);
    setIsEdit(true);
  }
  const delHandler = (rowObj) => {
    dispatch(deleteEmployee(rowObj.id))
  }

  const updateHandler = () => {
    dispatch(editEmployee({ id: editEmpObj.id, firstName, lastName, email, password, designation }));
    setOpen(true);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setDesignation('');
    setIsEdit(false);
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <form onSubmit={handleSubmit}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="designation"
                  label="Designation"
                  name="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* {!isEdit ? <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={(event) => submitHandler(event)}
        >
          Submit
        </Button> : <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => updateHandler()}
        >
          Update
        </Button>} */}

{!isEdit ?  <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>:<Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => updateHandler()}
        >
          Update
        </Button>}

        <h2 style={{ display: 'flex', justifyContent: 'center' }}>Registered Employees</h2>
      </Container>

      </form>

      <div style={{ width: 100 }}>
        {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message={!isEdit ? 'Employee Registered Successfully' : 'Employee updated Successfully'}
          action={action}
        />
      </div>

      <Container component="sub" fullWidth="100">
        {employee.length > 0 ? (
          <TableContainer>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">First Name</StyledTableCell>
                  <StyledTableCell align="center">Last Name</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Designation</StyledTableCell>
                  <StyledTableCell align="center" colSpan={2}>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedEmployees.map((row,index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center"> {page * rowsPerPage + index + 1}</StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {row.firstName}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.lastName}</StyledTableCell>
                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                    <StyledTableCell align="center">{row.designation}</StyledTableCell>
                    <StyledTableCell align="right" onClick={() => editHandler(row)}><ModeEditIcon /></StyledTableCell>
                    <StyledTableCell align="start" onClick={() => delHandler(row)}><DeleteIcon /></StyledTableCell>
                  </StyledTableRow>
                ))}
                <TableRow>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (<p style={{ display: 'flex', justifyContent: 'center' }}>No employees registered yet.</p>)}

        {employee.length &&
      <TablePagination
        component="div"
        count={employee.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />}
      </Container>
    </ThemeProvider>
  );
}