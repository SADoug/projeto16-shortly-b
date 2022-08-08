import db from "../src/bancoDeDados.js";
import { nanoid } from 'nanoid';

export async function addURL(req, res) {
  const { url } = req.body
  const { authorization } = req.headers
  const token = authorization?.replace('Bearer', '').trim()
  const shortly = nanoid(10)
  if (!token)
    return res.status(401).send(`erro em encontrar o token: ${token}`)
  try {
    const header = await db.query(`SELECT * 
    FROM sessions 
    JOIN users ON sessions."userId" = users.id 
    WHERE token = $1`, [token]);
    if (header.rowCount === 0) {
      return res.sendStatus(404);
    }
    console.log(header.rows[0])
    await db.query(`
    INSERT INTO shortlys ("userId",url,"shortlyUrl","contagem")
    VALUES($1,$2,$3,$4);
        `, [
      header.rows[0].userId,
      url,
      shortly,
      0
    ]);
    console.log({ shortUrl: shortly })
    res.status(201).send({ shortUrl: shortly })
  } catch (error) {
    res.status(422).send(error)
  }
}


export async function getURLId(req, res) {
  const { id } = req.params;
  console.log(id)

  if (isNaN(parseInt(id))) {
    return res.sendStatus(400); // bad request
  }

  try {
    const result = await db.query(`SELECT * FROM shortlys WHERE id = $1;`, [id]);
    console.log(result.rows)
    if (result.rows.length === 0) {
      return res.sendStatus(404); // not found
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // internal server error
  }
}



export async function getURLIdOpen(req, res) {
  const { shortUrl } = req.params;
  let contagem = 0;
  try {
    const result = await db.query(`SELECT * FROM shortlys WHERE "shortlyUrl" = $1`, [shortUrl]);
    if (result.rowCount === 0) {
      return res.sendStatus(404); // not found
    }
    contagem = result.rows[0].contagem + 1;
    const contagemup = await db.query(`UPDATE shortlys SET contagem = ${contagem} WHERE "shortlyUrl" = $1`, [shortUrl]);
    res.redirect(result.rows[0].url);
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // internal server error
  }
}

export async function deleteUrl(req, res) {
  const urlId = req.params.id
  const { authorization } = req.headers
  const token = authorization?.replace('Bearer', '').trim()
  try {
    const urlExiste = await db.query(`SELECT * FROM shortlys WHERE id = $1`, [urlId]); //Valida se a URL existe
    if (urlExiste.rowCount === 0) {
      return res.sendStatus(404);
    }
    const owner = await db.query(`
          SELECT sessions.*
          FROM sessions WHERE token = $1`
      , [token])
    const urlExists = await db.query(`
          SELECT * FROM shortlys WHERE id = $1`
      , [urlId])
    if (owner.rows[0].userId != urlExists.rows[0].userId) return res.sendStatus(401) //Valida se o usuário é o dono da URL
    await db.query(`
          DELETE FROM shortlys WHERE id = $1
          `
      , [urlId])
    res.sendStatus(204) //Sucesso
  } catch (err) {
    console.log(err)
    res.sendStatus(500) //Erro
  }
}
