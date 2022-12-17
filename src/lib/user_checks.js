import { validate_token } from "#lib/token";
import { db_connect } from "#lib/db";
import User from "#models/User";

export async function is_logged_in(req, res) {
  const auth_header = req.headers.authorization;
  const token = auth_header && auth_header.split(" ")[1];

  if (token === null) {
    res.status(401).json({ error: "Забранен достъп!" });
    throw new Error("No token provided!");
  }

  try {
    const email = validate_token(token);
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ error: "Забранен достъп!" });
      throw new Error("Invalid token!");
    }

    return email;
  } catch {
    res.status(401).json({ error: "Забранен достъп!" });
    throw new Error("Invalid token!");
  }
}

export async function is_curator(req, res) {
  const email = is_logged_in(req, res);

  try {
    await db_connect();

    const user = await User.findOne({ email });
    if (!user || user.type !== "Curator") {
      res.status(403).json({ error: "Забранен достъп!" });
      throw new Error("User is not a curator!");
    }
  } catch {
    res.status(500).json({ error: "Вътрешна грешка!" });
    throw new Error("Failed to connect to database!");
  }
}

export async function is_admin(req, res) {
  const email = is_logged_in(req, res);

  try {
    await db_connect();

    const user = await User.findOne({ email });
    if (!user || user.type !== "Admin") {
      res.status(403).json({ error: "Забранен достъп!" });
      throw new Error("User is not a curator!");
    }
  } catch {
    res.status(500).json({ error: "Вътрешна грешка!" });
    throw new Error("Failed to connect to database!");
  }
}
