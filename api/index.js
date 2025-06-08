require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary');
const connectWithDB = require("../config/db");

const cors = require('cors');


//connect with database
connectWithDB();

const app = express();
// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'https://unionboard.smitghelani.site',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))

const userRoute = require('../routes/userRoute');
const blogRoute = require('../routes/blogRoute');
const instituteRoute = require('../routes/instituteRoute');
const adminRoute = require('../routes/adminRoute');
const courseRoute = require('../routes/videoRoutes');
const predictionRoute = require('../routes/pedictionRoutes');

app.use('/', userRoute);
app.use('/', blogRoute);
app.use('/', instituteRoute);
app.use('/', adminRoute);
app.use('/', courseRoute);
app.use('/', predictionRoute);



app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Vercel' });
});
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = app;
