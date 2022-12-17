import mongoose from "mongoose";
import CommitteeMember from "#parents/CommitteeMember";

module.exports = mongoose.models.RegionalCommitteeMember || mongoose.model("RegionalCommitteeMember", CommitteeMember);
