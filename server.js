const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('Server running');
});

app.get('/api/quotes/random', (req, res) => {
    const randomQuoteObject = {
        quote: getRandomElement(quotes)
    };
    res.send(randomQuoteObject);
});

app.get('/api/quotes', (req, res) => {
    const filterQuotes = quotes.filter(author => {
      return author.person === req.query.person;
    });

    if (req.query.person) {
      res.send({ quotes: filterQuotes });
    } else if(req.query.person == '') {
      res.send({ quotes: [] });
    } else {
        res.send({ quotes: quotes });
      }
});

app.post('/api/quotes', (req, res) => {
    if(!(req.query.quote && req.query.person)) {
        res.status(400).send();
    } else {
        const newObject = {quote: req.query.quote, person: req.query.person};
        quotes.push(newObject);
        res.send({quote: newObject});
    }
});