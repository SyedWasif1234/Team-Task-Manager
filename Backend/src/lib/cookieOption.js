const isProduction = process.env.NODE_ENV === "production";

export const getCookieOptions = () => {
  return {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (matches JWT expiry)
    secure: isProduction,
    sameSite: isProduction ? "lax" : "lax",
    domain: isProduction ? ".drafti.me" : undefined,
    path: "/",
  };
};

export const clearCookieOptions = () => {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "lax" : "lax",
    domain: isProduction ? ".drafti.me" : undefined,
    path: "/",
  };
};

