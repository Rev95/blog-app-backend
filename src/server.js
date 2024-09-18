import express from 'express';

const app = express();
app.use(express.json());

let articles = [
    {
        name: 'learn-react',
        upvotes: 0,
        comments: []
    },
    {
        name: 'learn-node',
        upvotes: 0,
        comments: []
    },
    {
        name: 'mongodb',
        upvotes: 0,
        comments: []
    }
];

app.post('/', (req, res) => {
    console.log(req.body);
    res.send(`Hello ${req.body.name}`);
});

app.get('/:name', (req, res) => {
    console.log(req.params);
    const { name } = req.params.name;
    res.send(`Hello ${name} !!`);
});

app.put('/api/articles/:name/upvote', (req, res) => {
    const name  = req.params.name;
    console.log(req.params, name);
    const article = articles.find(article => article.name === name);

    if (article) {
        article.upvotes += 1;
        res.send(`The article - ${name} has ${article.upvotes} upvotes`);
    } else {
        res.send(`The article - ${name} does not exist`);
    }
})

app.post('/api/articles/:name/comment', (req, res) => {
    const { name }  = req.params;
    const { postedBy, text } = req.body;
    const article = articles.find(article => article.name === name);

    if (article) {
        article.comments.push({
            postedBy,
            text
        });
        res.send(article);
    } else {
        res.send(`The article - ${name} does not exist`);
    }
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
})