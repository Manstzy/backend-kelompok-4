const { nanoid } = require('nanoid');
// const { verify } = require('../middlewares/verifyToken');
const { address } = require('../models');

const postAddress = async (req, res) => {
  const addressId = `address-${nanoid(16)}`;
  const { userId } = req;
  const info = {
    id: addressId,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    contry: req.body.contry,
    province_city: req.body.provinceCity,
    complete_address: req.body.completeAddress,
    user_id: userId,
  };

  try {
    const addresses = await address.create(info);
    res.status(200).send({ message: 'success', data: addresses });
  } catch (error) {
    res.status(500).send({ message: 'server error' });
  }
};

const getAddress = async (req, res) => {
  const { userId } = req;
  try {
    const addresses = await address.findAll({
      where: {
        user_id: userId,
      },
    });
    res.status(200).send({ message: 'get data success', data: addresses });
  } catch (error) {
    res.status(500).send({ message: 'server error' });
  }
};
const getAddressById = async (req, res) => {
  const { userId } = req;
  const addressId = req.params.id;
  try {
    const addresses = await address.findOne({
      where: {
        user_id: userId,
        id: addressId,
      },
    });
    res.status(200).send({ message: 'get data success', data: addresses });
  } catch (error) {
    res.status(500).send({ message: 'server error' });
  }
};

const updateAddress = async (req, res) => {
  const addressId = req.params.id;
  const { userId } = req;

  try {
    await address.update(req.body, {
      where: { id: addressId, user_id: userId },
    });

    res.status(200).send({
      message: 'data address updated',
    });
  } catch (error) {
    res.status(500).send({ message: 'server error' });
  }
};

const deleteAddress = async (req, res) => {
  const addressId = req.params.id;
  const { userId } = req;
  try {
    await address.destroy({ where: { id: addressId, user_id: userId } });

    res.status(200).send({
      message: 'address deleted',
    });
  } catch (error) {
    res.status(500).send({ message: 'server error' });
  }
};

module.exports = {
  postAddress,
  getAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
};
