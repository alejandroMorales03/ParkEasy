import express from 'express';
import building_search from '../controllers/Account/building_search.js';
import building_selection from '../controllers/Account/building_selection.js';

const router = express.Router();

router.get('/building-search', building_search);
router.get('/building-selection', building_selection);

export default router;