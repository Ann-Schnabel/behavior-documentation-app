const models = require("./models/studentSchema");
const { request } = require("express");
const mongoose = require("mongoose");
const { Behavior, EventData, DurationData, LatencyData, IntervalData } = require("./models/studentSchema");


module.exports = function (router) {
  //route to get all students that belong to a teacher
  // takes in teacherId in request.body
  router.get("/api/teacher/students", (request, response, next) => {
    //get all available events
    models.Teacher.findById(request.body.teacherId)
      .populate("students")
      .exec((error, teacher) => {
        if (error) return response.send(error.message);

        response.send(teacher.students);
      });
  });

  //route to add a teacher to the database
  // takes in firstName, lastName in request.body
  router.post("/api/teacher", (request, response, next) => {
    let newTeacher = new models.Teacher({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
    })
    newTeacher.save();
    response.send(newTeacher);
  })


  //route to create students to add to a teacher
  // takes in teacherId, firstName (student), lastName, dob

  router.put("/api/teacher/students", (request, response, next) => {
    let newStudent = new models.Student({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      dob: request.body.dob,
    })

    models.Teacher.findById(request.body.teacherId)
      .populate("students")
      .exec((error, teacher) => {
        if (error) return response.send(error.message);

        teacher.students.push(newStudent);
        teacher.save();
        newStudent.save();
        response.send(teacher.students);
      })


  })

  //route to add an existing student to a teacher

  router.put("/api/teacher/existingStudent", (request, response, next) => {
    models.Teacher.findById(request.body.teacherId)
      .populate("students")
      .exec((error, teacher) => {
        if (error) return response.send(error.message);

        models.Student.findById(request.body.studentId)
          .exec((error, student) => {
            if (error) {
              response.send(error)
            } else {
              teacher.students.push(student);
              teacher.save();
              response.send(teacher.students);
            }
          })
      })
  })


  router.put("/api/student/behavior", (request, response, next) => {
    if (!mongoose.Types.ObjectId.isValid(request.body.studentId)) {
      response.writeHead(400, "Invalid Student ID Format")
      response.end();
    } else {
      models.Student.findById(request.body.studentId)
        .exec((err, student) => {
          if (err) {
            return response.send(error.message);
          } else if (student.behaviors.filter(behavior => behavior.behaviorName === request.body.behaviorName && behavior.recordingType === request.body.recordingType).length > 0) {
            response.writeHead(400, "a behavior with this name and recording type already exists");
            response.end();
          } else {
            let behavior = new Behavior({
              behaviorName: request.body.behaviorName,
              recordingType: request.body.recordingType
            })

            student.behaviors.push(behavior);
            student.save();
            response.send(student.behaviors)
          }
        })
    }
  })

  // route to add data to an existing behavior
  // takes in studentId, recordingType, date
    // startTime, endTime, tally, studentStartTime, intervalData, intervalLength, behaviorId
  router.put("/api/student/behaviorData", (request, response, next) => {
    if (!mongoose.Types.ObjectId.isValid(request.body.studentId)) {
      response.writeHead(400, "Invalid Student ID Format")
      response.end();
    } else {
      models.Student.findById(request.body.studentId)
        .exec((err, student) => {
          if (err) {
            return response.send(error.message)
          } else {
            // const RecordingTypes = ["eventRecording", "durationRecording", "latencyRecording", "intervalRecording"];
            let data;
            switch (request.body.recordingType) {
              case "eventRecording":
                data = new EventData({
                  date: request.body.date,
                  startTime: request.body.startTime,
                  endTime: request.body.endTime,
                  tally: request.body.tally
                })
                break;
              case "durationRecording":
                data = new DurationData({
                  date: request.body.date,
                  startTime: request.body.startTime,
                  endTime: request.body.endTime
                })
                break;
              case "latencyRecording":
                data = new LatencyData({
                  date: request.body.date,
                  startTime: request.body.startTime,
                  studentStartTime: request.body.student
                })
                break;
              case "intervalRecording":
                data = new IntervalData({
                  date: request.body.date,
                  intervalLength: request.body.intervalLength,
                  startTime: request.body.startTime,
                })
                request.body.intervalData.split(",").forEach((occurred, index) => {
                  data.intervals.push({interval: index, eventOccured: occurred});
                })
                break;
              default:
                response.writeHead(400, "invalid recordingType")
                response.end();
            }
            let behaviorIndex = student.behaviors.findIndex(behavior => String(behavior._id) === request.body.behaviorId);
            console.log("behavior index", behaviorIndex);
            console.log(student.behaviors);
            console.log(typeof student.behaviors[0]._id)
            student.behaviors[behaviorIndex].data.push(data);
            student.save();
            response.send(student.behaviors[behaviorIndex]);
          }
        })
    }
  })

}