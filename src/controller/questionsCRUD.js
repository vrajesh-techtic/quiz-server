const { admin } = require("../models/adminSchema");
const { questions } = require("../models/questionDBSchema");
const { ObjectId } = require("mongodb");
const { decryptToken } = require("../middleware/authMiddleware");
const { quizzes } = require("../models/quizDBSchema");

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

const isQuiz = async (quizCode) => {
  try {
    const query = await quizzes.findOne({ quizCode });

    if (query !== null) {
      return { status: true, message: "Quiz Exists!" };
    } else {
      return { status: false, message: "Quiz not found!" };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

/*

Required Parameters:

1. quizCode 
2. ques
3. options []
4. correctAns

*/

// function to add new question
const addQuestion = async (req, res) => {
  const token = req.body.token;
  const quesData = req.body.data;
  const id = decryptToken(token);
  if (!id.status) {
    res.send({ status: false, message: id.message });
  }
  const checkAdmin = await isAdmin(id.token);

  if (checkAdmin) {
    try {
      const query = await questions.create(quesData);

      if (query) {
        res.send({ status: true, message: "Question added !" });
      } else {
        res.send({ status: false, message: "Question not added !" });
      }
    } catch (error) {
      res.send({ status: false, message: error.message });
    }
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

// function to fetch particular question from database
const getSpecificQuestion = async (req, res) => {
  const token = req.body.token;
  const quesId = req.body.quesId;
  const id = decryptToken(token);
  if (!id.status) {
    res.send({ status: false, message: id.message });
  }
  const checkAdmin = await isAdmin(id.token);

  if (checkAdmin) {
    try {
      const query = await questions.findById(new ObjectId(quesId), {
        _id: 0,
        quizCode: 0,
        correctAns: 0,
      });

      if (query) {
        res.send({ status: true, message: "Question found !", data: query });
      } else {
        res.send({ status: false, message: "Question not found !" });
      }
    } catch (error) {
      res.send({ status: false, message: "Question not found !" });
    }
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

const updateQuestion = async (req, res) => {
  const token = req.body.token;
  const { quesId, quizCode, ques, options, correctAns } = req.body.data;
  const id = decryptToken(token);
  if (!id.status) {
    res.send({ status: false, message: id.message });
  }
  const checkAdmin = await isAdmin(id.token);

  if (checkAdmin) {
    try {
      const query = await questions.findByIdAndUpdate(quesId, {
        quizCode: quizCode,
        ques: ques,
        options: options,
        correctAns: correctAns,
      });

      if (query) {
        res.send({ status: true, message: "Question updated successfully" });
      } else {
        res.send({ status: false, message: "Question not found!" });
      }
    } catch (error) {
      res.send({ status: false, message: "Question not found!" });
    }
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

// To get total questions of a particular Quiz
const totalQuestions = async (req, res) => {
  const token = req.body.token;
  const quizCode = req.body.quizCode;
  const id = decryptToken(token);
  if (!id.status) {
    res.send({ status: false, message: id.message });
  }
  const checkAdmin = await isAdmin(id.token);

  if (checkAdmin) {
    try {
      const query = await questions.aggregate([
        {
          $match: {
            quizCode,
          },
        },
        {
          $count: "totalQues",
        },
      ]);

      res.send({ status: true, data: query });
    } catch (error) {
      console.log(error.message);
      res.send({ status: false, message: error.message });
    }
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

// function to delete particular question
const deleteQuestion = async (req, res) => {
  const token = req.body.token;
  const quesId = req.body.quesId;
  const id = decryptToken(token);
  if (!id.status) {
    res.send({ status: false, message: id.message });
  }
  const checkAdmin = await isAdmin(id.token);

  if (checkAdmin) {
    try {
      const query = await questions.findByIdAndDelete(new ObjectId(quesId));
      if (query) {
        res.send({ status: true, message: "Question removed!" });
      } else {
        res.send({ status: false, message: "Question not found!" });
      }
    } catch (error) {
      res.send({ status: false, message: error.message });
    }
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

// Below functions are optional

// function to get all questions present in database
const getAllQuestions = async (req, res) => {
  const token = req.body.token;
  const quizCode = req.body.quizCode;
  const id = decryptToken(token);
  if (!id.status) {
    res.send({ status: false, message: id.message });
  }
  const checkAdmin = await isAdmin(id.token);

  const checkQuiz = await isQuiz(quizCode);

  if (checkAdmin) {
    try {
      if (checkQuiz.status) {
        const list = await quizzes.aggregate([
          {
            $match: {
              quizCode: quizCode,
            },
          },
          {
            $lookup: {
              from: "questions",
              localField: "quizCode",
              foreignField: "quizCode",
              as: "questions",
            },
          },
          {
            $unwind: "$questions",
          },
          {
            $group: {
              _id: null,
              allQuestions: {
                $push: {
                  ques: "$questions.ques",
                  options: "$questions.options",
                  correctAns: "$questions.correctAns",
                  _id: "$questions._id",
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              allQuestions: 1,
            },
          },
        ]);
        if (list.length !== 0) {
          // console.log("list", list);
          res.send({ status: true, data: list[0] });
        } else if (list.length === 0) {
          res.send({ status: false, message: "No Questions added!" });
        }
      } else {
        res.send({ status: false, message: "Please save the Quiz first!" });
      }
    } catch (error) {
      res.send({ status: false, message: error.message });
    }
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

const findQuestion = async (req, res) => {
  const quesId = new ObjectId(req.body._id);

  try {
    const query = await questions.findById(quesId);
    if (query) res.send({ status: true, message: "Question exists" });
    else res.send({ status: false, message: "Question not found !" });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

module.exports = {
  addQuestion,
  getAllQuestions,
  getSpecificQuestion,
  deleteQuestion,
  updateQuestion,
  totalQuestions,
  findQuestion,
};
