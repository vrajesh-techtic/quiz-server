const { ObjectId } = require("mongodb");
const { decryptToken } = require("../middleware/authMiddleware");
const { attemptSchema } = require("../models/attempt_log");
const { users } = require("../models/userDBSchema");
const { questions } = require("../models/questionDBSchema");
const { resultSchema } = require("../models/resultSchema");
const { admin } = require("../models/adminSchema");

const isAdmin = async (id) => {
  try {
    const adminId = new ObjectId(id);
    const query = await admin.findById(adminId, { _id: 0, password: 0 });

    if (await query) {
      return query;
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

const validate = async (user_id, quizCode) => {
  try {
    const isValid = await users.findOne({
      _id: new ObjectId(user_id),
      quizzes: { $in: quizCode },
    });
    if (isValid) {
      return { status: true, message: "Valid User!" };
    } else {
      return { status: false, message: "Invalid User!" };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

const calculateResult = async (user_id, quizCode) => {
  try {
    const query = await attemptSchema.aggregate([
      {
        $match: {
          user_id: new ObjectId(user_id), // Specify the user_id of the participant
          quizCode: quizCode,
        },
      },
      {
        $lookup: {
          from: "participants",
          localField: "user_id",
          foreignField: "_id",
          as: "participant",
        },
      },
      {
        $unwind: "$participant",
      },
      {
        $lookup: {
          from: "questions",
          localField: "quesId",
          foreignField: "_id",
          as: "question",
        },
      },
      {
        $unwind: "$question",
      },
      {
        $project: {
          _id: 0,
          user_id: "$participant._id",
          email: "$participant.email",
          name: "$participant.name",
          quizCode: 1,
          userAns: 1,
          correctAns: "$question.correctAns",
          attempted: { $literal: 1 }, // Indicates the question is attempted
        },
      },
      {
        $addFields: {
          isCorrect: {
            $cond: {
              if: {
                $eq: ["$userAns", "$correctAns"],
              },
              then: 1,
              else: 0,
            },
          },
        },
      },
      {
        $group: {
          _id: {
            user_id: "$user_id",
            quizCode: "$quizCode",
          },
          email: { $first: "$email" },
          name: { $first: "$name" },
          totalScore: { $sum: "$isCorrect" },
          totalAttempted: { $sum: "$attempted" },
        },
      },

      {
        $lookup: {
          from: "questions",
          localField: "_id.quizCode",
          foreignField: "quizCode",
          as: "quizQuestions",
        },
      },
      {
        $unwind: "$quizQuestions",
      },
      {
        $group: {
          _id: "$_id",
          email: { $first: "$email" },
          name: { $first: "$name" },
          totalScore: { $first: "$totalScore" },
          totalAttempted: {
            $first: "$totalAttempted",
          },
          totalQuizQuestions: { $sum: 1 }, // Count total quiz questions
        },
      },
      {
        $addFields: {
          accuracy: {
            $multiply: [
              {
                $divide: ["$totalScore", "$totalAttempted"],
              },
              100,
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          user_id: "$_id.user_id",
          email: "$email",
          name: "$name",
          quizCode: "$_id.quizCode",
          totalScore: 1,
          totalAttempted: 1,
          totalUnattempted: {
            $subtract: ["$totalQuizQuestions", "$totalAttempted"],
          },
          totalQuizQuestions: 1,
          accuracy: {
            $cond: {
              if: { $eq: ["$totalAttempted", 0] },
              then: 0,
              else: "$accuracy",
            },
          },
        },
      },
    ]);

    if (query.length !== 0) {
      return { status: true, data: query[0] };
    } else {
      const quesQuery = await questions.aggregate([
        {
          $match: {
            quizCode,
          },
        },
        {
          $count: "totalQues",
        },
      ]);

      const totalQues = quesQuery[0].totalQues;

      const userDetails = await users.findById(user_id, { _id: 0, quizzes: 0 });

      const obj = {
        totalScore: 0,
        totalAttempted: 0,
        totalQuizQuestions: totalQues,
        user_id,
        email: userDetails.email,
        name: userDetails.name,
        quizCode,
        totalUnattempted: totalQues,
        accuracy: 0,
      };

      return { status: true, data: obj };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

const isResult = async (user_id, quizCode) => {
  try {
    const query = await resultSchema.findOne({ user_id, quizCode });
    if (query.length !== 0) {
      return { status: true, data: query, message: "Quiz already attempted!" };
    } else {
      return { status: false, message: "No result found!" };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

const addResult = async (obj) => {
  try {
    const checkResult = await isResult(obj.user_id, obj.quizCode);

    if (checkResult.status) {
      return checkResult;
    } else {
      const query = await resultSchema.create(obj);

      return { status: true, data: query };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

const getResult = async (req, res) => {
  const { quizCode } = req.body;
  try {
    const user_id = decryptToken(req.body.user_id).token;

    const isValid = await validate(user_id, quizCode);

    if (isValid.status) {
      const result = await calculateResult(user_id, quizCode);
      // user_id, quizCode, totalScore, totalAttempted, totalQuizQuestions, totalUnattempted, accuracy

      res.send(await addResult(result.data));

      //   res.send(result);
    } else {
      res.send(isValid);
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

const leaderBoard = async (req, res) => {
  try {
    const { token, quizCode } = req.body;

    const id = decryptToken(token);
    if (!id.status) {
      res.send({ status: false, message: id.message });
    }

    const checkAdmin = await isAdmin(id.token);

    if (checkAdmin) {
      const query = await resultSchema.aggregate([
        {
          $match: {
            quizCode: quizCode,
          },
        },
        {
          $group: {
            _id: "$user_id",
            name: { $first: "$name" },
            totalScore: { $sum: "$totalScore" },
          },
        },
        {
          $project: {
            _id: 0,
            name: 1,
            totalScore: 1,
          },
        },
        {
          $sort: {
            totalScore: -1, // Sort by totalScore field in descending order
          },
        },
      ]);

      if (query !== null) {
        res.send({ status: true, list: query });
      } else {
        res.send({ status: false, message: "No participants yet!" });
      }
    } else {
      res.send({ status: false, message: "User does not exists!" });
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports = { getResult, leaderBoard };
