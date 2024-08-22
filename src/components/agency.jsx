
import { useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, Button, ChakraProvider, Flex, Heading, HStack } from '@chakra-ui/react';
import { Home } from './home';
import { Category } from './views';
import { DestinationDetails } from './DestinationDetails';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { theme: newTheme };
    default:
      return state;
  }
};

export const Appt = () => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <ChakraProvider>
      <Router>
        <Box className={`app ${state.theme}`} bg={state.theme === 'light' ? 'gray.100' : 'gray.800'} color={state.theme === 'light' ? 'black' : 'white'}>
          <Flex as="header" p={4} justifyContent="space-between" alignItems="center" bg={state.theme === 'light' ? 'blue.500' : 'blue.900'} color="white">
            <Heading as="h1" size="lg">
              Travel Planning App
            </Heading>
            <HStack spacing={4}>
              <Button as={Link} to="/" variant="link" color="white">
                Home
              </Button>
              <Button as={Link} to="/category/Adventure" variant="link" color="white">
                Adventure
              </Button>
              <Button as={Link} to="/category/Leisure" variant="link" color="white">
                Leisure
              </Button>
              <Button as={Link} to="/category/Cultural" variant="link" color="white">
                Cultural
              </Button>
              <Button onClick={toggleTheme} colorScheme="teal">
                Switch to {state.theme === 'light' ? 'Dark' : 'Light'} Mode
              </Button>
            </HStack>
          </Flex>

          <Box as="main" p={4}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:type" element={<Category />} />
              <Route path="/destination/:id" element={<DestinationDetails />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
};
