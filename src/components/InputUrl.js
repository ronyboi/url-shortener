import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function InputUrl() {
  const classes = useStyles();
  return (
    <div className="InputField">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="URL" variant="outlined" />
        <Button color="inherit">Submit</Button>
      </form>
    </div>
  );
}
