
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { CircularProgress, FormControl, Grid, Input, InputLabel, Snackbar, TextField } from '@mui/material';
import React, { useEffect, useState }  from 'react';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '10vh',
    left: '50%',
    transform: 'translate(-50%, 0)',
    minWidth: 400,
    overflow: 'auto',
    bgcolor: '#fff',
    boxShadow: 24,
    borderRadius: '15px',
    p:4,
    outline:0
  
  };

export function UploadFileModal({fetchData}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
  },[]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Update the state with the selected file
    setSelectedFile(file);

    // You can perform additional actions with the file, if needed
    console.log('Selected file:', file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {  
        const formData = new FormData();
        formData.append('data_file', selectedFile);
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}data/upload-file/`,formData);
        fetchData();
        handleClose();
      } catch (error) {
        if (error.response.status === 400){
          let error_msg = '';
          for (let key in error.response.data) {
            if (error.response.data.hasOwnProperty(key)) {
              error_msg += key + ":";
              error_msg += error.response.data[key][0]
            }
          }
          setErrMsg(error_msg);
        }else{
          setErrMsg('An error occurred while adding new employee.');
        }
        
    }
    setLoading(false)   
  }
  return (
    <div>
      <Button sx = {{fontSize:"0.75rem"}}onClick={handleOpen}>Upload File <AddCircleTwoToneIcon sx = {{marginLeft:"0.5rem"}}/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
      <h2 style={{marginTop:'0'}}>Upload File</h2>
      <form onSubmit={(e)=>handleSubmit(e)} style={{display: 'flex', flexWrap:'wrap' }}> 
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl>
          <Input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            inputProps={{ accept: '.csv, text/csv' }}
          />
          {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <CircularProgress sx={{ width: '25px !important', height: '25px !important', color: '#FFF' }} />
          ) : (
            'Save'
          )}
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" color="error" onClick={handleClose}>
          Cancel
        </Button>
      </Grid>
    </Grid> 
        </form>
        
        </Box>
      </Modal>
      <Snackbar
        open={!!errMsg}
        autoHideDuration={3000}
        onClose={() => {setErrMsg("")}}
        message={errMsg}
      />
    </div>
  );
}