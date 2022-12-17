import { db_handle_error, db_connect } from "#lib/db";
import KSCommitteeMember from "#models/KSCommitteeMember";

export default async function (req, res) {
  try {
    await db_connect();

    res.status(200).json({ results: await KSCommitteeMember.find() });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
