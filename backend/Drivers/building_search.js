import axios from 'axios';

// Define the base URL of the API
const API_URL = 'http://192.168.0.7:8000/api/acc/building-search';

// Function to test the building_search API
const testBuildingSearch = async (search) => {
  try {
    // Make a GET request to the building_search API with search_value as query parameter
    const response = await axios.get(API_URL, {
        params: { search_value: search }  // Correct way to send the query parameter
    });

    // Log only the response data
    console.log(response.data);
  } catch (error) {
    console.log(`Unsuccessful search operation with  ${search}`);
    console.error(error.message);
  
  }
  console.log("--------------------------------------------------");
};

// Test cases
const testCases = [
  { search: 'Academic Health Center 1'},  // Test with valid building
  { search: 'AHC1'},                     // Test valid test code
  { search: 'NonExistent Building'},     // Test with invalid building
  { search: 'ACCC'},                     // Test with invalid code
  { search: ''},                         // Test with empty search value
];

// Run the test for each search query
testCases.forEach(({ search }) => {
  testBuildingSearch(search);  // Pass the search value to the function
});
