import db from "../src/bancoDeDados.js";


export async function RankingGet(req, res) {
    try {
        const resultado = await db.query(`
        SELECT users.id AS id, users.name,

        COALESCE(SUM(shortlys."userId"), 0) AS "ContadorDeLinks",
        COALESCE(SUM(shortlys.contagem), 0) AS "ContadorDeVisitas"
    
        FROM shortlys
    
        RIGHT JOIN users ON shortlys."userId" = users.id 
        GROUP BY users.id, users.name, shortlys."userId"
        ORDER BY "ContadorDeVisitas" DESC
    
        LIMIT 10;
    `);
        res.status(200).json(resultado.rows);
    }
    catch (e) {
        res.status(422).send("Ocorreu um erro ao buscar os dados!");
    }
}