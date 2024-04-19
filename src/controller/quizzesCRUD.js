const { ObjectId } = require("mongodb");
const { quizzes } = require("../models/quizDBSchema");
const { questions } = require("../models/questionDBSchema");
const { decryptToken } = require("../middleware/authMiddleware");
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

const isQuiz = async (req, res) => {
  const quizCode = req.body.quizCode;
  const token = req.body.token;
  const id = decryptToken(token);
  if (!id.status) {
    res.send({ status: false, message: id.message });
  }
  const checkAdmin = await isAdmin(id.token);

  if (checkAdmin) {
    const query = await quizzes.aggregate([
      {
        $match: {
          quizCode: quizCode,
        },
      },
      {
        $lookup: {
          from: "departments",
          localField: "deptId",
          foreignField: "_id",
          as: "deptData",
        },
      },
      {
        $unwind: "$deptData",
      },
      {
        $match: {
          "deptData.admin_id": new ObjectId(id.token),
        },
      },
      {
        $group: {
          _id: "$_id",
          quizName: { $first: "$quizName" },
          deptName: { $first: "$deptName" },
          admin_id: { $first: "$deptData.admin_id" },
        },
      },
      {
        $project: {
          _id: 0,
          admin_id: 0,
        },
      },
    ]);

    if (query.length === 0) {
      res.send({ status: false, message: "Quiz does not exists!" });
    } else {
      res.send({ status: true, message: "Quiz found", data: query[0] });
    }
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

/*

Required Parameters:

1. quizName
2. quizCode (unique)
3. deptName
4. deptId

*/

// function to create new quiz
const createQuiz = async (req, res) => {
  const { quizName, quizCode, deptName } = req.body.data;
  const deptId = req.body.deptId;

  const token = req.body.token;
  const id = decryptToken(token);
  if (!id.status) {
    res.send({ status: false, message: id.message });
  }
  const checkAdmin = await isAdmin(id.token);

  if (checkAdmin) {
    try {
      const quizData = { quizName, quizCode, deptName, deptId };

      const query = await quizzes.create(quizData);

      if (query) {
        res.send({ status: true, message: " Quiz created Successfully!" });
      }
    } catch (error) {
      res.send({ status: false, message: "Quiz already exists" });
    }
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

const updateQuiz = async (req, res) => {
  const quizCode = req.body.quizCode;
  const newQuizName = req.body.quizName;
  const token = req.body.token;
  const id = decryptToken(token);
  if (!id.status) {
    res.send({ status: false, message: id.message });
  }
  const checkAdmin = await isAdmin(id.token);

  if (checkAdmin) {
    try {
      const query = await quizzes.findOneAndUpdate(
        { quizCode },
        { quizName: newQuizName }
      );

      if (query) {
        res.send({ status: true, message: " Quiz name updated!" });
      } else {
        res.send({ status: false, message: "Quiz not found!" });
      }
    } catch (error) {
      res.send({ status: false, message: "Quiz not found!" });
    }
  } else {
    res.send({ status: false, message: "User does not exists!" });
  }
};

// function get particular quiz
// const getQuiz = async (req, res) => {
//   const quizCode = req.body.quizCode;

//   try {
//     const query = await quizzes.aggregate([
//       {
//         $lookup: {
//           from: "questions",
//           localField: "quizCode",
//           foreignField: "quizCode",
//           as: "questionList",
//         },
//       },
//       {
//         $match: {
//           quizCode: quizId,
//           questionList: {
//             $ne: [],
//           },
//         },
//       },
//     ]);

//     if (query !== null) {
//       res.send({
//         status: true,
//         data: query,
//         noOfQuestions: query[0].questionList.length,
//       });
//     } else {
//       res.send({ status: false, message: "Quiz not found!" });
//     }
//   } catch (error) {
//     res.send({ status: false, message: error.message });
//   }
// };

// function to update quiz
// const updateQuiz = async (req, res) => {
//   const quizId = req.params.id.slice(1, req.params.id.length);

//   const newQuizName = req.body.quizName;
//   const newQuizCode = req.body.quizCode;
//   const newDeptName = req.body.deptName;

//   // const newQuestionList = req.body.questionList;

//   try {
//     const oldQuizCode = (
//       await quizzes.findById(quizId, {
//         quizCode: 1,
//         _id: 0,
//       })
//     ).quizCode;
//     const query = await quizzes.findByIdAndUpdate(quizId, {
//       quizName: newQuizName,
//       quizCode: newQuizCode,
//       deptName: newDeptName,
//       // questionList: newQuestionList,
//     });

//     const questionQuery = await questions.updateMany(
//       { quizCode: oldQuizCode },
//       { quizCode: newQuizCode }
//     );

//     console.log(questionQuery.matchedCount);

//     if (query !== null) {
//       res.send({ status: true, message: "Quiz updated Successfully!" });
//     } else {
//       res.send({ status: false, message: "Quiz not found!" });
//     }
//   } catch (error) {
//     res.send({ status: false, message: error.message });
//   }
// };

// function to delete particular quiz
// const deleteQuiz = async (req, res) => {
//   const quizId = new ObjectId(req.params.id.slice(1, req.params.id.length));

//   try {
//     const query = await quizzes.deleteOne({ _id: quizId });

//     if (query.deletedCount === 1) {
//       res.send({ status: true, message: "Quiz Deleted!" });
//     } else {
//       res.send({ status: false, message: "Quiz does not exists!" });
//     }
//   } catch (error) {
//     res.send({ status: false, message: error.message });
//   }
// };

module.exports = { createQuiz, isQuiz, updateQuiz };
