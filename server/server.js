// const recordingTypes = [{"Event": "Number"}, {"Whole-Interval": }, "Duration", "Latency", "Partial-Intervention", "Partial-Interval"]
// event recording
// type- Number
// date and time
// for input- date, time window, tally



// a student have behaviors
// behaviors have data and a recording type
// data depends on recording type


// Event recording data
// {
//   tally: Number,
//   date: String,
//   startTime: Number,
//   endTime: Number
// }


//partial interval recording
  // whgether the behavior happened at any time during the interval
    // underestimates high-frequency behavior and overestimates duration

// whole interval recording is used to increase a behavior
// partial interval recording is used to decrease behavior


//Whole-Interval recording
  // record interval where data occurs (entire duration)
  // consistent intervals
  // if the behavior doesn't span the entire interval, mark it as NO, if the behavior did extend for the entire interval mark it as YES


//partial-interval recording
  // used when 
    // difficult to tell when the behavior begins or ends
    // behavior occurs at such a high rate that its difficult to count
  //record if behavior occured during an interval

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const { Student, Teacher, Behavior, EventData, LatencyData, DurationData, IntervalData } = require('./models/studentSchema');
const redis = require("redis");
const responseTime = require("response-time");
// const keys = require('./config/keys');

const client = redis.createClient();

// Print redis errors to the console
client.on('error', (err) => {
  console.log("Error " + err);
});

// use response-time as a middleware
app.use(responseTime());

const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/BehaviorTracking');

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router(app, client);

const port = 5000;
const server = http.createServer(app);

server.listen(port);
console.log("Server listening on:", port);


// generate fake data

let student1 = new Student({
  firstName: "Spalding",
  lastName: "Vance",
  dob: "06/16/1997",
})

let student2 = new Student({
  firstName: "Sean",
  lastName: "Dohery",
  dob: "05/15/1995",
})

let student3 = new Student({
  firstName: "Aaron",
  lastName: "Hayslip",
  dob: "11/11/1984",
})

let student4 = new Student({
  firstName: "Morgan",
  lastName: "Cates",
  dob: "10/09/1994",
})

let student5 = new Student({
  firstName: "Bob",
  lastName: "Ross",
  dob: "08/08/1992",
})

let behavior1 = new Behavior({
  behaviorName: "screaming randomly during class",
  recordingType: "eventRecording"
})

let behavior2 = new Behavior({
  behaviorName: "taking a long time to start tasks",
  recordingType: "latencyRecording"
})

let behavior3 = new Behavior({
  behaviorName: "speaking in tongues",
  recordingType: "durationRecording"
})

let behavior4 = new Behavior({
  behaviorName: "being off task",
  recordingType: "intervalRecording"
})

student1.behaviors.push(behavior1);
student1.behaviors.push(behavior3);

student2.behaviors.push(behavior1);
student2.behaviors.push(behavior2);
student2.behaviors.push(behavior4);

student3.behaviors.push(behavior3);

student4.behaviors.push(behavior1);
student4.behaviors.push(behavior2);
student4.behaviors.push(behavior3);
student4.behaviors.push(behavior4);

let teacher1 = new Teacher({
  firstName: "Ann",
  lastName: "Schnabel"
})

let teacher2 = new Teacher({
  firstName: "Danny",
  lastName: "Devito"
})


teacher1.students.push(student1);
teacher1.students.push(student2);
teacher1.students.push(student3);

teacher2.students.push(student3);
teacher2.students.push(student4);
teacher2.students.push(student5);

student1.save();
student2.save();
student3.save();
student4.save();
student5.save();



teacher1.save();
teacher2.save();


let eventDataArr = [];

for(let i = 0; i < 30; i++) {
  let date;
  let startTime = `${((i % 12) + 8)}:00`;
  let endTime = `${((i % 12) + 9)}:00`;
  let tally = Math.floor(Math.random() * Math.floor(10));
  if ( (i % 6) < 10) {
    date = `08/0${Math.floor(i / 6) + 1}/2020`;
  } else {
    date = `08/${Math.floor(i / 6) + 1}/2020`;
  }

  let eventData = new EventData({
    date,
    startTime,
    endTime,
    tally
  })
  eventDataArr.push(eventData);
}

let durationDataArr = [];

for(let i = 0; i < 30; i++) {
  let date;
  if ( ((i / 6) + 1) < 10) {
    date = `08/0${Math.floor(i / 6) + 1}/2020`;
  } else {
    date = `08/${Math.floor(i / 6) + 1}/2020`;
  }

  let startHour = Math.floor(Math.random() * Math.floor(6)) + 2;

  let startTime = `${startHour}:${Math.floor(Math.random() * Math.floor(59))}`
  let endTime = `${Math.floor(startHour * Math.floor(2))}:${Math.floor(Math.random() * Math.floor(59))}`
  let durationData = new DurationData({
    date,
    startTime,
    endTime
  })

  durationDataArr.push(durationData);
}

eventDataArr.forEach(data => {
  student1.behaviors[0].data.push(data)
})

durationDataArr.forEach(data => {
  student1.behaviors[1].data.push(data)
})

// s
