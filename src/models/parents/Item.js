import { Schema } from "mongoose";

export default new Schema({
  title: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете заглавие на съдържанието."],
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
