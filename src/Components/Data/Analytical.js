import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDebounce } from "use-lodash-debounce";
import { UploadFileModal } from './uploadFileModal';
import { BarChartsModal } from './barChartsModal';
import { Card, CardContent, FormControl, Grid, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { LineChartsModal } from './lineChartsModal';
import { PieChartsModal } from './pieChartsModal';

const Analytical = () => {
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('month');
  const [ValueLessThanQuery, setValueLessThanQuery] = useState('');
  const [ValueGreaterThanQuery, setValueGreaterThanQuery] = useState('');
  const [ValueLessThanField, setValueLessThanField] = useState('');
  const [ValueGreaterThanField, setValueGreaterThanField] = useState('');
  const TextdebouncedSearch = useDebounce(searchQuery, 800);
  const LessThandebouncedSearch = useDebounce(ValueLessThanQuery, 800);
  const GreaterThandebouncedSearch = useDebounce(ValueGreaterThanQuery, 800);

    
  useEffect(() => {
    fetchData();
  }, [TextdebouncedSearch, LessThandebouncedSearch, GreaterThandebouncedSearch]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}data/list/?${searchField}=${searchQuery}&${ValueLessThanField}=${ValueLessThanQuery}&${ValueGreaterThanField}=${ValueGreaterThanQuery}`);
      
      setData(response.data);
      console.log(response.data)
      
    } catch (error) {
      setErrMsg(error.message);
    }
  };
  return (
    
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <FormControl sx={{ marginRight: 10 }} size="small">
          <Select
            value={searchField}
            onChange={(e) => {
              console.log(e.target.value)
              if (e.target.value === 'month'){
                setSearchField(e.target.value);
              }else{
                setSearchField(e.target.value);
                setValueLessThanField(e.target.value+'__lte');
                setValueGreaterThanField(e.target.value+'__gte');
              }
              setSearchQuery('');
              setValueLessThanQuery(''); // Reset profit filters when changing the search field
              setValueGreaterThanQuery('');
            }}
            displayEmpty
          >
            <MenuItem value="month">Month</MenuItem>
            <MenuItem value="revenue">Revenue</MenuItem>
            <MenuItem value="expenses">Expenses</MenuItem>
            <MenuItem value="profit">Profit</MenuItem>
          </Select>
        </FormControl>
          {searchField === 'month' && (
            <TextField 
            label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size = 'small'    
            />
          )}
        {searchField != 'month' &&(
          <>
            <TextField
              label= "Less Than"
              value={ValueLessThanQuery}
              onChange={(e) => setValueLessThanQuery(e.target.value)}
              size="small"
              type="number"
              style={{ marginRight: '10px' }}
              inputProps={{ step: '100', min:'0' }} 
            />
            <TextField
              label="Greater Than"
              value={ValueGreaterThanQuery}
              onChange={(e) => setValueGreaterThanQuery(e.target.value)}
              size="small"
              type="number"
              inputProps={{ step: '100', min:'0' }}
            />
          </>
        )}
      </div>

      <div style={{display:"flex", alignItems:"right", padding:"1rem"}}>
        <h2 style={{marginRight:"8px"}}>Data</h2>
        <UploadFileModal fetchData = {fetchData}/>
      </div>
      <Card>
        <CardContent>  
          <BarChartsModal data={data} />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <PieChartsModal data={data} />
            </Grid>
            <Grid item xs={8}>
              <LineChartsModal data={data} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Snackbar
        open={!!errMsg}
        autoHideDuration={3000}
        onClose={() => {setErrMsg("")}}
        message={errMsg}
      />
    </div>
    
  );
};
export default Analytical;