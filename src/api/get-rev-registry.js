import { db_handle_error, db_connect } from "#lib/db";
import REV from "#models/REV";

export default async function (req, res) {
  try {
    await db_connect();

    if (req.query) {
      if (req.query.cyrilic_name === "") {
        delete req.query.cyrilic_name;
      }
      if (req.query.latin_name === "") {
        delete req.query.latin_name;
      }
      if (req.query.cyrilic_city === "") {
        delete req.query.cyrilic_city;
      }
      if (req.query.latin_city === "") {
        delete req.query.latin_city;
      }
      if (req.query.certificate_number === "") {
        delete req.query.certificate_number;
      }
      try {
        if (req.query.cyrilic_name) {
          req.query.cyrilic_name = { $regex: req.query.cyrilic_name, $options: "i" };
        }
        if (req.query.latin_name) {
          req.query.latin_name = { $regex: req.query.latin_name, $options: "i" };
        }
        if (req.query.cyrilic_city) {
          req.query.cyrilic_city = { $regex: req.query.cyrilic_city, $options: "i" };
        }
        if (req.query.latin_city) {
          req.query.latin_city = { $regex: req.query.latin_city, $options: "i" };
        }
        if (req.query.certificate_number) {
          req.query.certificate_number = { $regex: req.query.certificate_number, $options: "i" };
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
