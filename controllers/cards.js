const Card = require('../models/card');

const VALIDATION_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const COMMON_ERROR_CODE = 500;
const NOT_FOUND_ERROR_TEXT = 'Запрашиваемая карточка не найдена';

function getStatusCode(errorName) {
  if (errorName === 'ValidationError' || errorName === 'CastError') {
    return VALIDATION_ERROR_CODE;
  }

  return COMMON_ERROR_CODE;
}

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(getStatusCode(err.name)).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: NOT_FOUND_ERROR_TEXT });
      }
      res.send({ data: card });
    })
    .catch((err) => res.status(getStatusCode(err.name)).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const card = req.body;
  card.owner = req.user._id;

  Card.create(card)
    .then((newCard) => res.send({ data: newCard }))
    .catch((err) => res.status(getStatusCode(err.name)).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: NOT_FOUND_ERROR_TEXT });
      }
      res.send({ data: card });
    })
    .catch((err) => res.status(getStatusCode(err.name)).send({ message: err.message }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: NOT_FOUND_ERROR_TEXT });
      }
      res.send({ data: card });
    })
    .catch((err) => res.status(getStatusCode(err.name)).send({ message: err.message }));
};
