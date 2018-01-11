const express = require('express');
require('./services/passport');

const app = express();

// Setting up Auth routes for google
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
console.log(`Application listening on port ${PORT}`);