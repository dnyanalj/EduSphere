const prisma = require('../prisma.js');

async function getScheduledTests(req, res) {
  const tests = await prisma.test.findMany({ where: {}, select: { id: true, title: true, scheduledAt: true } });
  res.json({ tests });
}

async function startAttempt(req, res) {
  if (req.user.role !== 'CANDIDATE') return res.status(403).json({ error: 'Forbidden' });
  const { testId } = req.body;
  // if condition: already attempted
  const existingAttempt = await prisma.attempt.findFirst({
    where: { candidateId: req.user.userId, testId },
  });
  // for now only
  if (existingAttempt)
    return res.status(400).json({ error: 'Already attempted' });
  console.log('Starting attempt for user')
  // new attempt create
  const attempt = await prisma.attempt.create({ data: { candidateId: req.user.userId, testId } });
  res.json({ attemptId: attempt.id });
}

async function saveAnswer(req, res) {
  const { attemptId } = req.params;
  const { questionId, optionId } = req.body;
  // save answer logic
  const existing = await prisma.answer.findFirst({ where: { attemptId: Number(attemptId), questionId } });
  
  if (existing) {
    await prisma.answer.update({ where: { id: existing.id }, data: { optionId } });
  } else {
    await prisma.answer.create({ data: { attemptId: Number(attemptId), questionId, optionId } });
  }
  res.json({ ok: true });
}

async function finishAttempt(req, res) {
  const { attemptId } = req.params;
  const attempt = await prisma.attempt.findUnique({ where: { id: Number(attemptId) }, include: { test: { include: { questions: { include: { options: true } } } }, answers: true }});
  if (!attempt) return res.status(404).json({ error: 'Not found' });

  let score = 0;
  for (const q of attempt.test.questions) {
    const ans = attempt.answers.find(a => a.questionId === q.id);
    if (ans && ans.optionId && q.answerId && ans.optionId === q.answerId) score++;
  }

  await prisma.attempt.update({ where: { id: attempt.id }, data: { score, finishedAt: new Date() } });
  res.json({ score, total: attempt.test.questions.length });
}


async function getAttemptQuestions(req, res) {
  try {
    const { attemptId } = req.params;

    // 1️⃣ Find attempt and include test + questions + options
    const attempt = await prisma.attempt.findUnique({
      where: { id: Number(attemptId) },
      include: {
        test: {
          include: {
            questions: {
              include: {
                options: true, // so frontend can display multiple choices
              },
            },
          },
        },
      },
    });

    // 2️⃣ Handle invalid attempt ID
    if (!attempt) return res.status(404).json({ error: 'Attempt not found' });

    // 3️⃣ Verify that the attempt belongs to the logged-in user (optional security)
    if (req.user.role !== 'CANDIDATE' || req.user.userId !== attempt.candidateId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // 4️⃣ Return the questions
    res.json({
      questions: attempt.test.questions.map(q => ({
        id: q.id,
        text: q.text,
        options: q.options.map(o => ({ id: o.id, text: o.text })),
      })),
    });
  } catch (error) {
    console.error('❌ Error in getAttemptQuestions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getAttemptQuestions, getScheduledTests, startAttempt, saveAnswer, finishAttempt };
