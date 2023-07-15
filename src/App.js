import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';
import config from './config'
// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';

// ==============================|| APP ||============================== //

const App = () => {
  const { pathname } = useLocation;
  const customization = useSelector((state) => state.customization);
  const navigation=useNavigate()
useEffect(()=>{
  console.log(pathname)
  console.log(config.baseUrl)
  axios.defaults.baseURL = config.baseUrl
  const token=localStorage.getItem("token")
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  if(!token&&pathname!=="/login")
  {
    navigation('/login')
  }
},[])
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
