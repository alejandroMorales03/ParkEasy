import { ERROR_CODE, SUCCESS } from "../../Constants/constants.js";
import BUILDINGS from "../../models/building_model.js";
import Sequelize from "sequelize";  // Assuming Sequelize is imported

const building_search = async (req, res) => {
    const error = {};
    const { search_value } = req.query;
    let response_status_code = SUCCESS;

    console.log(search_value)

    // Check if search_value is provided
    if (!search_value) {
        error.search_value = {
            code: ERROR_CODE.BAD_REQUEST,
            message: "Search value field is required."
        };
        response_status_code = ERROR_CODE.BAD_REQUEST;
        console.log(error);
        return res.status(response_status_code).json({ error: error });
    }


    try {
        // Search buildings based on building name or code
        const building_records = await BUILDINGS.findAll({
            attributes: ['building', 'building_code'], // Columns to retrieve
            where: {
                [Sequelize.Op.or]: [
                    {
                        building: {
                            [Sequelize.Op.iLike]: `%${search_value}%`  // Case-insensitive search for 'building'
                        }
                    },
                    {
                        building_code: {
                            [Sequelize.Op.iLike]: `%${search_value}%`  // Case-insensitive search for 'code'
                        }
                    }
                ]
            }
        });

        // If records are found, return them
        if (building_records.length > 0) {
            return res.status(response_status_code).json({
                data: building_records,
                message: `Successful search operation with entry "${search_value}"`
            });
        } else {
            // If no records are found, return an error
            error.code = ERROR_CODE.BAD_REQUEST;
            error.message = "No buildings found.";
            response_status_code = ERROR_CODE.BAD_REQUEST;
            console.log(error);
            return res.status(response_status_code).json({ error: error });
        }

    } catch (err) {
        // Handle unexpected errors
        error.code = ERROR_CODE.BAD_REQUEST;
        error.message = "An error occurred during the search operation.";
        response_status_code = ERROR_CODE.BAD_REQUEST;
        console.log(error);
        return res.status(response_status_code).json({ error: error });
    }
}

export default building_search;
