const User = require('../models/user');

const VALIDATION_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const COMMON_ERROR_CODE = 500;
const NOT_FOUND_ERROR_TEXT = 'Запрашиваемый пользователь не найден';

function getStatusCode(err) {
  if (err.message === NOT_FOUND_ERROR_TEXT) {
    return NOT_FOUND_ERROR_CODE;
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return VALIDATION_ERROR_CODE;
  }

  return COMMON_ERROR_CODE;
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(getStatusCode(err)).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error(NOT_FOUND_ERROR_TEXT))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => res.status(getStatusCode(err)).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const user = req.body;

  User.create(user)
    .then((newUser) => res.send({ data: newUser }))
    .catch((err) => res.status(getStatusCode(err)).send({ message: err.message }));
};

module.exports.patchUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true, upsert: false })
    .then((user) => {
      if (user === null) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: NOT_FOUND_ERROR_TEXT });
      }
      res.send({ data: user });
    })
    .catch((err) => res.status(getStatusCode(err)).send({ message: err.message }));
};

module.exports.patchAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true, upsert: false },
  )
    .orFail(new Error(NOT_FOUND_ERROR_TEXT))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => res.status(getStatusCode(err)).send({ message: err.message }));
};
