const models = require("./models/studentSchema");
const { request } = require("express");
const mongoose = require("mongoose");


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


}