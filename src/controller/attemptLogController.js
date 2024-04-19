const { ObjectId } = require("mongodb");
const { users } = require("../models/userDBSchema");
const { attemptSchema } = require("../models/attempt_log");

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

const isAttempted = async (quesId, user_id) => {
  try {
    const query = await attemptSchema.findOne({ quesId, user_id });

    if (query !== null) {
      return { status: true, message: "Already Attempted!" };
    } else {
      return { status: false, message: "Not attempted yet!" };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

const updateAns = async (user_id, quesId, quizCode, userAns) => {
  try {
    const updateQuery = await attemptSchema.findOneAndUpdate(
      { user_id, quesId, quizCode },
      {
        userAns,
      }
    );

    if (updateQuery !== null) {
      res.send({ status: true, message: "Answer Updated!" });
    } else {
      res.send({ status: false, message: "Answer not updated!" });
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

const addAns = async (user_id, quesId, quizCode, userAns) => {
  try {
    const addQuery = await attemptSchema.create({
      user_id,
      quesId,
      quizCode,
      userAns,
    });

    if (addQuery !== null) {
      res.send({ status: true, message: "Answer Added!" });
    } else {
      res.send({ status: false, message: "Answer not added!" });
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

const addLog = async (req, res) => {
  const { user_id, quesId, quizCode, userAns } = req.body;

  try {
    const isUserValid = await validate(user_id, quizCode);

    if (isUserValid.status) {
      const checkAttempted = await isAttempted(quesId, user_id);

      if (checkAttempted.status) {
        updateAns(user_id, quesId, quizCode, userAns);
      } else {
        addAns(user_id, quesId, quizCode, userAns);
      }
    } else {
      res.send(isUserValid);
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

module.exports = { addLog };
