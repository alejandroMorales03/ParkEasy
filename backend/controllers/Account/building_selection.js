import { ERROR_CODE, SUCCESS } from "../../Constants/constants.js";
import BUILDINGS from "../../models/building_model.js";
import { Op } from 'sequelize'; // Import Op from Sequelize for condition handling

const building_selection = async (req, res) => {
    const error = {};
    const { building, code } = req.query;  // Get building name and code from query params
    let response_status_code = SUCCESS;

    // Check if both building and code are provided
    if (!building) {
        error.building = {
            code: ERROR_CODE.BAD_REQUEST,
            message: "Building field is required."
        };
        response_status_code = ERROR_CODE.BAD_REQUEST;
        console.log(error);
        return res.status(response_status_code).json({ error: error });
    }

    if (!code) {
        error.code = {
            code: ERROR_CODE.BAD_REQUEST,
            message: "Code field is required."
        };
        response_status_code = ERROR_CODE.BAD_REQUEST;
        console.log(error);
        return res.status(response_status_code).json({ error: error });
    }

    try {
        // Query to find the building based on the building name and building code
        const building_records = await BUILDINGS.findOne({
            attributes: ['building', 'building_code', 'plus_code'], // Columns to retrieve
            where: {
                building: {
                    [Op.iLike]: building  // Case-insensitive search for building name
                },
                building_code: {
                    [Op.iLike]: code  // Case-insensitive search for building code
                }
            }
        });

        // If building is found, return the details
        if (building_records) {
            return res.status(response_status_code).json({
                data: building_records,
                message: `Successful search operation with entry ${building} and ${code}`
            });
        } else {
            // If no building is found, return an error
            error.code = ERROR_CODE.BAD_REQUEST;
            error.message = "No buildings found.";
            response_status_code = ERROR_CODE.BAD_REQUEST;
            console.log(error);
            return res.status(response_status_code).json({ error: error });
        }

    } catch (err) {
        // Handle any other errors
        error.code = ERROR_CODE.BAD_REQUEST;
        error.message = "An error occurred while searching for the building.";
        response_status_code = ERROR_CODE.BAD_REQUEST;
        console.log(error);
        return res.status(response_status_code).json({ error: error });
    }
};

export default building_selection;
