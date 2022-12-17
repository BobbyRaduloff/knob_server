import mongoose, { Schema } from "mongoose";
import { BulgarianCitiesCyrillic } from "#constants/cities";

const RegionalCommitteeSchema = new Schema({
  city: {
    type: Schema.Types.String,
    required: [true, "Моля предоставете град на регионален комитет."],
    enum: BulgarianCitiesCyrillic,
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: "CommitteeMember",
  },
});

module.exports = mongoose.models.RegionalCommittee || mongoose.model("RegionalCommittee", RegionalCommitteeSchema);
