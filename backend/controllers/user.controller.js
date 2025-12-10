const User = require('../models/user.model');

async function me(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Get profile error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function listUsers(req, res) {
  try {
    const users = await User.find().select('-password').limit(100);
    res.json(users);
  } catch (err) {
    console.error('List users error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { me, listUsers };
