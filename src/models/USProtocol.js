import mongoose from "mongoose";
import Protocol from "#parents/Protocol";

module.exports = mongoose.models.USProtocol || mongoose.model("USProtocol", Protocol);
