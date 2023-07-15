import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FormControl,FormHelperText, Grid, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { collection, doc, setDoc } from "firebase/firestore"; 
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box } from '@mui/system';
import { useTheme } from '@emotion/react';
import { useState } from 'react';

export default function BiddingCreate(props) {

    const theme = useTheme();

   const [image,setImage]=useState(null)



  return (
    <div>
   
      <Dialog open={props.open} onClose={props.handleClose} fullWidth>
        <DialogTitle>
        <Typography color={theme.palette.secondary.main} gutterBottom variant={ 'h3' }>
                            Bidding create
                          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add your bidding
          </DialogContentText>
          <Formik
        initialValues={{
          price:"",
          submit: null
        }}
        validationSchema={Yup.object().shape({
         
          price:Yup.string().max(255).required("price is required"),
        
          
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
         
          axios.post('/api/bidding',{...values,product_id:props.id}).then(async(res)=>{
           
           props.handleClose()
           const newCityRef = doc(collection(props.db, "biddings"));

                // later...
                await setDoc(newCityRef,{...values,product_id:props.id} );
          }).catch(err=>{
            console.log(err)
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          })
          // try {
          //   if (scriptedRef.current) {
              
          //    setStatus({ success: true });
          //     setSubmitting(false);

          //   }
          // } catch (err) {
          //   console.error(err);
          //   if (scriptedRef.current) {
          //     setStatus({ success: false });
          //     setErrors({ submit: err.message });
          //     setSubmitting(false);
          //   }
          // }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} enctype="multipart/form-data" >


            
         
              
            
            <FormControl fullWidth error={Boolean(touched.price && errors.price)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Price</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="number"
                value={values.price}
                name="price"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.price && errors.price && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.price}
                </FormHelperText>
              )}
            </FormControl>


             
          

        

         
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
              <Button disableElevation
               onClick={()=>{
                props.handleClose()
               }}
                size="large" type="button" variant="outlined" color="secondary">
                  cancel
                </Button>
                <Button style={{marginInlineStart:"8px"}} disableElevation disabled={isSubmitting}  size="large" type="submit" variant="contained" color="secondary">
                  save
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
        </DialogContent>
      
      </Dialog>
    </div>
  );
}