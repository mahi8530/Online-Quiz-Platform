const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/quizdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Question = mongoose.model("Question", new mongoose.Schema({
  subject: String,
  level: String,
  question: String,
  options: [String],
  correctAnswer: Number,
}));

async function seed() {
  await Question.deleteMany({});
  await Question.insertMany([
    {
      subject: "math",
      level: "easy",
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1, 
    },
    {
      subject: "science",
      level: "easy",
      question: "What planet is known as the Red Planet?",
      options: ["Earth", "Venus", "Mars", "Jupiter"],
      correctAnswer: 2, 
    },
  ]);
  console.log(" Sample questions added!");
  mongoose.disconnect();
}

seed();
