import mongoose, { Schema } from "mongoose";

const RegionalCommitteeSchema = new Schema({
  city: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете град на регионален комитет."],
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: "RegionalCommitteeMember",
  },
});

module.exports = mongoose.models.RegionalCommittee || mongoose.model("RegionalCommittee", RegionalCommitteeSchema);
