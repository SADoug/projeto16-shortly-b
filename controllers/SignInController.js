import db from "../src/bancoDeDados.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";

export async function SignInCliente(req, res) {
  const { email, password } = req.body;
  const token = v4();
  console.log(req.body);
  try {
    console.log("cheguei aqui") //não chega aqui
    //Validação de email e senha
    const usuarioID = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
    if (!bcrypt.compareSync(password, usuarioID.rows[0].password) ) {
      return res.sendStatus(401); 
    }
    if (!usuarioID.rows) {
      return res.sendStatus(401); 
    }
    const id = usuarioID.rows[0].id;
    const result = await db.query(`
     INSERT INTO sessions ("userId", token)
          VALUES ($1,$2);
        `, [id, token]);

    res.status(200).send(token);
  } catch (e) {
    res.status(422).send("Ocorreu um erro ao logar!");
  }
}