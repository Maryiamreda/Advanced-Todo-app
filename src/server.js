import express from 'express'
// const express = require('express');
// const mongoose = require('mongoose')
import mongoose from 'mongoose'
import Blog from './model';
const app = express();
const dbURL = 'mongodb+srv://useraccess:7878788788@cluster0.r9zdppo.mongodb.net/todolist?retryWrites=true&w=majority';
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => app.listen(3000)
).catch((err) => console.log(err))
//listen for requests
