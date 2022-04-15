import express from 'express';
import instanciar from '../models/database.js'
import chalk from 'chalk';
import cors from 'cors'
import routes from '../routes/index.js'

const app = express();
app.use(express.json());

app.use(express.urlencoded({extends: true}))

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE");
    res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, Authorization');
    app.use(cors());
    next();
})

app.use(routes)

instanciar.authenticate().then((response) => console.log(chalk.bgYellowBright.black('base_de_dados conectada com sucesso!'))).catch((err)=>{console.log(`Ocorreu um erro ${err.message}`)});

export default app;