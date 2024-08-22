// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {  useParams, useNavigate } from 'react-router-dom';
// const firebaseUrl = 'https://fir-22282-default-rtdb.asia-southeast1.firebasedatabase.app/destinations.json';

// export const DetailedView = ({ dest, onClose, onDelete }) => {
//     return (
//       <div className="detailed-view">
//         <button onClick={onClose}>Back</button>
//         <h2>{dest.name}</h2>
//         <p>{dest.country}</p>
//         <p>{dest.description}</p>
//         <div>
//           <img src={dest.profileImg} alt={`${dest.name} profile`} />
//           {dest.additionalImages && dest.additionalImages.map((img, index) => (
//             <img key={index} src={img} alt={`Slide ${index + 1}`} />
//           ))}
//         </div>
//         <p>Budget: ${dest.averageBudget}</p>
//         {dest.adminFlag && (
//           <button onClick={() => onDelete(dest.id)}>Delete</button>
//         )}
//       </div>
//     );
//   };



// export const Category = () => {
//     const { type } = useParams();
//     const [destinations, setDestinations] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//       fetchDestinations();
//     }, [type]);

//     const fetchDestinations = () => {
//       axios.get(firebaseUrl)
//         .then(response => {
//           if (response.data) {
//             const data = Object.keys(response.data).map(key => ({
//               id: key,
//               ...response.data[key],
//             }));
//             const filteredDestinations = data.filter(dest => dest.type === type);
//             setDestinations(filteredDestinations);
//           }
//         })
//         .catch(error => console.error('Error fetching data:', error));
//     };

//     return (
//       <div>
//         <h2>{type} Destinations</h2>
//         <div className="card-list">
//           {destinations.map(dest => (
//             <DestinationCard
//               key={dest.id}
//               dest={dest}
//               onClick={() => navigate(`/destination/${dest.id}`)}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };

// export  const DestinationCard = ({ dest, onClick }) => (
//     <div className="card" onClick={onClick}>
//       <img src={dest.profileImg} alt={dest.name} />
//       <h3>{dest.name}</h3>
//       <p>{dest.country}</p>
//       <p>Budget: ${dest.averageBudget}</p>
//     </div>
//   );





  import { Box, Button, Image, Text, Flex, SimpleGrid, ChakraProvider } from '@chakra-ui/react';

export const DetailedView = ({ dest, onClose, onDelete }) => {
  return (
    <ChakraProvider>
      <Box p={5} boxShadow="md" borderRadius="md" bg="white">
        <Button mb={4} onClick={onClose} colorScheme="teal">
          Back
        </Button>
        <Text fontSize="2xl" fontWeight="bold">
          {dest.name}
        </Text>
        <Text fontSize="lg" color="gray.600">
          {dest.country}
        </Text>
        <Text mt={4}>{dest.description}</Text>
        <Flex mt={4}>
          <Image src={dest.profileImg} alt={`${dest.name} profile`} borderRadius="md" />
          {dest.additionalImages && (
            <SimpleGrid columns={2} spacing={2} ml={4}>
              {dest.additionalImages.map((img, index) => (
                <Image key={index} src={img} alt={`Slide ${index + 1}`} borderRadius="md" />
              ))}
            </SimpleGrid>
          )}
        </Flex>
        <Text mt={4} fontSize="lg">
          Budget: ${dest.averageBudget}
        </Text>
        {dest.adminFlag && (
          <Button mt={4} colorScheme="red" onClick={() => onDelete(dest.id)}>
            Delete
          </Button>
        )}
      </Box>
    </ChakraProvider>
  );
};



import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';



const firebaseUrl = 'https://fir-22282-default-rtdb.asia-southeast1.firebasedatabase.app/destinations.json';

export const Category = () => {
  const { type } = useParams();
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDestinations();
  }, [type]);

  const fetchDestinations = () => {
    axios.get(firebaseUrl)
      .then(response => {
        if (response.data) {
          const data = Object.keys(response.data).map(key => ({
            id: key,
            ...response.data[key],
          }));
          const filteredDestinations = data.filter(dest => dest.type === type);
          setDestinations(filteredDestinations);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <ChakraProvider>
      <Box p={5}>
        <Text fontSize="2xl" mb={5}>{type} Destinations</Text>
        <SimpleGrid columns={[1, 2, 3]} spacing={5}>
          {destinations.map(dest => (
            <DestinationCard
              key={dest.id}
              dest={dest}
              onClick={() => navigate(`/destination/${dest.id}`)}
            />
          ))}
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
};





export const DestinationCard = ({ dest, onClick }) => (
  <ChakraProvider>
    <Box 
      onClick={onClick} 
      boxShadow="md" 
      borderRadius="md" 
      overflow="hidden" 
      bg="white" 
      cursor="pointer"
      _hover={{ boxShadow: 'lg' }}
    >
      <Image src={dest.profileImg} alt={dest.name} width="100%" height="200px" objectFit="cover" />
      <Box p={4}>
        <Text fontSize="xl" fontWeight="bold">
          {dest.name}
        </Text>
        <Text fontSize="md" color="gray.600">
          {dest.country}
        </Text>
        <Text mt={2} fontSize="sm">
          Budget: ${dest.averageBudget}
        </Text>
      </Box>
    </Box>
  </ChakraProvider>
);

