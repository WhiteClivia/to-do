const db = require ('./database.js');
const express = require('express');
const path = require('path')

const app = express();
const port = 3000;

//next makes any app.whatever() use to next one after execution

app.use(express.json());

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'client.html'))
})

app.get('/showall', async (req, res) => {
    try {
        const rows = await db.query('SELECT * FROM tasks')
        res.json(rows)
    } catch (err) {
        res.status(500).send('Error reading database')
    }
})

app.get('/readme', async (req, res)=> {
    try {
        //const readmePath = path.join(__dirname, 'static', 'components', 'readme.md');
        //const readmeTxt = await fs.readFile(readmePath, 'utf-8')
        //res.send(readmeTxt)
        res.sendFile(path.join(__dirname, 'static', 'components', 'readme.md'))
    } catch (err) {
        res.status(500).send('error loading readme')
    }
})

app.post('/', async (req, res) => {
    const text = req.body?.data ||'' // text is command + extra info
    if (text==='') return res.status(400).send('No data provided')
    console.log(text)
    const txt = text.split(' ')
    const command = txt.shift();
    const texts_id = txt.shift()
    const texts_prior = txt.shift()
    const texts = txt.join(' ')
    console.log(txt)

    switch (command) {
        case 'add':
            console.log('command add')
            await db.query('INSERT INTO tasks (taskText) VALUES (?)', [`${texts_id} ${texts_prior} ${texts}`]);
            return res.send('added')
        case 'update':
            console.log('command update')
            await db.query('UPDATE tasks SET taskPrior=?, taskText=? WHERE taskId=?', [texts_prior, texts, texts_id]);
            return res.send('updated')
        case 'delete':
            console.log('command delete')
            await db.query('DELETE FROM tasks WHERE taskId=?', [texts_id])
            return res.send('deleted')
        default:
            return res.send('none done')
    }
})

app.delete('/delete-table', async (req, res)=> {
    console.log('deleting in progress')
    await db.query('DROP TABLE IF EXISTS tasks');
    await db.init();
    return res.send('table deleted')
})

async function startDB () {
        try {
        await db.init(); // Инициализация базы данных
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

startDB();