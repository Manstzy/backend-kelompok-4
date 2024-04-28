const express = require('express');
const { verify } = require('../middlewares/verifyToken');
const {
  postAddress,
  getAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
} = require('../controllers/addressController');

const router = express.Router();

router.post('/addAddress', verify, postAddress);
router.get('/getAllAddress', verify, getAddress);
router.get('/getOneAddress/:id', verify, getAddressById);
router.put('/putAddress/:id', verify, updateAddress);
router.delete('/deleteAddress/:id', verify, deleteAddress);

module.exports = router;
