import { sequelize } from "../config/db.js";
import { DataTypes} from "sequelize";

const USER = sequelize.define("USER", {
    first_name:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    last_name:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(255),
        unique: true,
        validate: true,
        allowNull: false,
        primaryKey: true,

    },
    password:{
        type: DataTypes.STRING(255),
        allowNull: false,
    }

},{
    timestamps: false,
    tableName: 'users',

})

export default USER;