import { useEffect, useState } from 'react';

import {  IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { IconGavel} from "@tabler/icons";
import axios from "axios";
import config from "../../../config"
import AuctionUpdate from "ui-component/auctions/AuctionUpdate";
import { Link } from 'react-router-dom';



// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  
  const [openUpdate,setOpenUpdate]=useState(false)
  const [auctions,setAuctions]=useState([])
  const [item,setItem]=useState()
  const getData=()=>{
     axios.get('/api/auction').then(res=>{
         setAuctions(res.data)
     })
  
  }
  
  
  useEffect(()=>{
     getData()
  },[])
  
      return <>
  
   
  
  
      <Container>
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <h2>  All Cars</h2>
  
     
          </div>
         
  
          <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Model</TableCell>
              <TableCell align="right">Bidding</TableCell>
          
            </TableRow>
          </TableHead>
          <TableBody>
           {auctions.map(item=><TableRow key={item.id}>
              <TableCell>
              <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
                <img src={`${config.baseUrl}/images/${item.image}`}  style={{width:"45px",height:"45px",objectFit:"cover"}} />{item.name}
                
                </div>
              </TableCell>
              <TableCell align="right">AED { item.price}</TableCell>
              <TableCell align="right">{item.model}</TableCell>
          
              <TableCell align="right">
              {/* {<TextField id="outlined-basic" label="Inter Your Price" variant="outlined" />} */}
              <Link to={`/product/${item.id}`}>
                  <IconButton >
                      <IconGavel />
  
                  </IconButton>
                  </Link>
              </TableCell>
             
              
           </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
  
   
      {item&& <AuctionUpdate open={openUpdate} item={item} handleClose={()=>{
      getData()
      setOpenUpdate(false)
  }} />}
      </>
  
};

export default Dashboard;
