import { db_handle_error, db_connect } from "#lib/db";
import EuropeanStandard from "#models/EuropeanStandard";
import File from "#models/File";
import { is_curator } from "#lib/user_checks";
import { v4 as uuidv4 } from "uuid";
import { unlinkSync, copyFileSync } from "fs";

export default async function (req, res) {
  try {
    await is_curator(req, res);
  } catch (e) {
    console.log(e);
    return;
  }

  if (!req.body.title || !req.files || !req.body.language) {
    res.status(400).json({ error: "Непълна информация." });
    return;
  }

  if (req.body.language !== "en" && req.body.language !== "bg") {
    res.status(400).json({ error: "Невалиден език." });
    return;
  }

  const files = [];
  for (let i = 0; i < req.files.length; i++) {
    //check if file type is pdf, docx, or pptx
    if (
      req.files[i].mimetype != "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
      req.files[i].mimetype != "application/pdf" &&
      req.files[i].mimetype != "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      res.status(400).json({ error: "Incorrect file type" });
      return;
    }

    const file_id = uuidv4();
    const file_new_path = "uploads/" + file_id + "." + req.files[i].originalname.split(".").pop();
    copyFileSync(req.files[i].path, file_new_path);
    unlinkSync(req.files[i].path);

    try {
      await db_connect();

      const f = await File.create({
        name: req.files[i].originalname,
        path: file_new_path,
        mimetype: req.files[i].mimetype,
      });
      files.push(f._id);
    } catch (e) {
      console.log(e);
      if (db_handle_error(e, res)) return;
    }
  }

  try {
    await EuropeanStandard.create({
      title: req.body.title,
      files,
      language: req.body.language,
    });

    res.status(200).json({});
  } catch (e) {
    console.log(e);
    if (db_handle_error(e, res)) return;
  }
}
