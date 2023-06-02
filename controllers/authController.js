import User from "../models/User.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please provide all values" });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(200).json({ user, token });
};

export { login };
