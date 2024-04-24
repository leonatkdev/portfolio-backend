const jwt = require("jsonwebtoken");
const jwtSecret =
  "7a20f602a73fd7e92f3ce9ed196ff68c57f6903d3e9c06f131f5c0a03c12fb86dd2fa1";


exports.adminAuth = (req, res, next) => {
  // console.log('req', req)
  // console.log(' req.cookie',  req.cookies.jwt)
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({
            message: "Not authorized",
          });
        } else {
          if (decodedToken.role !== "admin") {
            return res.status(401).json({ message: "Not authorized" });
          } else {
            next();
          }
        }
      });
    } else {
      return res.status(401).json({
        message: "Not authorized, token not available",
      });
    }
  };
  
  exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({
            message: "Not Authorized",
          });
        } else {
          if (decodedToken.role !== "Basic") {
            return res.status(401).json({ message: "Not Authorized" });
          } else {
            next();
          }
        }
      });
    } else {
      return res.status(401).json({
        message: "Not authorized, token not available",
      });
    }
  };
    