import jwt from "jsonwebtoken";

const tokenSign = async (user) => {
  const userForToken = {
    name: user.name,
    username: user.username,
    email: user.email,
    id: user._id,
  };

  const sign = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 24,
  });

  return sign;
};

const tokenVerify = async (token, next) => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    next(error);
  }
};

export { tokenSign, tokenVerify };
