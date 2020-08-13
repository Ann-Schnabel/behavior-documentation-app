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
const keys = require('./config/keys');
const moment = require("moment");

const Schema = mongoose.Schema;






//


//student has behaviors
// each behavior has data