import mongoose, { Schema } from "mongoose";
import { CertificateType } from "#constants/certificates";

const CertificateSchema = new Schema({
  number: {
    type: Schema.Types.Number,
    required: [true, "Моля предоставете номер на сертификата."],
    unique: true,
    min: 1,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, "Моля предоставете собственик на сертификата."],
    refPath: "owner_type",
  },
  owner_type: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете тип на собственик на сертификата."],
    enum: ["User", "Company"],
  },
  certificate_number: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете номер на сертификата."],
    trim: true,
    unique: true,
  },
  is_valid: {
    type: Schema.Types.Boolean,
    required: [true, "Моля предоставете информция за дали сертификата е валиден."],
  },
  reason_for_invalidation: {
    type: Schema.Types.String,
    trim: true,
  },
  certificate_type: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете тип на сертификата."],
    enum: CertificateType,
  },
  new_certificate: {
    type: Schema.Types.ObjectId,
    ref: "Certificate",
  },
});

module.exports = mongoose.models.Certificate || mongoose.model("Certificate", CertificateSchema);
