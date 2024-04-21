const { ObjectId } = require("mongodb");
const { users } = require("../models/userDBSchema");
const { attemptSchema } = require("../models/attempt_log");
const { decryptToken } = require("../middleware/authMiddleware");

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
      return { status: true, message: "Answer Updated!" };
    } else {
      return { status: false, message: "Answer not updated!" };
    }
  } catch (error) {
    return { status: false, message: error.message };
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
      return { status: true, message: "Answer Added!" };
    } else {
      return { status: false, message: "Answer not added!" };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

const addLog = async (req, res) => {
  const { user_id, quesId, quizCode, userAns } = req.body;
  // const token = req.body.token;
  try {
    const id = decryptToken(user_id);
    if (!id.status) {
      res.send({ status: false, message: id.message });
    }
    // console.log("id.token", id.token);
    // const checkAdmin = await isAdmin(id.token);
    const isUserValid = await validate(id.token, quizCode);

    if (isUserValid.status) {
      // check if user has already attempted question
      const checkAttempted = await isAttempted(quesId, id.token);

      if (checkAttempted.status) {
        res.send(await updateAns(id.token, quesId, quizCode, userAns));
      } else {
        res.send(await addAns(id.token, quesId, quizCode, userAns));
      }
    } else {
      res.send(isUserValid);
    }

    // check if user validated to attempt question
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

module.exports = { addLog };
