const express = require('express');
const placeRoutes = express.Router();
const { Place, Rate } = require('./place.schema');

placeRoutes.route('/').get(function (req, res) {
  Place.find(function (err, places) {
    if (err) res.status(400).json({ msg: 'Something went wrong' });
    res.json(places);
  });
});

placeRoutes.route('/:id').get(function (req, res) {
  let id = req.params.id;
  Place.findById(id, function (err, place) {
    res.json(place.rating);
  });
});

placeRoutes.route('/:id/add').post(async function (req, res) {
  try {
    const { id } = req.params;
    Place.findByIdAndUpdate(id, {
      $push: {
        rating: req.body,
      },
    }).exec(function (err, result) {
      console.log(result);
      res.redirect('/places')
    });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

module.exports = placeRoutes;
