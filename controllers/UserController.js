import db from "../src/bancoDeDados.js";

export async function userShortenGet(req, res) {
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
   
    const  id  = procurarUsuario.rows[0].userId;
    const result = await db.query(`
    SELECT *
    FROM users
    JOIN shortlys ON shortlys."userId" = users.id
    WHERE users.id = $1  
   `, [id]);
    
    console.log(result.rows[0]);
    
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
    res.status(422).send(e.message);
  }
}