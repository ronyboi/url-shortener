import React, { useState } from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { api } from "./config.json";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
}));

export default function InputUrl({ updateOnSubmit }) {
  const classes = useStyles();
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl: url }),
    };
    fetch(api + "/api/", requestOptions);
    updateOnSubmit();
  };

  return (
    <div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="outlined-basic"
          label="URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="submit" color="inherit">
          Submit
        </Button>
      </form>
    </div>
  );
}
