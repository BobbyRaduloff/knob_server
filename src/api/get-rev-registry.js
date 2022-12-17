import { db_handle_error, db_connect } from "#lib/db";
import REV from "#models/REV";

export default async function (req, res) {
  try {
    await db_connect();

    const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
    if (req.body.cyrilic_name) {
      const s = req.body.cyrilic_name.split(" ");
      req.body.cyrilic_name = cap(s[0]) + " " + cap(s[1]) + " " + cap(s[2]);
    }
    if (req.body.latin_name) {
      const s = req.body.latin_name.split(" ");
      req.body.latin_name = cap(s[0]) + " " + cap(s[1]) + " " + cap(s[2]);
    }
    if (req.body.cyrilic_city) {
      req.body.cyrilic_city = cap(req.body.cyrilic_city);
    }
    if (req.body.latin_city) {
      req.body.latin_city = cap(req.body.latin_city);
    }

    res.status(200).json({ results: await REV.find({ ...req.body }) });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
