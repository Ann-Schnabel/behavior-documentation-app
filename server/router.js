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
}