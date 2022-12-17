import mongoose, { Schema } from "mongoose";
import { CertificateType } from "#constants/certificates";
import { BulgarianCitiesCyrillic } from "#constants/cities";

const CompanySchema = new Schema({
  number: {
    type: Schema.Types.Number,
    required: [true, "Моля предоставете номер на фирмата."],
    unique: true,
    min: 1,
  },
  name: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете име на фирмата."],
    trim: true,
  },
  city: {
    type: Schema.Types.String,
    trim: true,
    required: [true, "Моля предоставете град на фирмата."],
    enum: BulgarianCitiesCyrillic,
  },
  capacity: {
    type: [
      new Schema({
        value: Schema.Types.String,
        enum: CertificateType,
      }),
    ],
    required: [true, "Моля предоставете оценителски капацитет на фирмата."],
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
  eik: {
    type: Schema.Types.String,
    trim: true,
    unique: true,
  },
  valuers: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});

module.exports = mongoose.models.Company || mongoose.model("Company", CompanySchema);
