
import cron from 'node-cron';
import PENDING_USER from '../models/pending_user_model.js';
import PASSWORD_RECOVERY from '../models/password_recovery_model.js';
import { Op } from 'sequelize';

const deleteExpiredCodes = async () => {
  try {

    const current_time = new Date().toISOString();
    
    const pending_user_records = await PENDING_USER.destroy({
      where: {
        expires_at:{
          [Op.gt]: current_time,
        }
      }
    })

    const recovery_password_records = PASSWORD_RECOVERY.destroy({
      where:{
        expires_at:{
          [Op.gt]: current_time,
        }
      }


    })
    
    console.log(`Deleted ${pending_user_records.length} expired rows from pending_users.`);
    console.log(`Deleted ${recovery_password_records.rowCount} expired rows from forgot_password.`);
    
  } catch (error) {
    console.error('Error deleting expired codes:', error);
  }
};

cron.schedule('0 * * * *', () => {
  deleteExpiredCodes();
});
