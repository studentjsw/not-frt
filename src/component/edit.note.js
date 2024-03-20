import React, { useEffect, useState } from "react";
import BaseApp from "../baseApp";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import { AppState } from "../Context/AppProvider";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";




export default function EditNote() {
  const { note } = AppState();
  const [editData, setEditData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [addNoteError, setAddNoteError] = useState(false);
  const [openLoad, setOpenLoad] = React.useState(false);
  const handleCloseLoad = () => {
    setOpenLoad(false);
  };
  const handleOpenLoad = () => {
    setOpenLoad(true);
  };
  const colors = [
    {
      value: "#fff",
      label: "Default",
    },
    {
      value: "#faafa8",
      label: "Coral",
    },
    {
      value: "#fff8b8",
      label: "Sand",
    },
    {
      value: "#d4e4ed",
      label: "Fog",
    },
    {
      value: "#efeff1",
      label: "Chalk",
    },
  ];
  const { note_id } = useParams();
  const navigate = useNavigate();

  async function updateData() {
    if (title === "" || description === "") {
      setAddNoteError(true);
    } else {
      handleOpenLoad();
      const data = {
        title,
        description,
        backgroundColor,
      };
      const response = await fetch(
        `https://note-yftj.onrender.com/note/update/${note_id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const noteResponseResult = await response.json();
      handleCloseLoad();
      navigate("/home");
    }
  }

  useEffect(() => {
    const filterdata = note.find((data) => data._id === note_id);
    setEditData(filterdata);
    setTitle(filterdata.title);
    setDescription(filterdata.description);
    setBackgroundColor(filterdata.backgroundColor);
  }, [note, note_id]);

  return (
    <BaseApp>
      <div className="backButtonContainer">
        <IconButton onClick={() => navigate("/home")} aria-label="back">
          <KeyboardBackspaceIcon fontSize="large" />
        </IconButton>
        <h1 className="title">Edit</h1>
      </div>

      {editData && (
        <div className="container">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-8">
              {addNoteError && (
                <p className="errorMessage">Please fill all fields*</p>
              )}

              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                defaultValue={editData.title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <TextField
                id="outlined-multiline-static"
                label="Take a note..."
                margin="dense"
                multiline
                rows={4}
                fullWidth
                defaultValue={editData.description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                margin="dense"
                helperText="Please select color"
                defaultValue={editData.backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              >
                {colors.map((option) => (
                  <MenuItem
                    className="color-select"
                    key={option.value}
                    value={option.value}
                  >
                    <span
                      style={{
                        backgroundColor: option.value,
                        color: option.value,
                        border: "1px solid #000000",
                      }}
                      className="color-select"
                    >
                      0000{" "}
                    </span>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <div>
                <Button
                  onClick={() => updateData()}
                  variant="contained"
                  margin="dense"
                  fullWidth
                  endIcon={<BrowserUpdatedIcon />}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoad}
        onClick={handleCloseLoad}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </BaseApp>
  );
}
