import { sequelize } from "../config/db.js";
import { DataTypes, DATE } from "sequelize";

const BUILDINGS = sequelize.define('BUILDINGS', {
    building:{
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
    },
    building_code:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    plus_code:{
        type: DataTypes.STRING(255),
        allowNull: false,
    }

},{
    timestamps: true,
    tableName: 'buildings',
})

export default BUILDINGS;