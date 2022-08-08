import db from "../src/bancoDeDados.js";

export async function userShortenGet(req, res) {
  const { id } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer', '').trim();
 
  if (!token) { return res.status(401).send(`erro em encontrar o token: ${token}`) }
  try {
    const procurarUsuario = await db.query(`
         SELECT *
          FROM sessions
          JOIN users ON sessions."userId" = users.id
          WHERE token = $1
        `, [token]);
    
    if (procurarUsuario.rows[0].length === 0) {
      return res.sendStatus(404);
    }
   
    const result = await db.query(`
        SELECT *
        FROM shortlys
        JOIN users ON users.id = shortlys."userId"
        WHERE shortlys."userId" = $1`, [id]);


    const shortenedUrl = [];
    let visistCount = 0;
    result.rows.map((item) => {
      visistCount = item.views;
      const newShort = {
        id: item.id,
        url: item.url,
        shortUrl: item.shortlyUrl,
        visistCount: item.views,
      }
      return shortenedUrl.push(newShort);
    });
    const infoUser = {
      id: procurarUsuario.rows[0].id,
      name: procurarUsuario.rows[0].name,
      visistCount: visistCount,
      shortenedUrl: shortenedUrl,
    }
    res.status(200).send(infoUser);
  } catch (e) {
    res.status(422).send("Ocorreu um erro ao buscar os dados!");
  }
}