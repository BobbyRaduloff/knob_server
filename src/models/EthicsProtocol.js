import mongoose from "mongoose";
import Protocol from "#parents/Protocol";

module.exports = mongoose.models.EthicsProtocol || mongoose.model("EthicsProtocol", Protocol);
