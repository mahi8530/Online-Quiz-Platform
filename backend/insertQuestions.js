import mongoose from "mongoose";
import Question from "./models/question.js"; // This uses your existing model

mongoose.connect("mongodb://127.0.0.1:27017/quizApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const newQuestions = [
  { question: "Which language is primarily used for Android app development?", options: ["Python", "Java", "Swift", "C#"], answer: "Java" },
  { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperTool Multi Language", "Hyper Transfer Markup Language"], answer: "HyperText Markup Language" },
  { question: "Which protocol is used to send emails?", options: ["HTTP", "SMTP", "FTP", "SNMP"], answer: "SMTP" },
  { question: "Which data structure uses LIFO?", options: ["Queue", "Array", "Stack", "Linked List"], answer: "Stack" },
  { question: "Which SQL command is used to remove a table?", options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"], answer: "DROP" },
  { question: "What does CSS stand for?", options: ["Computer Style Sheets", "Creative Style Syntax", "Cascading Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
  { question: "Which of the following is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], answer: "MongoDB" },
  { question: "Which company developed the C# language?", options: ["Apple", "Google", "Microsoft", "IBM"], answer: "Microsoft" },
  { question: "Which sorting algorithm has the best average-case time complexity?", options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"], answer: "Merge Sort" },
  { question: "Which HTTP method is used to update data?", options: ["GET", "POST", "PUT", "DELETE"], answer: "PUT" },
  { question: "Which OS is open-source and widely used in servers?", options: ["Windows", "macOS", "Linux", "iOS"], answer: "Linux" },
  { question: "Which of the following is a frontend JavaScript framework?", options: ["Django", "React", "Laravel", "Spring"], answer: "React" },
  { question: "What does API stand for?", options: ["Application Programming Interface", "Advanced Protocol Integration", "Automated Program Interaction", "Applied Programming Instruction"], answer: "Application Programming Interface" },
  { question: "Which of these is a version control system?", options: ["Git", "Jira", "Docker", "Node.js"], answer: "Git" },
  { question: "Which keyword is used to define a constant in JavaScript?", options: ["let", "var", "const", "define"], answer: "const" },
  { question: "Which layer of the OSI model handles routing?", options: ["Transport", "Network", "Data Link", "Session"], answer: "Network" },
  { question: "Which of the following is a cloud computing platform?", options: ["Azure", "GitHub", "Visual Studio", "Slack"], answer: "Azure" },
  { question: "Which symbol is used for comments in Python?", options: ["//", "#", "/* */", "--"], answer: "#" },
  { question: "Which command is used to initialize a Git repository?", options: ["git start", "git init", "git create", "git new"], answer: "git init" },
  { question: "Which HTTP status code means 'Not Found'?", options: ["200", "403", "404", "500"], answer: "404" },
  { question: "Which language is used for iOS app development?", options: ["Kotlin", "Swift", "Java", "C++"], answer: "Swift" },
  { question: "Which keyword is used to inherit a class in Java?", options: ["extends", "inherits", "implements", "super"], answer: "extends" },
  { question: "Which operator is used for exponentiation in Python?", options: ["^", "**", "exp()", "pow"], answer: "**" },
  { question: "Which of the following is a backend framework?", options: ["Angular", "Vue", "Express", "React"], answer: "Express" },
  { question: "Which keyword is used to create a function in JavaScript?", options: ["func", "function", "def", "method"], answer: "function" },
  { question: "Which of the following is a statically typed language?", options: ["Java", "JavaScript", "Python", "PHP"], answer: "Java" },
  { question: "Which language is used for competitive programming?", options: ["HTML", "CSS", "C++", "SQL"], answer: "C++" },
  { question: "Which keyword is used to define a class in Python?", options: ["class", "def", "object", "type"], answer: "class" },
  { question: "Which of the following is not an OOP language?", options: ["Java", "Python", "C", "C#"], answer: "C" },
  { question: "Which language is used for scripting in web browsers?", options: ["Java", "JavaScript", "Python", "C++"], answer: "JavaScript" },
  { question: "Which protocol is used to transfer files over the internet?", options: ["SMTP", "FTP", "HTTP", "SSH"], answer: "FTP" },
  { question: "Which HTML tag is used to create a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], answer: "<a>" },
  { question: "Which database command is used to retrieve data?", options: ["SELECT", "GET", "FETCH", "SHOW"], answer: "SELECT" },
  { question: "Which of the following is a relational database?", options: ["MongoDB", "Redis", "MySQL", "Cassandra"], answer: "MySQL" },
  { question: "Which tool is used to containerize applications?", options: ["Git", "Docker", "Jenkins", "Kubernetes"], answer: "Docker" },
  { question: "Which of the following is a continuous integration tool?", options: ["Jenkins", "Git", "Slack", "VS Code"], answer: "Jenkins" },
  { question: "Which command is used to install packages in Node.js?", options: ["npm install", "node install", "install package", "node get"], answer: "npm install" },
  { question: "Which of the following is a JavaScript runtime?", options: ["React", "Node.js", "Angular", "Vue"], answer: "Node.js" },
  { question: "Which of the following is used to style HTML?", options: ["JavaScript", "CSS", "SQL", "Python"], answer: "CSS" },
  { question: "Which of the following is a Linux distribution?", options: ["Windows", "Ubuntu", "macOS", "Android"], answer: "Ubuntu" },
  { question: "Which command lists files in Linux?", options: ["ls", "dir", "list", "show"], answer: "ls" },
  { question: "Which of the following is a markup language?", options: ["Java", "HTML", "Python", "C++"], answer: "HTML" },
  { question: "Which of the following is used to manage databases?", options: ["MySQL Workbench", "Photoshop", "Excel", "VS Code"], answer: "MySQL Workbench" },
  { question: "Which of the following is a mobile OS?", options: ["Windows", "Linux", "Android", "macOS"], answer: "Android" },
  { question: "Which of the following is a cloud storage service?", options: ["Dropbox", "Git", "Slack", "VS Code"], answer: "Dropbox" },
  { question: "Which of the following is used for version control?", options: ["Git", "Docker", "Jenkins", "Node.js"], answer: "Git" },
  { question: "Which of the following is a Java IDE?", options: ["PyCharm", "Eclipse", "VS Code", "Xcode"], answer: "Eclipse" },
  { question: "Which of the following is used to test APIs?", options: ["Postman", "Slack", "GitHub", "Jira"], answer: "Postman" }
  
];

async function insertQuestions() {
  try {
    const result = await Question.insertMany(newQuestions);
    console.log(` Inserted ${result.length} questions`);
  } catch (err) {
    console.error(" Insert error:", err.message);
  } finally {
    mongoose.disconnect();
  }
}

insertQuestions();