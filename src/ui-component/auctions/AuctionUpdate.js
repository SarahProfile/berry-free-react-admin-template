import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, OutlinedInput, Typography } from '@mui/material';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box } from '@mui/system';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { useEffect } from 'react';
export default function AuctionUpdate(props) {

    const theme = useTheme();
    const [image,setImage]=useState(null)



  return (
    <div>
   
      <Dialog open={props.open} onClose={props.handleClose} fullWidth>
        <DialogTitle>
        <Typography color={theme.palette.secondary.main} gutterBottom variant={ 'h3' }>
                            Car update
                          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a car to start an auction
          </DialogContentText>
          <Formik
        initialValues={{
          name:props.item.name,
          model: props.item.model,
          price:props.item.price,
          details: props.item.details,
          image:"",
          submit: null
        }}
        validationSchema={Yup.object().shape({
          name:Yup.string().max(255).required("name is required"),
          price:Yup.string().max(255).required("price is required"),
          model:Yup.string().max(255).required("model is required"),
          details:Yup.string().max(255).required("details is required"),
          
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const form=new FormData()
          const formValues={...values,image}
          console.info(image)
          for(let x in formValues)
          {
            form.append(x,formValues[x])
          }
          axios.post(`/api/auction/${props.item.id}`,form).then(res=>{
           props.handleClose()
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
          <form noValidate onSubmit={handleSubmit} enctype="multipart/form-data"  >

<Grid item xs={12} sm={12}>
              <label>Image</label>
                <TextField 
                  fullWidth
                  label=""
                  margin="normal"
                  name="image"
                  onChange={(e)=>{setImage(e.target.files[0])
                    //console.log(e.target.files[0])
                    handleChange(e)
                  }}
                  type="file"
                  defaultValue=""
                  onBlur={handleBlur}
                  //onChange={handleChange}
                  sx={{ ...theme.typography.customInput }}
                />
               
              </Grid>
            
              <Grid item xs={12} sm={12}>
                <TextField error={Boolean(touched.name && errors.name)}
                  fullWidth
                  label="name"
                  margin="normal"
                  name="name"
                  required
                  type="text"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={{ ...theme.typography.customInput }}
                />
                 {touched.name && errors.name && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.name}
                </FormHelperText>
              )}
              </Grid>
              
            
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


            <Grid item xs={12} sm={12}>
                <TextField error={Boolean(touched.model && errors.model)}
                  fullWidth
                  label="Model"
                  margin="normal"
                  name="model"
                  required
                  type="number"
                  value={values.model}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={{ ...theme.typography.customInput }}
                />
                 {touched.model && errors.model && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.model}
                </FormHelperText>
              )}
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField error={Boolean(touched.details && errors.details)}
                  fullWidth
                  label="Details"
                  margin="normal"
                  name="details"
                  
                  required
                  type="text"
                  value={values.details}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={{ ...theme.typography.customInput }}
                />
                 {touched.details && errors.details && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.details}
                </FormHelperText>
              )}
              </Grid>

             
          

        

         
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
                  Update
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