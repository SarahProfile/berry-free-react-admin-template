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
export default function AuctionDelete(props) {

    const theme = useTheme();



  return (
    <div>
   
      <Dialog open={props.open} onClose={props.handleClose} fullWidth>
        <DialogTitle>
        <Typography color={theme.palette.secondary.main} gutterBottom variant={ 'h3' }>
                            Car delete
                          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           You are deleting this car
          </DialogContentText>
        

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
              <Button disableElevation
               onClick={()=>{
                props.handleClose()
               }}
                size="large" type="button" variant="outlined" color="secondary">
                  cancel
                </Button>
                <Button style={{marginInlineStart:"8px"}}
                onClick={()=>{
                  axios.delete(`/api/auction/${props.id}`)
                  props.handleClose()
                }}
                 size="large" type="submit" variant="contained" color="error">
                  Delete
                </Button>
              </AnimateButton>
            </Box>
     
        </DialogContent>
      
      </Dialog>
    </div>
  );
}