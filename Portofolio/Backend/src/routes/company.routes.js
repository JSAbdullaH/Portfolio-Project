const { Router } = require('express');
const { authenticate } = require('../middlewares/auth.middleware');
const companyController = require('../controllers/company.controller');

const router = Router();

router.get('/me', authenticate, companyController.getMe);

module.exports = router;
