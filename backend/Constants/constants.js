const ERROR_CODE = {
    BAD_REQUEST: 400,
    UNPROCESSABLE_ENTITY: 422,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,


};

const SUCCESS = 200;
const SALT_ROUNDS = 10;
const EXPIRATION_MINUTES_FOR_CODE = 15;

const SERVER_ERROR_MESSAGE = "Something went wrong. Please try again later."

export default {ERROR_CODE, SUCCESS};