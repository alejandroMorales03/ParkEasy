import { sequelize } from "../config/db.js";
import { DataTypes, DATE, NOW } from "sequelize";


const PENDING_USER = sequelize.define('PENDING_USER',{
    email:{
        type: DataTypes.STRING(255),
        unique: true,
        validate: true,
        allowNull: false,
        primaryKey: true,
    },
    verification_code: {
        type: DataTypes.STRING(6),
        allowNull: false,
    },
    expires_at:{
        type: DataTypes.DATE,
        allowNull: false,
    }

    

},{
    timestamps: false,
    tableName: 'pending_users',

})

export default PENDING_USER;

