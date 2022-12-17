export default function is_dev(res) {
  if (process.env.IS_DEV !== "TRUE") {
    res.status(403).json({ error: "Forbidden!" });
    throw new Error("Server not in development mode!");
  }
}
