import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Deposits from "./Deposits";
import Orders from "./Orders";
import MainLayout from "../../layouts/main";
import Title from "../Title";
import { apiDelete, apiGet, apiPost, apiPut } from "../../functionsAPI";



export default function Customers() {
  const [isLoading, setIsLoading] = React.useState(false);

  // Table
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState(null);
  const [order, setOrder] = useState(null);
  const [searchItem, setSearch] = useState(null);
  const [tableData, setTableData] = useState([]);
  const columns = [
    {
      name: "#",
      label: "#",
      options: {
        sort: false,
        customBodyRenderLite: (rowIndex) => {
          return start + rowIndex + 1;
        },
      },
    },
    {
      name: "name",
      label: "Donor Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "mobile",
      label: "Mobile",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({ style: { width: "10%", justifyContent: 'end' } })
      },
    },
  ];

  const changePage = (page) => {
    const start = limit * page;
    getDonor(start, limit, sortBy, order, searchItem);
    setStart(start);
  };
  const sort = (sortOrder) => {
    const sortBy = sortOrder.name;
    const order = sortOrder.direction;
    getDonor(start, limit, sortBy, order, searchItem);
    setSortBy(sortBy);
    setOrder(order);
  };
  const changeRowsPerPage = (limit) => {
    getDonor(start, limit, sortBy, order, searchItem);
    setLimit(limit);
  };
  const onSearch = (searchItem) => {
    getDonor(start, limit, sortBy, order, searchItem);
    setSearch(searchItem);
  };
  const handleTableChange = (action, tableState) => {
    switch (action) {
      case "changePage":
        changePage(tableState.page);
        break;
      case "sort":
        sort(tableState.sortOrder);
        break;
      case "changeRowsPerPage":
        changeRowsPerPage(tableState.rowsPerPage);
        break;
      case "search":
        const search =
          tableState.searchText === null ? null : tableState.searchText;
        onSearch(search);
        break;
      default:
    }
  };
  // END: Table functions

  const getDonor = (
    start = 0,
    limit = 10,
    sortBy = null,
    order = null,
    search = null
  ) => {
    setIsLoading(true);
    const filters = {
      sort_by: sortBy,
      order,
      start,
      limit,
      search,
    };

    apiGet("/get-all-donors", filters)
      .then((res) => {
        console.log(res)
        res.data.list.map(
          (item) =>
          (item.action = (
            <ButtonGroup size="small" variant="text" color="secondary">
              <Button onClick={() => handleView(item.id)}>
                <VisibilityIcon />
              </Button>
              <Button onClick={() => handleEdit(item.id)}>
                <EditIcon />
              </Button>
              <Button onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </Button>
            </ButtonGroup>
          ))
        );
        setCount(res.data.count);
        setTableData(res.data.list);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err, 'error');
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    getDonor();
    // eslint-disable-next-line
  }, []);



  return (
    <MainLayout>
      <Title>Customers</Title>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
