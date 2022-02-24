const express = require('express');
const { getAllVulapps, createVulapp, updateVulapp, deleteVulapp, getVulappDetails } = require('../controllers/vulappController');

const router = express.Router();

router.route('/vulapps').get(getAllVulapps)
router.route('/vulapp/new').post(createVulapp)
router.route('/vulapp/:id').put(updateVulapp).delete(deleteVulapp).get(getVulappDetails);

module.exports = router