import React, { useState } from "react";
import MainLayout from "../../layouts/main";
import Title from "../Title";
import { apiDelete, apiGet, apiPost, apiPut } from "../../functionsAPI";
import { AppBar, Breadcrumbs, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import Table from '../../components/Table'
import VisibilityIcon from '@mui/icons-material/Visibility';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Donation() {
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
        sort: true,
      },
    },
    {
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "mobile",
      label: "Mobile",
      options: {
        filter: true,
        sort: true,
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
    getCandidate(start, limit, sortBy, order, searchItem);
    setStart(start);
  };
  const sort = (sortOrder) => {
    const sortBy = sortOrder.name;
    const order = sortOrder.direction;
    getCandidate(start, limit, sortBy, order, searchItem);
    setSortBy(sortBy);
    setOrder(order);
  };
  const changeRowsPerPage = (limit) => {
    getCandidate(start, limit, sortBy, order, searchItem);
    setLimit(limit);
  };
  const onSearch = (searchItem) => {
    getCandidate(start, limit, sortBy, order, searchItem);
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

  const getCandidate = (
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

    apiGet("/get-all-candidate", filters)
      .then((res) => {
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
    getCandidate();
    // eslint-disable-next-line
  }, []);


  const handleDelete = (id) => {
    apiDelete("/delete-candidate-by-id/" + id)
      .then((res) => {
        alert("done");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err, 'error');
        setIsLoading(false);
      });
  }

  return (
    <MainLayout>
      <Title>Candidate</Title>

      {/* Recent Orders */}
      <Grid item xs={12}>
        <Table
          title={`Candidate List`}
          serverSide={true}
          count={count}
          columns={columns}
          data={tableData}
          onTableChange={handleTableChange}
          rowsPerPage={limit}
        />
      </Grid>
    </MainLayout>
  );
}
