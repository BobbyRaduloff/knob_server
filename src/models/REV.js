import mongoose, { Schema } from "mongoose";
import { BulgarianCitiesCyrillic, BulgarianCitiesLatin } from "#constants/cities";

const REVSchema = new Schema({
  certificate_number: {
    type: Schema.Types.String,
    required: [true, "Please provide a certificate number."],
    trim: true,
    unique: true,
  },
  issued_on: {
    type: Schema.Types.Date,
    required: [true, "Please provide a date of issue."],
  },
  valid_until: {
    type: Schema.Types.Date,
    required: [true, "Please provide a date of expiry."],
  },
  latin_name: {
    type: Schema.Types.String,
    required: [true, "Please provide a latin name."],
  },
  cyrilic_name: {
    type: Schema.Types.String,
    required: [true, "Please provide a cyrilic name."],
  },
  latin_city: {
    type: Schema.Types.String,
    required: [true, "Please provide a latin city."],
    enum: BulgarianCitiesLatin,
  },
  cyrilic_city: {
    type: Schema.Types.String,
    required: [true, "Please provide a cyrilic city."],
    enum: BulgarianCitiesCyrillic,
  },
});

module.exports = mongoose.models.REV || mongoose.model("REV", REVSchema);
