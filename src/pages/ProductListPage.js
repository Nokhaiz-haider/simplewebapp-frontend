import * as React from "react";
import { useTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, Navigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 800,
    margin: "0 auto",
    marginTop: theme.spacing(5),
  },
  userInfo: {
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  tableHead: {
    backgroundColor: "#212121",
  },
  tableHeadCell: {
    color: "#ffffff",
    fontWeight: "bold",
  },
}));

function createData(name, code, price, size) {
  const density = price / size;
  return { name, code, price, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const checkValidation = () => {
  if (!JSON.parse(localStorage.getItem("userData"))) {
    return <Navigate to="/" />;
  }
};

checkValidation();

export default function StickyHeadTable() {
  const { t } = useTranslation();

  const columns = [
    { id: "name", label: t("product.name"), minWidth: 170 },
    { id: "code", label: t("product.code"), minWidth: 100 },
    {
      id: "price",
      label: t("product.price"),
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "size",
      label: t("product.size"),
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "density",
      label: t("product.density"),
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];

  const location = useLocation();
  const data = location.state;
  const classes = useStyles();

  const [userData, setUserData] = React.useState(data);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  if (!userData) {
    return <Navigate to="/" />;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Card className={classes.card}>
      <div className={classes.userInfo}>
        <div>
          <strong>{t("username")}:</strong> {userData?.username}
        </div>
        <div style={{marginTop:"10px"}}>
          <strong>{t("email")}:</strong> {userData?.email}
        </div>
        <div style={{marginTop:"10px"}}>
          <strong>{t("registrationDate")}:</strong>{" "}
          {userData.createdAt ? userData.createdAt : userData.created_at}
        </div>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className={classes.tableHeadCell} // Apply the style to table head cells
                  >
                    {t(column.label)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Card>
  );
}
