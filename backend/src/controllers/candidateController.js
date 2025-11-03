const prisma = require("../prisma.js");

async function getScheduledTests(req, res) {
  try {
    const tests = await prisma.test.findMany({
      include: {
        attempts: {
          where: { candidateId: req.user.userId },
          select: {
            id: true,
            status: true,
            score: true,
          },
        },
      },
    });

    // Map tests so each test includes one attempt (if any)
    const formatted = tests.map((t) => ({
      id: t.id,
      title: t.title,
      scheduledAt: t.scheduledAt,
      attempt: t.attempts[0] || null, // if user attempted it, attach attempt info
    }));

    res.json({ tests: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch scheduled tests" });
  }
}

async function startAttempt(req, res) {
  if (req.user.role !== "CANDIDATE")
    return res.status(403).json({ error: "Forbidden" });
  const { testId } = req.body;
  // if condition: already attempted
  const existingAttempt = await prisma.attempt.findFirst({
    where: { candidateId: req.user.userId, testId },
  });
  // for now only
  if (existingAttempt)
    return res.status(400).json({ error: "Already attempted" });
  console.log("Starting attempt for user");
  // new attempt create
  const attempt = await prisma.attempt.create({
    data: { candidateId: req.user.userId, testId },
  });
  res.json({ attemptId: attempt.id });
}

async function saveAnswer(req, res) {
  console.log("Saving answer called");
  const { attemptId } = req.params;
  const { questionId, optionId } = req.body;
  // save answer logic
  const existing = await prisma.answer.findFirst({
    where: { attemptId: Number(attemptId), questionId },
  });

  if (existing) {
    await prisma.answer.update({
      where: { id: existing.id },
      data: { optionId },
    });

  } else {
    await prisma.answer.create({
      data: { attemptId: Number(attemptId), questionId, optionId },
    });
  }
  res.json({ ok: true });
}

async function finishAttempt(req, res) {
  console.log("Finishing attempt called");
  const { attemptId } = req.params;
  const answersFromClient = req.body.answers; 

// find attempt to update which we have created in start attempt.
  const attempt = await prisma.attempt.findUnique({
    where: { id: Number(attemptId) },
    include: {
      test: { include: { questions: { include: { options: true } } } },
      answers: true,
    },
  });
  // 

  if (!attempt) return res.status(404).json({ error: "Not found" });

  // save all answers in db
  // Step 2️⃣ - Save or update answers in DB
  for (const [questionId, selectedOption] of Object.entries(answersFromClient)) {
    const optionId =
      typeof selectedOption === "object" ? selectedOption.id : selectedOption;

    const existing = await prisma.answer.findFirst({
      where: { attemptId: Number(attemptId), questionId: Number(questionId) },
    });

    if (existing) {
      await prisma.answer.update({
        where: { id: existing.id },
        data: { optionId },
      });
    } else {
      await prisma.answer.create({
        data: { attemptId: Number(attemptId), questionId: Number(questionId), optionId },
      });
    }
  }
  // fetch updated attempt which will include answers now 
  // Step 3️⃣ - Fetch updated attempt (with latest answers)
  const updatedAttempt = await prisma.attempt.findUnique({
    where: { id: Number(attemptId) },
    include: {
      test: { include: { questions: true } },
      answers: true,
    },
  });
  // 
  // Step 4️⃣ - Calculate score
  let score = 0;
  for (const q of updatedAttempt.test.questions) {
    const ans = updatedAttempt.answers.find((a) => a.questionId === q.id);
    if (ans && ans.optionId && q.answerId && ans.optionId === q.answerId) score++;
  }

  // Step 5️⃣ - Update status + score
  await prisma.attempt.update({
    where: { id: updatedAttempt.id },
    data: { score, finishedAt: new Date(), status: "FINISHED" },
  });

  res.json({
    message: "✅ Attempt finished successfully",
    score,
    total: updatedAttempt.test.questions.length,
  });

}

async function getAttemptQuestions(req, res) {
  console.log("Fetching attempt questions called");
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
    if (!attempt) return res.status(404).json({ error: "Attempt not found" });

    // 3️⃣ Verify that the attempt belongs to the logged-in user (optional security)
    if (
      req.user.role !== "CANDIDATE" ||
      req.user.userId !== attempt.candidateId
    ) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // 4️⃣ Return the questions
    res.json({
      questions: attempt.test.questions.map((q) => ({
        id: q.id,
        text: q.text,
        options: q.options.map((o) => ({ id: o.id, text: o.text })),
      })),
    });
  } catch (error) {
    console.error("❌ Error in getAttemptQuestions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
//
async function getResult(req, res) {
  console.log("Fetching result called");
  const { attemptId } = req.params;

  try {
    const attempt = await prisma.attempt.findUnique({
      where: { id: parseInt(attemptId) },
      include: {
        test: {
          include: {
            questions: {
              include: { options: true },
            },
          },
        },
        answers: true,
      },
    });

    if (!attempt) return res.status(404).json({ error: "Attempt not found" });

    const resultData = attempt.test.questions.map((q) => {
      const userAns = attempt.answers.find((a) => a.questionId === q.id);

      const correctOpt = q.options.find((o) => o.id === q.answerId);
      const userOpt = userAns
        ? q.options.find((o) => o.id === userAns.optionId)
        : null;

        console.log("correctoption",correctOpt)
      return {
        question: q.text,
        correctOption: correctOpt ? correctOpt.text : "N/A",
        userOption: userOpt ? userOpt.text : "Not answered",
        isCorrect: userOpt && correctOpt && userOpt.id === correctOpt.id,
      };
    });

    res.json({
      score: attempt.score,
      total: attempt.test.questions.length,
      details: resultData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch result" });
  }
}


module.exports = {
  getAttemptQuestions,
  getScheduledTests,
  startAttempt,
  saveAnswer,
  finishAttempt,
  getResult,
};
