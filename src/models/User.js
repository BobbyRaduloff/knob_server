import mongoose, { Schema } from "mongoose";
import { CertificateType } from "#constants/certificates";
import { BulgarianCitiesCyrillic } from "#constants/cities";
import { UserTypes } from "#constants/users";

const UserSchema = new Schema({
  number: {
    type: Schema.Types.Number,
    required: [true, "Моля предоставете номер на сертификата."],
    unique: true,
    min: 1,
  },
  email: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете имейл на потребителя."],
    trim: true,
    unique: [true, "Този имейл вече е зает."],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Моля предоставете валиден имейл."],
  },
  password_hash: {
    type: Schema.Types.String,
    trim: true,
  },
  type: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете тип на потребителя."],
    enum: UserTypes,
  },
  first_name: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете име на потребителя."],
    trim: true,
  },
  middle_name: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете презиме на потребителя."],
    trim: true,
  },
  last_name: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете фамилия на потребителя."],
    trim: true,
  },
  capacity: {
    type: [
      new Schema({
        value: Schema.Types.String,
        enum: CertificateType,
      }),
    ],
  },
  is_knob_member: {
    type: Schema.Types.Boolean,
    required: [true, "Моля предоставете информация дали потребителя е член на КНОБ."],
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
    required: [true, "Моля предоставете град на потребителя."],
    enum: BulgarianCitiesCyrillic,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
