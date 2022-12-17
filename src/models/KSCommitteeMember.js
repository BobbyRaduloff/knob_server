import mongoose from "mongoose";
import CommitteeMember from "#parents/CommitteeMember";

module.exports = mongoose.models.KSCommitteeMember || mongoose.model("KSCommitteeMember", CommitteeMember);
