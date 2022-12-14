import mongoose from "mongoose";
import Content from "#parents/Content";

module.exports = mongoose.models.PublicationContent || mongoose.model("PublicationContent", Content);
