import mongoose from "mongoose";
import Protocol from "#parents/Protocol";

module.exports = mongoose.models.KSProtocol || mongoose.model("KSProtocol", Protocol);
