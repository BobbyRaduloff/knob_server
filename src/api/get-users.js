import { db_handle_error, db_connect } from "#lib/db";
import User from "#models/User";

export default async function (req, res) {
  try {
    await db_connect();

    if (req.body.name || req.body.city || req.body.certificate_number) {
      let r = await User.find().populate("invalid_certificates").populate("current_valid_certificate");
      r.forEach((x) => (x.password_hash = undefined));

      if (req.body.name) {
        r = r.filter((x) => {
          const full_name = `${x.first_name} ${x.middle_name} ${x.last_name}`;
          return full_name.includes(req.body.name);
        });
      }

      if (req.body.city) {
        r = r.filter((x) => x.city == req.body.city);
      }

      if (req.body.certificate_number) {
        r = r.filter((x) => {
          if (!x.current_valid_certificate) return false;
          return x.current_valid_certificate.certificate_number === req.body.certificate_number;
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

// export default async function (req, res) {
//   try {
//     await db_connect();

//     if (req.body.name || req.body.city || req.body.certificate_number) {

//       let result = await Company.find(query)
//         .populate("capacity")
//         .populate("valuers")
//         .populate("current_valid_certificate");

//       if (req.body.certificate_number) {
//         result = result.filter((x) => x.current_valid_certificate.certificate_number === req.body.certificate_number);
//       }

//       res.status(200).json({ results: result });
//     } else {
//       res.status(200).json({
//         results: await Company.find().populate("capacity").populate("valuers").populate("current_valid_certificate"),
//       });
//     }
//   } catch (e) {
//     if (db_handle_error(e, res)) return;
//   }
// }
