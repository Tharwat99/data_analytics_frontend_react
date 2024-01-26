import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UploadFileModal } from './uploadFileModal';
import { BarChartsModal } from './barChartsModal';
import { Card, CardContent, Grid } from '@mui/material';
import { LineChartsModal } from './lineChartsModal';

const Analytical = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}data/list/`);
      setData(response.data);
      console.log(response.data)
      
    } catch (error) {
      console.error('Failed to fetch employees', error);
    }
  };
  return (
    
    <div>
      <div style={{display:"flex", alignItems:"right", padding:"1rem"}}>
        <h2 style={{marginRight:"8px"}}>Data</h2>
        <UploadFileModal fetchData = {fetchData}/>
      </div>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <BarChartsModal data={data} />
            </Grid>
            <Grid item xs={6}>
              <LineChartsModal data={data} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
    
  );
};
export default Analytical;