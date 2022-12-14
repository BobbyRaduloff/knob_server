import mongoose, { Schema } from "mongoose";
import mime from "mime-types";

const FileSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: [true, "Please provide a name for the file."],
    trim: true,
  },
  path: {
    type: Schema.Types.String,
    required: [true, "Please provide a path for the file."],
    trim: true,
    unique: true,
  },
  timestamp: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  mimetype: {
    type: Schema.Types.String,
    enum: Object.keys(mime.extensions),
    required: [true, "Please provide a mimetype for the file."],
    trim: true,
  },
});

module.exports = mongoose.models.File || mongoose.model("File", FileSchema);
