const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const {
  getUsers,
  getUser,
  getMe,
  patchUser,
  patchAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }).unknown(true),
}), getUser);
router.get('/me', getMe);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }).unknown(true),
}), patchUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri(),
  }).unknown(true),
}), patchAvatar);

module.exports = router;
