


import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Box, Flex, Grid, Input, Select, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text} from '@chakra-ui/react';
import { AdminForm } from './AdminForm';
import { DetailedView, DestinationCard } from './views';

const firebaseUrl = 'https://fir-22282-default-rtdb.asia-southeast1.firebasedatabase.app/destinations.json';

const initialState = {
  destinations: [],
  selectedDestination: null,
  searchTerm: '',
  selectedCountry: '',
  budgetRange: [0, 5000],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DESTINATIONS':
      return { ...state, destinations: action.payload };
    case 'SET_SELECTED_DESTINATION':
      return { ...state, selectedDestination: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_SELECTED_COUNTRY':
      return { ...state, selectedCountry: action.payload };
    case 'SET_BUDGET_RANGE':
      return { ...state, budgetRange: action.payload };
    default:
      return state;
  }
};

export const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = () => {
    axios.get(firebaseUrl)
      .then(response => {
        if (response.data) {
          const data = Object.keys(response.data).map(key => ({
            id: key,
            ...response.data[key],
          }));
          dispatch({ type: 'SET_DESTINATIONS', payload: data });
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleCardClick = (dest) => {
    dispatch({ type: 'SET_SELECTED_DESTINATION', payload: dest });
  };

  const handleFilter = () => {
    return state.destinations.filter(dest => {
      return (
        dest.name.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
        (state.selectedCountry ? dest.country === state.selectedCountry : true) &&
        dest.averageBudget >= state.budgetRange[0] && dest.averageBudget <= state.budgetRange[1]
      );
    });
  };

  const handleSubmit = (dest) => {
    if (dest.id) {
      axios.patch(`${firebaseUrl.replace('.json', '')}/${dest.id}.json`, dest)
        .then(fetchDestinations)
        .catch(error => console.error('Error updating data:', error));
    } else {
      axios.post(firebaseUrl, dest)
        .then(fetchDestinations)
        .catch(error => console.error('Error adding data:', error));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${firebaseUrl.replace('.json', '')}/${id}.json`)
      .then(fetchDestinations)
      .catch(error => console.error('Error deleting data:', error));
  };

  return (
    <Box p={4}>
      <Flex as="header" direction="column" mb={4}>
        <Input 
          placeholder="Search by city..."
          value={state.searchTerm} 
          onChange={(e) => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })} 
          mb={4}
        />
        <Select placeholder="All Countries" onChange={(e) => dispatch({ type: 'SET_SELECTED_COUNTRY', payload: e.target.value })} mb={4}>
          {[...new Set(state.destinations.map(dest => dest.country))].map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </Select>
        <Flex align="center" mb={4}>
          <Slider 
            min={0} 
            max={5000} 
            value={state.budgetRange[1]} 
            onChange={(val) => dispatch({ type: 'SET_BUDGET_RANGE', payload: [0, val] })}
            flex="1"
            mr={4}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text>Budget up to ${state.budgetRange[1]}</Text>
        </Flex>
      </Flex>

      <Box as="main">
        {state.selectedDestination ? (
          <DetailedView 
            dest={state.selectedDestination} 
            onClose={() => dispatch({ type: 'SET_SELECTED_DESTINATION', payload: null })} 
            onDelete={handleDelete}
          />
        ) : (
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={20}>
            {handleFilter().map(dest => (
              <DestinationCard key={dest.id} dest={dest} onClick={() => handleCardClick(dest)} />
            ))}
          </Grid>
        )}
      </Box>

      <Box as="footer" mt={8}>
        <AdminForm onSubmit={handleSubmit} />
        {state.selectedDestination && state.selectedDestination.adminFlag && (
          <AdminForm dest={state.selectedDestination} onSubmit={handleSubmit} />
        )}
      </Box>
    </Box>
  );
};
