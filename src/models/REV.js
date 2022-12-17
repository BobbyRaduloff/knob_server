import mongoose, { Schema } from "mongoose";
import { BulgarianCitiesCyrillic, BulgarianCitiesLatin } from "#constants/cities";

const REVSchema = new Schema({
  certificate_number: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете номер на сертификата."],
    trim: true,
    unique: true,
  },
  issued_on: {
    type: Schema.Types.Date,
    required: [true, "Моля предоставете дата на издаване."],
  },
  valid_until: {
    type: Schema.Types.Date,
    required: [true, "Моля предоставете дата за истичане на валидността."],
  },
  latin_name: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете име на латиница."],
  },
  cyrilic_name: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете име на кирилица."],
  },
  latin_city: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете град на латиница."],
    enum: BulgarianCitiesLatin,
  },
  cyrilic_city: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете град на кирилица."],
    enum: BulgarianCitiesCyrillic,
  },
});

module.exports = mongoose.models.REV || mongoose.model("REV", REVSchema);
