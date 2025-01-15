const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);


module.exports = app;