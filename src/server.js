import express from 'express';
import { db, connectToDb } from './db.js';

const app = express();
app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    let article = await db.collection('articles').findOne({ name: name })

    if (article) {
        res.json(article);
    } else {
        res.json({ error: 'Article not found' });
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name }  = req.params;

    await db.collection('articles').updateOne({ name: name }, {
        '$inc': {
            upvotes: 1
        }
    });

    let article = await db.collection('articles').findOne({ name: name })

    if (article) {
        res.json(article);
    } else {
        res.json({ error: 'Article not found' });
    }
    
})

app.post('/api/articles/:name/comment', async (req, res) => {
    const { name }  = req.params;
    const { postedBy, text } = req.body;

    await db.collection('articles').updateOne({ name: name }, {
        '$push': {
            comments: {
                postedBy: postedBy,
                text: text
            }
        }
    }, (err, data) => {
        if (err) {
            res.json({ error: 'Failed to post comment' });
        } else {
            res.json({ posted: 'Comment posted successfully' });
        }
    })

    let article = await db.collection('articles').findOne({ name: name })

    if (article) {
        res.json(article);
    } else {
        res.json({ error: 'Article not found' });
    }
})

connectToDb(() => {
    console.log("Connected to Database");
    app.listen(8000, () => {
        console.log("Server is listening on port 8000");
    })
})