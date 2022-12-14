import mongoose from "mongoose";
import Protocol from "#parents/Protocol";

module.exports = mongoose.models.OSProtocol || mongoose.model("OSProtocol", Protocol);
