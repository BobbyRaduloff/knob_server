import { db_handle_error, db_connect } from "#lib/db";
import CourseItem from "#models/CourseItem";

export default async function (req, res) {
  try {
    await db_connect();

    res.status(200).json({ results: await CourseItem.find() });
  } catch (e) {
    if (db_handle_error(e, res)) return;
  }
}
