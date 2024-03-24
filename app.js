require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const Score = require('./models/score')

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on('connected', () => {
	console.log(`Connected to ${db.name} at ${db.host} `);
});

app.use(express.json());
express.urlencoded({ extended: true })

app.use(cors({
    origin: 'https://m-j-terry.github.io/unit-1-project/'
}));

/* ROUTES */

app.get("/", (req, res) => res.json(db));
// INDEX
app.get('/api/score', async (req, res) => {
    try {
        const scores = await Score.find({})
        console.log(scores); 
        res.status(200).json(scores)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// POST
app.post('/api/score', async (req, res) => {
    try {
        const score = await Score.create({
            name: req.body.name,
            score: req.body.score,
            date: req.body.date
        })
        console.log(`Score = ${score}`); 
        res.status(200).json(score)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// DESTROY
app.delete('/api/score', async (req, res) => {
    try {
        const scores = await Score.find({})
        scores.sort((a, b) => b.score - a.score);
        console.log(scores)
        const lowestScore = scores[scores.length-1]
        await lowestScore.deleteOne()
        if (!lowestScore) throw new Error('lowestScore not found')
        res.status(200).json({message: 'lowestScore deleted'})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app