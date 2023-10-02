import React, { useState } from "react";
import MainLayout from "../../layouts/main";
import Title from "../Title";
import { apiDelete, apiGet, apiPost, apiPut } from "../../functionsAPI";
import { AppBar, Breadcrumbs, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Paper, Slide, Tab, Tabs, Toolbar, Typography } from "@mui/material";

import DonationType from "./DonationType";
import FoodType from "./FoodType";

export default function Masters() {

  const [activeTab, setActiveTab] = useState(0);

  // Handle tab change
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <MainLayout>
      <Title>Dashboard</Title>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <div>
              <Tabs value={activeTab} onChange={handleChange} centered>
                <Tab label="Donation Type" />
                <Tab label="Food Type" />
              </Tabs>
              <Typography>
                {activeTab === 0 && <DonationType />}
                {activeTab === 1 && <FoodType />}
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
