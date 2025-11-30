export function emailFormatter(req, _, next) {
  if (req.body && typeof req.body.email === "string") {
    console.log(req.body)
    req.body.email = req.body.email.toLowerCase().trim();
  }
  next();
}
