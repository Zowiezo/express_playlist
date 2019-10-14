const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'user',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
});

// get all users
const getMusicians = (req, res) => {
    pool.query('SELECT * FROM USERS ORDER BY id ASC', (error, results) => {
        if ( error ) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

// get a singer user via ID 
const getMusiciansById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) =>{
        if ( error ) {
            throw error; 
        }
        res.status(200).json(results.rows);
    });
};

// creating a new user
const createMusicians = (req, res) => {
    const { name, song } = req.body;

    pool.query('INSERT INTO user (name, song) VALUES ($1, $2)', [name, song], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`User added with ID: ${result.insertId}`);
    });
};

// updating user 
const updateMusicians = (req, res) =>{
    const id = parseInt(req.params.id);
    const { name, song } = req.body;

    pool.query(
        'UPDATE user SET name = $1, song = $2 WHERE id = $3', 
        [name, song, id],
        (error, result) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`User modified with ID: ${id}`);
        }
    );
};

const deleteMusicians = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(`DELETE FROM users WHERE id = $1`, [id], (error, results) =>{
        if (error) {
            throw error;
        }
        res.status(200).send(`User deleted with ID: ${id}`);
    });
};

save() {

    //let num = this.visitor_count;
    fs.writeFileSync('visitor_' + this.visitor_count + '.json ', JSON.stringify(this))
    return "data is saved";
};

load() {
    let data = JSON.stringify(this);
    fs.readFileSync('visitor_' + this.visitor_count + '.json ')
    return data;
};


module.exports = {
    getMusicians,
    getMusiciansById,
    createMusicians,
    updateMusicians,
    deleteMusicians,
};

