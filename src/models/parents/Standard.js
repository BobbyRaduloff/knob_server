import { Schema } from "mongoose";

export default new Schema({
  members: {
    type: [Schema.Types.ObjectId],
    ref: "File",
  },
  last_changed: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});
