import express from 'express';
import building_search from '../controllers/Account/building_search.js';

const router = express.Router();

router.get('/building-search', building_search);

export default router;