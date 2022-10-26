import React from 'react';
import {
  ChakraProvider,
  Box,
  theme
} from '@chakra-ui/react';
import Navbar from './components/Pages/Navbar';
import AllRoutes from './components/Routes/AllRoutes';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Navbar/>
        <AllRoutes/>
      </Box>
    </ChakraProvider>
  );
}

export default App;
