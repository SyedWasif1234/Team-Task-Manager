const isProduction = process.env.NODE_ENV === "production";

export const getCookieOptions = () => {
  return {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax", 
    path: "/",
  };
};

export const clearCookieOptions = () => {
   return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax", // ✅ FIX
    path: "/",
  };
};

