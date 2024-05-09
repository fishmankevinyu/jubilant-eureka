import pg from"pg";

const {Client} = pg;
async function generateUUId (req, res) {
    res.send(crypto.randomUUID());
}
async function getUserDetails (req, res) {
    var client = new Client({
        user: "postgres",
        host: "localhost",
        password: "990430",
        database: "world",
        port: 5432
    });

    try {
        await client.connect();
        var users = await client.query('SELECT * FROM users');
        await client.end();
        res.send(users);
    } catch (e) {
        console.log(e);
        await client.end()
        res.status(500).send('ERROR Code:' + e.code);

    }
}

async function createUser (req, res) {
    const user = req.body;
    const sql = "INSERT INTO users(uuid, name, email) VALUES($1, $2, $3) RETURNING *"
    console.log(user)
    const values = [user.uuid, user.name, user.email];

    var client = new Client({
        user: "postgres",
        host: "localhost",
        password: "990430",
        database: "world",
        port: 5432
    });
    try {
        await client.connect();
        var db_res = await client.query(sql, values);
        await client.end();
        await res.send(db_res);
    } catch (e) {
        console.log(e);
        res.status(500).send("Server Error");
        client.end();
    } 
}

function randomTone (req, res) {
    var tones = ['humorous', 'ironic', 'cynical']
    res.send(tones[Math.floor(Math.random() * tones.length)]);
}


var controller = { generateUUId, getUserDetails, createUser, randomTone };
export default controller;