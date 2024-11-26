import { ERROR_CODE, SUCCESS } from "../../Constants/constants.js";
import BUILDINGS from "../../models/building_model.js";

const building_search = async(req, res) =>{
    const error = {}
    const {search_value} = req.query;
    let response_status_code = SUCCESS;

    if(!search){
        error.search_value.code = ERROR_CODE.BAD_REQUEST;
        error.search_value.message = "Search value field is required."
        response_status_code = ERROR_CODE.BAD_REQUEST;
        console.log(error);
        return res.status(response_status_code).json({error: error});
    }

    try{
        const building_records = await BUILDINGS.findAll({
            attributes: ['building', 'building_code'], // Specific columns to retrieve
            where: {
                [Sequelize.Op.or]: [
                    {
                        building: {
                            [Sequelize.Op.iLike]: `%${query}%`  // Case-insensitive search for 'building'
                        }
                    },
                    {
                        building_code: {
                            [Sequelize.Op.iLike]: `%${query}%`  // Case-insensitive search for 'code'
                        }
                    }
                ]
            }
        });
        

        if(building_records.length > 0){
            return res.status(response_status_code).json({
                data: building_records,
                message: `Successful search operatio with entry ${search_value}`,
        })

        }else{
            error.code = ERROR_CODE.BAD_REQUEST;
            error.message = "No buildings found."
            response_status_code = ERROR_CODE.BAD_REQUEST;
            console.log(error);
            return res.status(response_status_code).json({error: error});
        }
        

    }catch(err){
        error.code = ERROR_CODE.BAD_REQUEST;
        error.message = "Search value field is required."
        response_status_code = ERROR_CODE.BAD_REQUEST;
        console.log(error);
        return res.status(response_status_code).json({error: error});
    }
}

export default building_search;