require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const examinerRoutes = require('./routes/examiner');
const candidateRoutes = require('./routes/candidate');
const { authMiddleware } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/examiner', authMiddleware, examinerRoutes); // further check role inside routes
app.use('/api/candidate', authMiddleware, candidateRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on ${port}`));
