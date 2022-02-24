const express = require('express');
const { getAllVulservers, createVulserver, updateVulserver, deleteVulserver, getVulserverDetails } = require('../controllers/vulserverController');

const router = express.Router();

router.route('/vulservers').get(getAllVulservers)
router.route('/vulserver/new').post(createVulserver)
router.route('/vulserver/:id').put(updateVulserver).delete(deleteVulserver).get(getVulserverDetails);

module.exports = router