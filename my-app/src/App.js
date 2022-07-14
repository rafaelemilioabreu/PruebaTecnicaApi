import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Services from "./Services";
import Button from "@mui/material/Button";




import Modal from '@mui/material/Modal';






function App() {

  const [rows, setrows] = useState([]);
  const modalModel = {
   
  id: "",
  title: "",
  description: "",
  excerpt : "",
  pageCount: "",
  publishDate: "",

  }

  const [modelData, setmodelData] = useState(modalModel)
  
    useEffect(() => {
      Services.GetData().then((data) => {
        console.log(data);
  
        setrows(data);
      });
    }, []);

  const modalStyle = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "description",
      headerName: "description",
    },
    {
      field: "excerpt",
      headerName: "excerpt",
    },
    {
      field: "pageCount",
      headerName: "pageCount",
    },
    {
      field: "publishDate",
      headerName: "publish Date",
      type: "date",
    },
    {
      field: "title",
      headerName: "title",
    },
  
    {
      field: "ver",
      headerName: "ver",
  
      renderCell: (rowData) => {
        return (
          <Button
            variant="contained"
            onClick={() => {
              handleOpen()
              setmodelData(rowData.row)
            }
            }
          >
            Contained
          </Button>
        );
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 

  function BasicModal() {
   
  
    return (
      <div>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modelData.title}
            </Typography>
         
            
            <Typography id="modal-modal-pageCount" sx={{ mt: 2 }}>
              {modelData.pageCount}
            </Typography>
            <Typography id="modal-modal-publishedDate" sx={{ mt: 2 }}>
              {modelData.publishDate}
            </Typography>

          </Box>
        </Modal>
      </div>
    );
  }


 
  function Grid() {
    
  
    return (
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    );
  }
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              APP
            </Typography>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              APP
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Grid />
      <BasicModal />
      <formModal />
    </>
  );
}

export default App;
