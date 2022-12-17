import mongoose from "mongoose";
import CommitteeMember from "#parents/CommitteeMember";

module.exports = mongoose.models.USCommitteeMember || mongoose.model("USCommitteeMember", CommitteeMember);
