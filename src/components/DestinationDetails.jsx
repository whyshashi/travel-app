
import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Image, Spinner, Text, Heading, Grid } from '@chakra-ui/react';

const firebaseUrl = 'https://fir-22282-default-rtdb.asia-southeast1.firebasedatabase.app/destinations.json';

const initialState = {
  destination: null,
  loading: true,
  error: null,
};

const ACTIONS = {
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  SET_LOADING: 'SET_LOADING',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_SUCCESS:
      return { ...state, destination: action.payload, loading: false };
    case ACTIONS.FETCH_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export const DestinationDetails = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      dispatch({ type: ACTIONS.SET_LOADING });
      try {
        const response = await axios.get(`${firebaseUrl.replace('.json', '')}/${id}.json`);
        if (response.data) {
          dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { id, ...response.data } });
        }
      } catch (error) {
        dispatch({ type: ACTIONS.FETCH_ERROR, payload: 'Error fetching destination details.' });
        console.error('Error fetching destination details:', error);
      }
    };

    fetchDestinationDetails();
  }, [id]);

  const { destination, loading, error } = state;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Text fontSize="lg" color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Button onClick={() => navigate(-1)} mb={4} colorScheme="teal">
        Back
      </Button>
      <Heading as="h2" size="xl" mb={4}>{destination.name}</Heading>
      <Text fontSize="lg" mb={2}>Country: {destination.country}</Text>
      <Text mb={4}>{destination.description}</Text>
      <Image src={destination.profileImg} alt={`${destination.name} profile`} borderRadius="md" mb={4} />
      {destination.additionalImages && (
        <Grid templateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap={4}>
          {destination.additionalImages.map((img, index) => (
            <Image key={index} src={img} alt={`Slide ${index + 1}`} borderRadius="md" />
          ))}
        </Grid>
      )}
      <Text fontSize="lg" mt={4}>Budget: ${destination.averageBudget}</Text>
    </Box>
  );
};
