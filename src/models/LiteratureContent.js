import mongoose from "mongoose";
import Content from "#parents/Content";

module.exports = mongoose.models.LiteratureContent || mongoose.model("LiteratureContent", Content);
