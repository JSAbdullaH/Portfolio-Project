const AppError = require('../utils/AppError');
const companyModel = require('../models/company.model');

async function getMe(req, res) {
  const company = await companyModel.findById(req.auth.companyId);
  if (!company) throw new AppError(404, 'NOT_FOUND', 'Company not found');
  res.json(company);
}

module.exports = { getMe };
