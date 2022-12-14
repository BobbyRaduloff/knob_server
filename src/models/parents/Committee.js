import { Schema } from "mongoose";

export default new Schema({
  members: {
    type: [Schema.Types.ObjectId],
    ref: "CommitteeMember",
  },
});
