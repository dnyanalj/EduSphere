const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// signup new user la
async function signup(req, res) {

  try {
    const { name, username, password, role } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { name, username, password: hashed, role: role || 'CANDIDATE' },
        select: { id: true, username: true, role: true }
    });

    res.json({ user });
  } catch (err) {
    if (err.code === 'P2002') return res.status(400).json({ error: 'Username taken' });
    res.status(500).json({ error: 'Server error', details: err.message });
  }
}

//just check karto apan ki user exist or not if yes create one jwt token and retuen it 
async function login(req, res) {
  try {

    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { signup, login };
