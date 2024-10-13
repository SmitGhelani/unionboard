const serverless = require("serverless-http");
const express = require("express");
const app = require("../../bin/www"); // Adjust this based on your structure

module.exports.handler = serverless(app);
