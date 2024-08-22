// import { useReducer } from 'react';

// export const AdminForm = ({ dest = {}, onSubmit }) => {
//     const initialState = {
//         name: dest.name || '',
//         country: dest.country || '',
//         description: dest.description || '',
//         averageBudget: dest.averageBudget || '',
//         profileImg: dest.profileImg || '',
//         additionalImages: dest.additionalImages || [],
//     };

//     const reducer = (state, action) => {
//         switch (action.type) {
//             case 'SET_FIELD':
//                 return { ...state, [action.field]: action.value };
//             case 'RESET':
//                 return initialState;
//             default:
//                 return state;
//         }
//     };

//     const [state, dispatch] = useReducer(reducer, initialState);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const updatedDest = { ...state };

//         if (dest.id) {
//             updatedDest.id = dest.id;  
//         }

//         onSubmit(updatedDest);
//         dispatch({ type: 'RESET' }); 
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>{dest.id ? 'Update Destination' : 'Add New Destination'}</h2>
//             <input
//                 type="text"
//                 value={state.name}
//                 onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
//                 placeholder="Destination Name"
//                 required
//             />
//             <input
//                 type="text"
//                 value={state.country}
//                 onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'country', value: e.target.value })}
//                 placeholder="Country"
//                 required
//             />
//             <textarea
//                 value={state.description}
//                 onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })}
//                 placeholder="Description"
//                 required
//             />
//             <input
//                 type="number"
//                 value={state.averageBudget}
//                 onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'averageBudget', value: e.target.value })}
//                 placeholder="Average Budget"
//                 required
//             />
//             <input
//                 type="text"
//                 value={state.profileImg}
//                 onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'profileImg', value: e.target.value })}
//                 placeholder="Profile Image URL"
//                 required
//             />
//             <input
//                 type="text"
//                 value={state.additionalImages.join(', ')}
//                 onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'additionalImages', value: e.target.value.split(',').map(url => url.trim()) })}
//                 placeholder="Additional Image URLs (comma-separated)"
//             />
//             <button type="submit">
//                 {dest.id ? 'Update Destination' : 'Add Destination'}
//             </button>
//         </form>
//     );
// };


import { useReducer } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Stack,
    Heading,
    ChakraProvider,
} from '@chakra-ui/react';

export const AdminForm = ({ dest = {}, onSubmit }) => {
    const initialState = {
        name: dest.name || '',
        country: dest.country || '',
        description: dest.description || '',
        averageBudget: dest.averageBudget || '',
        profileImg: dest.profileImg || '',
        additionalImages: dest.additionalImages || [],
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_FIELD':
                return { ...state, [action.field]: action.value };
            case 'RESET':
                return initialState;
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedDest = { ...state };

        if (dest.id) {
            updatedDest.id = dest.id;
        }

        onSubmit(updatedDest);
        dispatch({ type: 'RESET' });
    };

    return (
        <ChakraProvider>
            <Box as="form" onSubmit={handleSubmit} p={5} boxShadow="md" borderRadius="md" bg="white">
                <Heading as="h2" size="lg" mb={5}>
                    {dest.id ? 'Update Destination' : 'Add New Destination'}
                </Heading>
                <Stack spacing={4}>
                    <FormControl id="name" isRequired>
                        <FormLabel>Destination Name</FormLabel>
                        <Input
                            type="text"
                            value={state.name}
                            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
                            placeholder="Destination Name"
                        />
                    </FormControl>

                    <FormControl id="country" isRequired>
                        <FormLabel>Country</FormLabel>
                        <Input
                            type="text"
                            value={state.country}
                            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'country', value: e.target.value })}
                            placeholder="Country"
                        />
                    </FormControl>

                    <FormControl id="description" isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            value={state.description}
                            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })}
                            placeholder="Description"
                        />
                    </FormControl>

                    <FormControl id="averageBudget" isRequired>
                        <FormLabel>Average Budget</FormLabel>
                        <Input
                            type="number"
                            value={state.averageBudget}
                            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'averageBudget', value: e.target.value })}
                            placeholder="Average Budget"
                        />
                    </FormControl>

                    <FormControl id="profileImg" isRequired>
                        <FormLabel>Profile Image URL</FormLabel>
                        <Input
                            type="text"
                            value={state.profileImg}
                            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'profileImg', value: e.target.value })}
                            placeholder="Profile Image URL"
                        />
                    </FormControl>

                    <FormControl id="additionalImages">
                        <FormLabel>Additional Image URLs (comma-separated)</FormLabel>
                        <Input
                            type="text"
                            value={state.additionalImages.join(', ')}
                            onChange={(e) =>
                                dispatch({
                                    type: 'SET_FIELD',
                                    field: 'additionalImages',
                                    value: e.target.value.split(',').map((url) => url.trim()),
                                })
                            }
                            placeholder="Additional Image URLs (comma-separated)"
                        />
                    </FormControl>

                    <Button type="submit" colorScheme="teal" size="md">
                        {dest.id ? 'Update Destination' : 'Add Destination'}
                    </Button>
                </Stack>
            </Box>
        </ChakraProvider>
    );
};
