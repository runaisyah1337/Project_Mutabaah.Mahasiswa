const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || req.cookies && req.cookies.token;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : (req.cookies && req.cookies.token);
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = { authMiddleware };
