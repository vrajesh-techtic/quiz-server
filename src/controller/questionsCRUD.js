const { questions } = require("../models/questionDBSchema");
const { ObjectId } = require("mongodb");

// function to add new question
const addQuestion = async (req, res) => {
  const quesArr = req.body;

  try {
    const query = await questions.insertMany(quesArr);

    if (query) {
      res.send({ status: true, message: "Question added to Database" });
    } else {
      res.send({ status: false, message: "Question not added" });
    }
  } catch (error) {
    console.log(error.message);
    res.send({ status: false, message: error.message });
  }
};

// function to get all questions present in database
const getAllQuestions = async (req, res) => {
  try {
    const query = await questions.find({});

    res.send({ status: true, data: query, noOfQuestions: query.length });
  } catch (error) {
    console.log(error.message);
    res.send({ status: false, message: error.message });
  }
};

const totalQuestions = async (req, res) => {
  try {
    const query = await questions.countDocuments();

    res.send({ status: true, data: query });
  } catch (error) {
    console.log(error.message);
    res.send({ status: false, message: error.message });
  }
};

// function to fetch particular question from database
const getSpecificQuestion = async (req, res) => {
  const quesId = new ObjectId(req.params.id.slice(1, req.params.id.length));

  try {
    const query = await questions.findById(quesId, { _id: 0 });

    if (query !== null) {
      res.send({ status: true, data: query });
    } else {
      res.send({ status: false, message: "Question not found!" });
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

const updateQuestion = async (req, res) => {
  const quesId = new ObjectId(req.body.quesId);
  const quizCode = req.body.quizCode;
  const ques = req.body.ques;
  const options = req.body.options;
  const correctAns = req.body.correctAns;

  try {
    const query = await questions.findByIdAndUpdate(quesId, {
      quizCode: quizCode,
      ques: ques,
      options: options,
      correctAns: correctAns,
    });

    console.log(query);

    if (query) {
      res.send({ status: true, message: "Question updated successfully" });
    } else {
      res.send({ status: false, message: "Question not found!" });
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
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

// function to delete particular question
const deleteQuestion = async (req, res) => {
  const quesId = new ObjectId(req.params.id.slice(1, req.params.id.length));
  try {
    const query = await questions.findByIdAndDelete(quesId);
    if (query)
      res.send({ status: true, message: "Question deleted from database" });
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
