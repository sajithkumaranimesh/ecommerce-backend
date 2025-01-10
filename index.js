const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

app.use(morgan('dev'));

const PORT = 3000;

async function main(){
    await mongoose.connect('mongodb://localhost:27017/cinnamon-app')
    console.log("connected to databse👍");
}
main().catch((err) => console.log("database connection faild", err));

app.listen(PORT, () => {
    console.log(`Express App Listen On Port : ${PORT}`);
})