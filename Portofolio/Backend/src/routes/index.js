const { Router } = require('express');
const authRoutes = require('./auth.routes');
const companyRoutes = require('./company.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/companies', companyRoutes);

module.exports = router;
