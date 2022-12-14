import { Schema } from "mongoose";

export default new Schema({
  title: {
    type: Schema.Types.String,
    required: [true, "Please provide a title for the content."],
    trim: true,
  },
  picture: {
    type: Schema.Types.ObjectId,
    ref: "File",
  },
  timestamp: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  file: {
    type: Schema.Types.ObjectId,
    ref: "File",
  },
  description: {
    type: Schema.Types.String,
    trim: true,
  },
});
