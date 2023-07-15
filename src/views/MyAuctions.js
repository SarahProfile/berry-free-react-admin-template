import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Container } from "@mui/system";
import { IconPencil, IconTrash } from "@tabler/icons";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import AuctionCreate from "ui-component/auctions/ActionCreate";
import AuctionUpdate from "ui-component/auctions/AuctionUpdate";

import AuctionDelete from "ui-component/auctions/AuctionDelete";
import config from "../config"



export default function MyAuctions(){

const [openCreate,setOpenCreate]=useState(false)
const [openUpdate,setOpenUpdate]=useState(false)
const [openDelete,setOpenDelete]=useState(false)
const [auctions,setAuctions]=useState([])
const [item,setItem]=useState()
const getData=()=>{
   axios.get('/api/auction/me').then(res=>{
       setAuctions(res.data)
   })

}


useEffect(()=>{
   getData()
},[])

    return <>

 

    <AuctionCreate open={openCreate} handleClose={()=>{
        getData()
        setOpenCreate(false)
       
    }} />
    <Container>
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <h2>  My Cars</h2>

        <Button variant="contained"
        onClick={()=>{
            
            setOpenCreate(true)
        }}
         style={{maxHeight:"40px"}}>create</Button>
        </div>
       

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Model</TableCell>
        
            <TableCell align="right">Action</TableCell>
      
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
                <IconButton onClick={()=>{
                    setItem(item)
                    setOpenUpdate(true)
                }} >
                    <IconPencil />

                </IconButton>

                <IconButton style={{marginInlineStart:"8px"}} onClick={()=>{
                    setItem(item)
                    setOpenDelete(true)
                }} >
                    <IconTrash />
                    
                </IconButton>
            </TableCell>
            
         </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    {item&&   <AuctionDelete id={item.id} open={openDelete} handleClose={()=>{
        getData()
        setOpenDelete(false)
       
    }} />}
 
    {item&& <AuctionUpdate open={openUpdate} item={item} handleClose={()=>{
    getData()
    setOpenUpdate(false)
}} />}
    </>

}