import React, { useState, useEffect } from "react";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Autocomplete,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { URL } from "../uri";
import { v4 as uuid4 } from "uuid";
import Dropzone from "react-dropzone";
import { firestore, storage } from "../Firebase/index";

const Staff = () => {
  const [file, setFile] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialState);
  };

  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios
      .get(`${URL}/getmembers`)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  console.log(users);
  const deleteMember = (id) => {
    axios
      .delete(`${URL}/deletemember/${id}`)
      .then((res) => {
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  const addUser = () => {
    axios
      .patch(`${URL}/addmember`, formData)
      .then((res) => {
        console.log(res);
        setFormData(initialState);
        handleClose();
        setOpen(false);
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const initialState = {
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    password: "",
    package: "",
    invi: "",
    startDate: "2022-01-01",
    endDate: "2022-01-01",
    paymentDate: "2022-01-01",
    filepath: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleClick = () => {
    setOpenSnack(true);
  };
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  useEffect(() => {
    if (file.length > 0) {
      onSubmit();
    } else {
      console.log("N");
    }
  }, [file]);

  const onSubmit = () => {
    if (file.length > 0) {
      file.forEach((file) => {
        const timeStamp = Date.now();
        var uniquetwoKey = uuid4();
        uniquetwoKey = uniquetwoKey + timeStamp;
        const uploadTask = storage
          .ref(`pictures/products/${uniquetwoKey}/${file.name}`)
          .put(file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            handleClick();
            setMessage(`Uploading ${progress} %`);
          },
          (error) => {
            setMessage(error);
            handleClick();
          },
          async () => {
            // When the Storage gets Completed
            const fp = await uploadTask.snapshot.ref.getDownloadURL();
            setFormData({ ...formData, filepath: fp });

            handleClick();
            setMessage("File Uploaded");
          }
        );
      });
    } else {
      setMessage("No File Selected Yet");
    }
  };

  const handleDrop = async (acceptedFiles) => {
    setFile(acceptedFiles.map((file) => file));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleClickOpen}>
          Add Member
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle id="alert-dialog-title">Add New Member</DialogTitle>
          <DialogContent>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                label="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                style={{ width: "48%", marginTop: "10px" }}
              />
              <TextField
                label="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                style={{ width: "48%", marginTop: "10px" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Autocomplete
                disablePortal
                options={[{ label: "Male" }, { label: "Female" }]}
                value={formData.gender}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, gender: newValue.label });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Gender" />
                )}
                style={{ width: "48%", marginTop: "10px" }}
              />
              <TextField
                label="Mobile Number"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                style={{ width: "48%", marginTop: "10px" }}
              />
            </div>
            <TextField
              label="Username"
              fullWidth
              value={formData.mobile}
              style={{ marginTop: "10px" }}
              disabled
            />
            <TextField
              label="Password"
              fullWidth
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              style={{ marginTop: "10px" }}
              type="password"
            />
            <Autocomplete
              disablePortal
              options={[{ label: "Premium" }, { label: "Standard" }]}
              fullWidth
              value={formData.package}
              onChange={(event, newValue) => {
                setFormData({ ...formData, package: newValue.label });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Memebership Package" />
              )}
              style={{ marginTop: "10px" }}
            />
            <TextField
              label="Number of Invitations"
              fullWidth
              value={formData.invi}
              onChange={(e) =>
                setFormData({ ...formData, invi: e.target.value })
              }
              style={{ marginTop: "10px" }}
            />
            <TextField
              label="Start Date"
              type="date"
              defaultValue="2022-01-01"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              style={{ marginTop: "10px" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                label="End Date"
                type="date"
                defaultValue="2022-01-01"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                style={{ width: "48%", marginTop: "10px" }}
              />
              <TextField
                label="Payment Date"
                type="date"
                defaultValue="2022-01-01"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  setFormData({ ...formData, paymentDate: e.target.value })
                }
                style={{ width: "48%", marginTop: "10px" }}
              />
            </div>
            <center>
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <Button
                      style={{ marginTop: "10px" }}
                      size="large"
                      color="primary"
                      variant="outlined"
                      fullWidth
                    >
                      Upload Profile Photo
                    </Button>
                  </div>
                )}
              </Dropzone>
            </center>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addUser} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnack}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <div style={{ marginTop: "20px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row._id}
                  </TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.startDate}</TableCell>
                  <TableCell>{row.endDate}</TableCell>
                  <TableCell align="center">
                    <Button>Edit</Button>
                    <Button onClick={() => deleteMember(row._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Staff;
