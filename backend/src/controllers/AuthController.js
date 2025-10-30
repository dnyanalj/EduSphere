const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function signup(req, res) {
  try {
    const { name, username, password, role } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: 'Missing fields' });

    const hashed = await bcrypt.hash(password, 10);
    console.log(10);

    const user = await prisma.user.create({
      data: { name, username, password: hashed, role: role || 'CANDIDATE' },
    });
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send token as cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in prod
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: 'Signup successful',
      user: { id: user.id, username: user.username, role: user.role },
    });

  } catch (err) {
    if (err.code === 'P2002')
      return res.status(400).json({ error: 'Username taken' });
    res.status(500).json({ error: 'Server error', details: err.message });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, role: user.role },
    });

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Logout endpoint (to clear cookie)
async function logout(req, res) {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
}

module.exports = { signup, login, logout };
