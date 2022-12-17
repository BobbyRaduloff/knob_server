import mongoose from "mongoose";
import CommitteeMember from "#parents/CommitteeMember";

module.exports = mongoose.models.EthicsCommitteeMember || mongoose.model("EthicsCommitteeMember", CommitteeMember);
