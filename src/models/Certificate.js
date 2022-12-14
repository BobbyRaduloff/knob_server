import mongoose, { Schema } from "mongoose";
import { CertificateType } from "#constants/certificates";

const CertificateSchema = new Schema({
  number: {
    type: Schema.Types.Number,
    required: [true, "Please provide a number."],
    unique: true,
    min: 1,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "owner_type",
  },
  owner_type: {
    type: Schema.Types.String,
    required: true,
    enum: ["User", "Company"],
  },
  certificate_number: {
    type: Schema.Types.String,
    required: [true, "Please provide a certificate number."],
    trim: true,
    unique: true,
  },
  is_valid: {
    type: Schema.Types.Boolean,
    required: true,
  },
  reason_for_invalidation: {
    type: Schema.Types.String,
    trim: true,
  },
  certificate_type: {
    type: Schema.Types.String,
    required: true,
    enum: CertificateType,
  },
  new_certificate: {
    type: Schema.Types.ObjectId,
    ref: "Certificate",
  },
});

module.exports = mongoose.models.Certificate || mongoose.model("Certificate", CertificateSchema);
