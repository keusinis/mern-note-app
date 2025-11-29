import User from "../models/User.js"

// login user
export async function loginUser(req, res) {
  res.json({ msg: "login user" });
}
// signup user
export async function signupUser(req, res) {
  res.json({ msg: "signup user" });
}
