
import cron from 'node-cron';
import { db } from '../config/db.js';

const deleteExpiredCodes = async () => {
  try {

    const currentTime = new Date().toISOString();
    
    const pendingUsers = await db.query(
      'DELETE FROM pending_users WHERE expires_at < $1',
      [currentTime]
    );

    const forgotPasswordUsers = await db.query(
      'DELETE FROM recovery_password WHERE expires_at < $1'
    )
    
    console.log(`Deleted ${pendingUsers.rowCount} expired rows from pending_users.`);
    console.log(`Deleted ${forgotPasswordUsers.rowCount} expired rows from pending_users.`);
    
  } catch (error) {
    console.error('Error deleting expired codes:', error);
  }
};

cron.schedule('0 * * * *', () => {
  deleteExpiredCodes();
});
