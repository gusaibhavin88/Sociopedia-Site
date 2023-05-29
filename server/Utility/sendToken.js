export const sendToken = async (resp, statuscode, user, message) => {
  try {
    const token = user.getJWTtoken();
    const options = {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.JWT_EXPIRE_COOKIE * 60 * 60 * 1000
      ),
    };
    const { password, ...otherdetails } = user._doc;
    resp
      .status(statuscode)
      .cookie("token", token, options)
      .json({
        success: true,
        message: message,
        user: otherdetails,
        token: { token: token },
      });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};
