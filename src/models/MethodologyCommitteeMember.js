import mongoose from "mongoose";
import CommitteeMember from "#parents/CommitteeMember";

module.exports =
  mongoose.models.MethodologyCommitteeMember || mongoose.model("MethodologyCommitteeMember", CommitteeMember);
