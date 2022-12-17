import is_dev from "#lib/is_dev";
import User from "#models/User";
import { db_connect, db_handle_error } from "#lib/db";
import * as bcrypt from "bcryptjs";

export default async function (req, res) {
  try {
    is_dev(res);
  } catch (error) {
    console.log(error.message);
    return;
  }

  try {
    await db_connect();
    const number = (await User.countDocuments({})) + 1;
    const {
      first_name,
      middle_name,
      last_name,
      capacity,
      is_knob_member,
      current_valid_certificate,
      address,
      mobile_phone,
      landline,
      specialty,
      experience,
      education,
      city,
      email,
      password,
    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);

    await User.create({
      number,
      type: "Admin",
      first_name,
      middle_name,
      last_name,
      capacity,
      is_knob_member,
      current_valid_certificate,
      address,
      mobile_phone,
      landline,
      specialty,
      experience,
      education,
      city,
      email,
      password_hash,
    });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }

  res.status(200).json({});
}
