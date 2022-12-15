import { Schema } from "mongoose";

export default new Schema({
  title: {
    type: Schema.Types.String,
    required: [true, "Please provide a title for the standard."],
    trim: true,
  },
  files: {
    type: [Schema.Types.ObjectId],
    ref: "File",
  },
  last_changed: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});
