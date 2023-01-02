import { db_handle_error, db_connect } from "#lib/db";
import Company from "#models/Company";
import User from "#models/User";
import Certificate from "#models/Certificate";
import { CertificateType } from "#constants/certificates";
import { is_admin } from "#lib/user_checks";

export default async function (req, res) {
  try {
    await is_admin(req, res);
  } catch (e) {
    console.log(e);
    return;
  }

  if (!req.body.id || !req.body.reason_for_invalidation) {
    res.status(400).json({ error: "Непълна информация." });
    return;
  }

  if (req.body.certificate_number) {
    if (!req.body.certificate_type || CertificateType.indexOf(req.body.certificate_type) == -1) {
      res.status(400).json({ error: "Непълна информация." });
      return;
    }
  }

  try {
    await db_connect();

    const old_cert = await Certificate.findOne({ _id: req.body.id });
    if (!old_cert) {
      res.status(400).json({ error: "Невалиден номер на сертификат." });
      return;
    }

    let new_cert = null;
    if (req.body.certificate_number) {
      const number = (await Certificate.countDocuments()) + 1;

      new_cert = await Certificate.create({
        number: number,
        certificate_number: req.body.certificate_number,
        owner: old_cert.owner,
        owner_type: old_cert.owner_type,
        is_valid: true,
        certificate_type: req.body.certificate_type,
      });
      await Certificate.findOneAndUpdate(
        { _id: old_cert._id },
        {
          $set: {
            is_valid: false,
            reason_for_invalidation: req.body.reason_for_invalidation,
            new_certificate: new_cert._id,
          },
        }
      );
    } else {
      await Certificate.findOneAndUpdate(
        { _id: old_cert._id },
        {
          $set: {
            is_valid: false,
            reason_for_invalidation: req.body.reason_for_invalidation,
          },
        }
      );
    }

    if (old_cert.owner_type === "Company") {
      if (new_cert) {
        await Company.findOneAndUpdate(
          { _id: old_cert.owner },
          {
            $set: {
              current_valid_certificate: new_cert,
            },
            $push: {
              invalid_certificates: old_cert._id,
            },
          }
        );
      } else {
        await Company.findOneAndUpdate(
          { _id: old_cert.owner },
          {
            $unset: {
              current_valid_certificate: "",
            },
            $push: {
              invalid_certificates: old_cert._id,
            },
          }
        );
      }
    } else {
      if (new_cert) {
        await User.findOneAndUpdate(
          { _id: old_cert.owner },
          {
            $set: {
              current_valid_certificate: new_cert,
            },
            $push: {
              invalid_certificates: old_cert._id,
            },
          }
        );
      } else {
        await User.findOneAndUpdate(
          { _id: old_cert.owner },
          {
            $unset: {
              current_valid_certificate: "",
            },
            $push: {
              invalid_certificates: old_cert._id,
            },
          }
        );
      }
    }

    res.status(200).json({});
  } catch (e) {
    console.log(e);
    if (db_handle_error(e, res)) return;
  }
}
