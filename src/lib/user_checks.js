import { validate_token } from "#lib/token";
import { db_connect } from "#lib/db";
import User from "#models/User";

export async function is_logged_in(req, res) {
  const auth_header = req.headers.authorization;
  const token = auth_header && auth_header.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Забранен достъп!" });
    throw new Error("No token provided!");
  }

  let email;
  try {
    email = validate_token(token);
  } catch {
    res.status(401).json({ error: "Забранен достъп!" });
    throw new Error("Invalid token!");
  }

  let user;
  try {
    await db_connect();

    user = await User.findOne({ email });
  } catch {
    res.status(500).json({ error: "Вътрешна грешка!" });
    throw new Error("Failed to connect to database!");
  }

  if (!user) {
    res.status(401).json({ error: "Забранен достъп!" });
    throw new Error("Invalid token!");
  }

  return email;
}

export async function is_curator(req, res) {
  const email = await is_logged_in(req, res);

  let user;
  try {
    await db_connect();

    user = await User.findOne({ email });
  } catch {
    res.status(500).json({ error: "Вътрешна грешка!" });
    throw new Error("Failed to connect to database!");
  }

  if (!user || (user.type !== "Curator" && user.type !== "Admin")) {
    res.status(403).json({ error: "Забранен достъп!" });
    throw new Error("User is not a curator!");
  }
}

export async function is_admin(req, res) {
  const email = await is_logged_in(req, res);

  let user;
  try {
    await db_connect();

    user = await User.findOne({ email });
  } catch {
    res.status(500).json({ error: "Вътрешна грешка!" });
    throw new Error("Failed to connect to database!");
  }

  if (!user || user.type !== "Admin") {
    res.status(403).json({ error: "Забранен достъп!" });
    throw new Error("User is not a curator!");
  }
}
