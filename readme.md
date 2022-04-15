# :o: JWT, BCRYPT autentificações com tokens

nota: :coffee: Este curso pertence a formação "Node.js Com Express", ele é o sexto de 8 cursos 
realacionados ao back-end e formação com node js. neste curso será abordado relacionamento
de login e senha com o BCRYPT, será aborado o uso de TOKENS com o JsonWebToken e autentificaçãod
de usuários logados com o PASSPORT...:coffee: :coffee: :coffee:

Quando criamos um sistema que possua login e senha e queremos
proteger a integridade dos dados do nossos usuários contrar
alguns ataque oriundos que podem comprometer nosso sistema 
precisamos usar algumas ferrametas para manter nossa aplicação 
segura.

## :o:  BCRYPT

Colocar uma senha no banco de dados sem sua devida cryptografia
pode ser perigoso, por isso a bibliotec bcrypt ajuda a desenvolver
um methodo mais seguro para armazenagem de senhas:

- [x] npm install bcrypt

O bcrypt geralmente é usado quando adicionamos uma senha ou então
quando queremos editar uma senha. para isso antes de adicionar a senha
usamos:

```javascript
password = await bcrypt.hash(password, 12);

```

dentro da função bcrypt.hash há dois argumentos sendo o primeiro
a senha que será cryptografada e o segundo a força da cryptografia usada
o retorno será o valor $ version $ força $ + 22 chave 33 caracters cryptografada

para comparar a senha atual com uma senha digitada no sistema de login
usamos a seguinte formula.

```javascript
    await bcrypt.compare(senha, usuario.password)
```

Seu retorno será um booleam, na função bcrypt compare recebe a senha
que o usuário digitou no sistema e a cryptografia da senha já salva
....

## :o: PASSPORT

- [x] npm install PASSPORT
- [x] npm install passport-local

O passport é usado para gerar validação dos dados da senha usada.
para usar o passaport precisamos envocar o passaport com use, depois 
dentro da função gerar um novo localStrategy (que veem do passaport-local)
na sequencia informar valores do cabeçalho, arrow function com email senha e 
done
Conforme abaixo..

```javascript
import passport from 'passport';
import { LocalStrategy } from 'passport-local';
import Usuario from '../models/users/usuarios.models.js'
import bcrypt from  'bcrypt'

const ObjVerificar = {
    usernameField: 'email',
    passordField: 'password',
    session: false
}
passport.use(new LocalStrategy(ObjVerificar, async (email, senha, done) => {
    try{
        const usuario = await Usuario.findOne({where: {email: email}})
        if(usuario){
            if(await bcrypt.compare(senha, usuario.password)){
                return done(null, usuario)
            }else{
                return done({message: 'a senha informada está incorreta!'}, false)
            }
        }else{
            return done({message: "usuário não existe!! "}, false)
        }
    }catch(err){
        return done({message: err.message}, false)
    }
}))

export default passport;
```
Importamos o valores de passport em controller de rotas.
e em rota adicionos passport como um middleware 

```javascript
routes.post('/login', passport.authenticate('local', {session: false}), UsuariosController.login)
```
### :o: CHAVE CRYPTOGRAFADAS PARA JWT

Este código gera um chave aleatória para criptografia em JWT;

node -e "console.log(require('crypto').randomBytes(256).toString('base64'))"

Após gerar o código acima e coletar a chave na rota de login é preciso definir
a chave de autentificação e jogar a mesma no cabeçalhos HEADERS authorizatiom 
desta forma executo seguites comandos:

```javascript
static login = async (req, res ) => {
        const valores = req.body
        const usuario = await UsuariosServices.buscarEmail(valores.email)
        const token = jwt.sign(usuario.id, process.env.JWT_KEY)
        res.set('Authorization', token)
        console.log(usuario)
        res.status(204).json(usuario)
    }
```

Após passar pelo middleware autentificação no passport o login então será gerado
o JWT para enviar aos Headers o token... mas ainda precisamos definir o acesso com outro comando do passaport que é chamado de bearer.... 

### :o: USANDO PASSPORT

#### autentificações com BEARER

para instalar o bearer usamos o seguinte comando:

- [x] npm install passport-http-bearer

após instaldo podemos usar o mesmo no projeto. O passport bearer define que o acesso só será concedito ao usuário se a página de login do mesmo conter o Token que foi criado e enviado ao cabeçalho no login...
para definir o processo...

```javascript
import passport from 'passport';
import {Strategy as bearerStrategy } from 'passport-http-bearer'
import jwt from 'jsonwebtoken';
import bcrypt from  'bcrypt'
import Usuario from '../models/users/usuarios.models.js';

passport.use( new bearerStrategy(async (token, done)=>{
    try{
        const Token = jwt.verify(token, process.env.JWT_KEY);
        const usuario = await Usuario.findOne({where: {id: Token}});
        done(null, usuario)
    }catch(err){
        done(`'${err}'-> Você não está logado`)
    }
}))
```
Desta forma o usuário só acessará a rota se estiver logado...

### :o: middleware para Passport

Uma vez criado a estratégia o login e o acessos do usuário então podemos construir as condições para o middleware que usaremos nas rotas para isso digitamos...


