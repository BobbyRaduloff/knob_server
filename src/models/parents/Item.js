import { Schema } from "mongoose";

export default new Schema({
  title: {
    type: Schema.Types.String,
    required: [true, "Please provide a title for the item."],
    trim: true,
  },
  timestamp: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  picture: {
    type: Schema.Types.ObjectId,
    ref: "File",
  },
  file: {
    type: Schema.Types.ObjectId,
    ref: "File",
  },
  description: {
    type: Schema.Types.String,
    trim: true,
  },
  files: {
    type: [Schema.Types.ObjectId],
    ref: "File",
  },
});
