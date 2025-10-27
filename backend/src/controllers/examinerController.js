const prisma = require('../prisma');

async function createTest(req, res) {
  try {
    if (req.user.role !== 'EXAMINER') return res.status(403).json({ error: 'Forbidden' });
    const { title, scheduledAt, questions } = req.body;
    // create test
    const test = await prisma.test.create({
      data: {
        title,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        examiner: { connect: { id: req.user.userId } },
        questions: {
          create: questions.map(q => ({
            text: q.text,
            options: { create: q.options.map(o => ({ text: o })) },
            // answerId set later after options are created — we'll set via a transaction
          }))
        }
      },
      include: { questions: { include: { options: true } } }
    });

    // If questions include answerIndex, update answerId
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (typeof q.answerIndex === 'number') {
        const option = test.questions[i].options[q.answerIndex];
        if (option) {
          await prisma.question.update({ where: { id: test.questions[i].id }, data: { answerId: option.id } });
        }
      }
    }

    res.json({ test });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function listTests(req, res) {
  const tests = await prisma.test.findMany({ where: { examinerId: req.user.userId }, include: { questions: true } });
  res.json({ tests });
}

module.exports = { createTest, listTests };
