import app from './config/customExpress.js';
import 'dotenv/config';
import chalk from 'chalk'

const port = process.env.SERVER_PORT
app.listen( port, () => {
    console.log(chalk.bgGreen.black(`Servidor Rodando com Sucesso em http://localhost:${port}`))
})