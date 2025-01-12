const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: "./config.env"})
const app = require('./app');

const DB = process.env.DATABASE_LOCAL;
const PORT = process.env.PORT || 8000;

async function main(){
    await mongoose.connect(DB)
    console.log("connected to databse👍");
}
main().catch((err) => console.log("database connection faild", err));


app.listen(PORT, () => {
    console.log(`Express App Listen On Port : ${PORT}`);
})