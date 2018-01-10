const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({text: 'Hello world'});

});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
console.log(`Application listening on port ${PORT}`);