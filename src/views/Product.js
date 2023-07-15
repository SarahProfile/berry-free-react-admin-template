import { Container, Divider, Fab, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, snackbarClasses } from "@mui/material";
import { IconChevronLeft, IconPlus } from "@tabler/icons";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTheme } from '@emotion/react';
import config from '../config'
import BiddingCreate from "ui-component/auctions/BiddingCreate";
import moment from "moment";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
export default function Product(){
    const firebaseConfig = {
        apiKey: "AIzaSyA1Vc0iEmqnRBJo-m1HB-Dw3wMTMgYCOX0",
        authDomain: "auction-b87b2.firebaseapp.com",
        projectId: "auction-b87b2",
        storageBucket: "auction-b87b2.appspot.com",
        messagingSenderId: "881298646832",
        appId: "1:881298646832:web:5d5bfaaf3eef0d06c1caf5",
        measurementId: "G-HHE925S1BR",
        databaseURL:"https://auction-b87b2-default-rtdb.firebaseio.com/"
      };
      
      // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const {id}=useParams()
    const navigate=useNavigate()
    const [product,setProduct]=useState(null)
    const theme=useTheme()
    const [biddings,setBiddings]=useState([])
    const [open,setOpen]=useState(false)

    const getRealtimeData=async()=>
    {
        const q = query(collection(db, "biddings"), where("product_id", "==", id));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  
//   querySnapshot.forEach((doc) => {
//       cities.push(doc.data().name);
//   });
getBiddings()
  console.log("Current cities in CA: ", querySnapshot);
});
    }

    const getBiddings=()=>{
        axios.get(`/api/bidding/${id}`).then(res=>{
            setBiddings(res.data)
        })
    }

    useEffect(()=>{
        axios.get(`/api/auction/${id}`).then(res=>{
            setProduct(res.data)
        }).catch(e=>{})

        getRealtimeData()

        getBiddings()

        

    },[])


    return <>
    <Container>

        <BiddingCreate db={db} id={id} open={open} handleClose={()=>{
            getBiddings()
            setOpen(false)
        }} />

        <div style={{display:"flex",gap:"8px",alignItems:"center",background:"#fff",marginBottom:"1rem",padding:".5rem",borderRadius:".75rem"}}>
            <IconButton onClick={()=>{
                navigate('..')
            }}>
                <IconChevronLeft></IconChevronLeft>
            </IconButton>

            <Typography color={theme.palette.secondary.main} style={{marginTop:"5px"}} gutterBottom variant={ 'h3' }>
                            Car details
                          </Typography>

                         
              </div>

              {product&&<Paper style={{marginBottom:".75rem"}}>
                            <Grid container gap={2}>

                                <Grid xs={6}>

                                    <img  src={`${config.baseUrl}/images/${product.image}`} 
                                    style={{width:"100%",height:"350px",objectFit:"cover",borderRadius:".5rem"}}  />
                                </Grid>

                                <Grid xs={5} style={{padding:".5rem"}}>
                                    <Typography variant="h2"> {product.name} </Typography> <Divider/>
                                    <Typography variant="h4">AED {new Intl.NumberFormat().format(product.price)} </Typography> <Divider/>
                                    <Typography variant="h4">Model: {product.model} </Typography><Divider/>
                                    <Typography variant="p">Car Detials: {product.details} </Typography>
                                </Grid>


                            </Grid>
                          </Paper>}


                          <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:".5rem"}}>
                          <Fab color="primary" size="small" onClick={()=>setOpen(true)} aria-label="add">
                            <IconPlus />
                            </Fab>
                            <Typography color={theme.palette.secondary.main} style={{marginTop:"5px"}} gutterBottom variant={ 'h3' }>
                            Biddings
                          </Typography>

                         

                          </div>

                         

                          <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>user</TableCell>
              <TableCell align="left">time</TableCell>
              <TableCell align="left">price</TableCell>
             
          
            </TableRow>
          </TableHead>
          <TableBody>
           {biddings.map(item=><TableRow key={item.id}>
              <TableCell>
            
                {item.user.name}
                
              
              </TableCell>
              <TableCell align="left">{moment(item.created_at).format("YYYY-MM-DD hh:mm a")}</TableCell>
              <TableCell align="left">AED {Intl.NumberFormat().format( item.price)}</TableCell>
             
          
          
             
              
           </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
        
    </Container>
    </>
}