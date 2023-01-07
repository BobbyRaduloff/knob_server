import { db_handle_error, db_connect } from "#lib/db";
import RegionalCommittee from "#models/RegionalCommittee";

export default async function (req, res) {
  if (!req.query.city) {
    res.status(400).json({ error: "Моля изберете град!" });
    return;
  }

  try {
    await db_connect();

    const x = await RegionalCommittee.findOne({ city: req.query.city }).populate("members");
    if (!x) {
      res.status(400).json({ error: "Няма регионален комитет за този град!" });
      return;
    }

    res.status(200).json({ members: x.members });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
