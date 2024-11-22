import { sequelize } from "../config/db";
import { DataTypes, DATE } from "sequelize";

const PASSWORD_RECOVERY = sequelize.define("forgot_password", {
    email:{
        type: DataTypes.STRING(255),
        validate: true,
        allowNull: false,
        primaryKey: true,
    },
    expires_at:{
        type: DataTypes.DATE(),
        allowNull: false,
    },
    reset_code:{
        type: DataTypes.STRING(6),
        allowNull: false,
    }
},
    {
        timestamps: true,
        tableName: 'forgot_password',

})

export default PASSWORD_RECOVERY;