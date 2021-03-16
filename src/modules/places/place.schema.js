const { Schema, model } = require('mongoose');

const placeLocaleSchema = new Schema({
  _id: false,
  lang: {
    type: String,
    required: true,
  },
  name: String,
  description: String
});

const rateSchema = new Schema({
  id: Schema.Types.ObjectId,
  username: String,
  rate: Number
})

const placeSchema = new Schema({
  countryId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  rating: [rateSchema],
  localizations: [placeLocaleSchema],
});

const Place = model('Place', placeSchema);
const Rate = model('Rate', rateSchema)

module.exports = {Place, Rate};
