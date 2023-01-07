import { Schema } from "mongoose";

export default new Schema({
  title: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете заглавие на съдържанието."],
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
  language: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете език на съдържанието."],
    trim: true,
    enum: ["bg", "en"],
  },
});
