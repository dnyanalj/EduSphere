const prisma = require('../prisma.js');

async function getScheduledTests(req, res) {
  const tests = await prisma.test.findMany({ where: {}, select: { id: true, title: true, scheduledAt: true } });
  res.json({ tests });
}

async function startAttempt(req, res) {
  if (req.user.role !== 'CANDIDATE') return res.status(403).json({ error: 'Forbidden' });
  const { testId } = req.body;
  const existingAttempt = await prisma.attempt.findFirst({
  where: { candidateId: req.user.userId, testId },
});
if (existingAttempt)
  return res.status(400).json({ error: 'Already attempted' });

  const attempt = await prisma.attempt.create({ data: { candidateId: req.user.userId, testId } });
  res.json({ attemptId: attempt.id });
}

async function saveAnswer(req, res) {
  const { attemptId } = req.params;
  const { questionId, optionId } = req.body;
  // upsert: if answer exists update else create
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

module.exports = { getScheduledTests, startAttempt, saveAnswer, finishAttempt };
