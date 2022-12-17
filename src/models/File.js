import mongoose, { Schema } from "mongoose";
import mime from "mime-types";

const FileSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете име на файла."],
    trim: true,
  },
  path: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете път до файла."],
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
    required: [true, "Моля предоставете MIME тип на файла."],
    trim: true,
  },
});

module.exports = mongoose.models.File || mongoose.model("File", FileSchema);
