import db from "../src/bancoDeDados.js";
import bcrypt from "bcrypt";


export async function addCliente(req, res) {
  const { name, email, password } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, 10)
  console.log( name, email)
  try {
    const result = await db.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1,$2,$3);
    `, [name, email, encryptedPassword]);
    
    console.log("cheguei no addCliente");
    res.sendStatus(201);
  } catch (e) {
    res.status(422).send("Ocorreu um erro registrar o cliente!");
  }
}