import { db_handle_error, db_connect } from "#lib/db";
import User from "#models/User";

export default async function (req, res) {
  try {
    await db_connect();

    if (req.query.name || req.query.city || req.query.certificate_number) {
      let r = await User.find().populate("invalid_certificates").populate("current_valid_certificate");
      r.forEach((x) => (x.password_hash = undefined));

      if (req.query.name) {
        r = r.filter((x) => {
          const full_name = `${x.first_name} ${x.middle_name} ${x.last_name}`;
          return full_name.includes(req.query.name);
        });
      }

      if (req.query.city) {
        r = r.filter((x) => x.city == req.query.city);
      }

      if (req.query.certificate_number) {
        r = r.filter((x) => {
          if (!x.current_valid_certificate) return false;
          return x.current_valid_certificate.certificate_number === req.query.certificate_number;
        });
      }

      res.status(200).json({ results: r });
    } else {
      let r = await User.find().populate("invalid_certificates").populate("current_valid_certificate");
      r.forEach((x) => (x.password_hash = undefined));

      res.status(200).json({ results: r });
    }
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
