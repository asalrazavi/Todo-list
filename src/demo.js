import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import "bootstrap/dist/css/bootstrap.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import "./demo.css";

function Header() {
  return (
    <header className="header">
      <h1> To Do List </h1>{" "}
    </header>
  );
}

const handleDeleteItem = (index, items, setItems) => {
  const newItems = [...items];
  newItems.splice(index, 1);
  setItems(newItems);
};

export default function CheckboxListSecondary() {
  const [checked, setChecked] = React.useState([1]);
  const [text, setText] = React.useState("");
  const [items, setItems] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAddToList = (e) => {
    if (e.key === "Enter" && text.trim() !== "") {
      setItems([text, ...items]);
      setText("");
    }
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      ></Box>{" "}
      <List className="card-list p-5" dense>
        <Header />{" "}
        <TextField
          className="col-11"
          id="outlined-basic"
          label="Todo"
          variant="outlined"
          sx={{
            paddingBottom: "10%",
            "& label": {
              color: "gray",
            },
            "& input": {
              color: "white",
            },
            "& fieldset": {
              borderColor: "white !important",
            },
          }}
          value={text}
          onChange={handleTextChange}
          onKeyPress={handleAddToList}
        />{" "}
        {items.map((item, index) => {
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <Checkbox
                  edge="start"
                  onChange={handleToggle(index)}
                  checked={checked.indexOf(index) !== -1}
                  inputProps={{ "aria-labelledby": index }}
                  sx={{ color: "white" }}
                />{" "}
                <ListItemText
                  primary={item}
                  sx={{
                    textDecoration:
                      checked.indexOf(index) !== -1 ? "line-through" : "none",
                    textDecorationColor:
                      checked.indexOf(index) !== -1 ? "white" : "gray",
                    color: checked.indexOf(index) !== -1 ? "gray" : "white",
                  }}
                />{" "}
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteItem(index, items, setItems)}
                  sx={{ color: "gray" }}
                >
                  <DeleteIcon />
                </IconButton>{" "}
              </ListItemButton>{" "}
            </ListItem>
          );
        })}{" "}
      </List>{" "}
    </div>
  );
}
