import mongoose, { Schema } from "mongoose";
import { CertificateType } from "#constants/certificates";
import { BulgarianCitiesCyrillic } from "#constants/cities";
import { UserTypes } from "#constants/users";

const UserSchema = new Schema({
  number: {
    type: Schema.Types.Number,
    required: [true, "Please provide a number."],
    unique: true,
    min: 1,
  },
  type: {
    type: Schema.Types.String,
    required: true,
    enum: UserTypes,
  },
  first_name: {
    type: Schema.Types.String,
    required: [true, "Please provide a first name."],
    trim: true,
  },
  middle_name: {
    type: Schema.Types.String,
    required: [true, "Please provide a middle name."],
    trim: true,
  },
  last_name: {
    type: Schema.Types.String,
    required: [true, "Please provide a last name."],
    trim: true,
  },
  capacity: {
    type: [
      new Schema({
        value: Schema.Types.String,
        enum: CertificateType,
      }),
    ],
    required: [true, "Please provide one or more capacities."],
  },
  is_knob_member: {
    type: Schema.Types.Boolean,
    required: true,
  },
  invalid_certificates: {
    type: [Schema.Types.ObjectId],
    ref: "Certificate",
  },
  current_valid_certificate: {
    type: Schema.Types.ObjectId,
    ref: "Certificate",
  },
  address: {
    type: Schema.Types.String,
    trim: true,
  },
  mobile_phone: {
    type: Schema.Types.String,
    trim: true,
    match: /(\+)?(359|0)8[789]\d{1}(|-| )\d{3}(|-| )\d{3}/,
  },
  landline: {
    type: Schema.Types.String,
    trim: true,
  },
  specialty: {
    type: Schema.Types.String,
    trim: true,
  },
  experience: {
    type: Schema.Types.String,
    trim: true,
  },
  education: {
    type: Schema.Types.String,
    trim: true,
  },
  city: {
    type: Schema.Types.String,
    trim: true,
    required: [true, "Please provide a city."],
    enum: BulgarianCitiesCyrillic,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
