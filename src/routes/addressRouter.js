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

router.post('/', verify, postAddress);
router.get('/', verify, getAddress);
router.get('/:id', verify, getAddressById);
router.put('/:id', verify, updateAddress);
router.delete('/:id', verify, deleteAddress);

module.exports = router;
