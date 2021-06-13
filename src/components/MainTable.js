import { useEffect, useState } from "react";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    maxWidth: 700,
    minWidth: 700,
  },
});

function MainTable() {
  const [data, setData] = useState([]);
  const [del, setDel] = useState(true);

  useEffect(() => {
    fetch("/api/getAll")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [del]);

  const classes = useStyles();

  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Long Url</StyledTableCell>
              <StyledTableCell align="right">Short Url</StyledTableCell>
              <StyledTableCell align="right">Date Created</StyledTableCell>
              <StyledTableCell align="right">Delete?</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.shortUrl}>
                <StyledTableCell component="th" scope="row">
                  {row.longUrl}
                </StyledTableCell>
                <StyledTableCell align="right">{row.shortUrl}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.date_created}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    color="inherit"
                    onClick={() => {
                      fetch("/api/delete/" + row.shortUrl, {
                        method: "DELETE",
                      }).then(() => setDel(!del));
                    }}
                  >
                    Delete?
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MainTable;
