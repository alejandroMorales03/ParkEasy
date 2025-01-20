import axios from 'axios';


// Define the base URL of the API
const API_URL = 'http://192.168.0.7:8000/api/acc/building-selection';

// Function to test the building_search API
const testBuildingSelection = async (building, code) => {
  try {
    // Make a GET request to the building_search API with search_value as query parameter
    const response = await axios.get(API_URL, {
        params: {
            building,
            code,
        }
    });

    // Log only the response data
    console.log(response.data);
  } catch (error) {
    console.log(`Unsuccessful select operation with  ${building} and ${code}`);
    console.error(error.message);
  
  }
  console.log("--------------------------------------------------");
};

// Test cases
const testCases = [
  { building: 'Academic Health Center 1', code: 'AHC1'},    // Test with valid building and code
  { building: 'Academic Health Center 23', code: 'AHC1'},   // Test invalid building and valid code
  { building: 'Academic Health Center 1', code:''},         // Test with valid building and no code
  { building: '', code: 'AHC1'},                            // Test with invalid code and no building
  { building: '', code: ''},                                // Test with empty search value
];

// Run the test for each search query
testCases.forEach(({ building, code }) => {
  testBuildingSelection(building, code);  // Pass the search value to the function
});
