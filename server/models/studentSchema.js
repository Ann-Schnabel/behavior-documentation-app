const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/BehaviorTracking');

//variable schema to hold different recording schemas
const recordingSchema = new Schema({}, {strict: false});

//supported recording types
const RecordingTypes = ["eventRecording", "durationRecording", "latencyRecording", "intervalRecording"];

const behaviorSchema = new Schema({
  behaviorName: String,
  recordingType: String,
  data: [recordingSchema]
})


const Behavior = mongoose.model("behaviorModel", behaviorSchema);



const eventRecordingSchema = new Schema({
  date: String,
  startTime: String,
  endTime: String,
  tally: Number,
})

// duration recording schema
const durationRecordingSchema = new Schema({
  date: String,
  startTime: String,
  endTime: String
})

//latency recording schema
const latencyRecordingSchema = new Schema({
  date: String,
  startTime: String,
  studentStartTime: String
})

//interval recording schema
const intervalRecordingSchema = new Schema({
  date: String,
  intervalLength: Number, //(minutes)
  intervals: [{ interval: Number, eventOccurred: Boolean}]
})

const teacherSchema = new Schema({
  firstName: String,
  lastName: String,
  students: [{ type: Schema.Types.ObjectId, ref: "student" }]
})

const Teacher = mongoose.model("teacher", teacherSchema);

const EventData = mongoose.model("eventData", eventRecordingSchema);
const DurationData = mongoose.model("durationData", durationRecordingSchema);
const LatencyData = mongoose.model("latencyData", latencyRecordingSchema);
const IntervalData = mongoose.model("intervalData", intervalRecordingSchema);

const studentSchema = new Schema({
  firstName: String,
  //Bob
  lastName: String,
  //Ross
  dob: String,
  // 06/12/2005
  disabilities: [String],
  behaviors: [behaviorSchema],
})

const Student = mongoose.model("student", studentSchema);

// FAKE DATA



// let student1 = new Student({
//   firstName: "Spalding",
//   lastName: "Vance",
//   dob: "06/16/1997",
// })

// let behavior1 = new Behavior({
//   behaviorName: "behavior1",
//   recordingType: "eventRecording"
// })

// let teacher1 = new Teacher({
//   firstName: "Ann",
//   lastName: "Schnabel"
// })




// let newEventData = new EventData({
//   date: "08/12/20",
//   behavior: "behavior1",
//   startTime: "10:00AM",
//   endTime: "11:00AM",
//   tally: 10
// })


// let newEventData2 = new EventData({
//   date: "08/12/20",
//   behavior: "behavior1",
//   startTime: "11:00AM",
//   endTime: "12:00PM",
//   tally: 4
// })


// behavior1.data.push(newEventData2);
// student1.behaviors.push(behavior1);
// student1.save();

// teacher1.students.push(student1);

// teacher1.save();


module.exports = {
  Student,
  Teacher,
  Behavior,
  EventData,
  DurationData,
  LatencyData,
  IntervalData
}
