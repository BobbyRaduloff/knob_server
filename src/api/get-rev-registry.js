import { db_handle_error, db_connect } from "#lib/db";
import REV from "#models/REV";

export default async function (req, res) {
  try {
    await db_connect();

    if (req.query) {
      const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
      try {
        if (req.query.cyrilic_name) {
          const s = req.query.cyrilic_name.split(" ");
          console.log(s);
          req.query.cyrilic_name = cap(s[0]) + " " + cap(s[1]) + " " + cap(s[2]);
        }
        if (req.query.latin_name) {
          const s = req.query.latin_name.split(" ");
          req.query.latin_name = cap(s[0]) + " " + cap(s[1]) + " " + cap(s[2]);
        }
        if (req.query.cyrilic_city) {
          req.query.cyrilic_city = cap(req.query.cyrilic_city);
        }
        if (req.query.latin_city) {
          req.query.latin_city = cap(req.query.latin_city);
        }
      } catch {
        res.status(400).json({ results: "Грешни данни!" });
        return;
      }
    }

    res.status(200).json({ results: await REV.find({ ...req.query }) });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
