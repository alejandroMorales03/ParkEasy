import { sequelize } from "../config/db";
import { DataTypes, DATE, NOW } from "sequelize";

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
        type: DataTypes.STRING(250),
        unique: true,
        validate: true,
        allowNull: false,
        primaryKey: true,

    },
    password:{
        type: DataTypes.STRING(230),
        allowNull: false,
    }

},{
    timestamps: true,
    tableName: 'users',

})

export default USER;