const express = require('express');
const app = express();
const itemsRouter = require('./routes'); // Adjust the path to use the modified 'routes.js'

app.use('/', itemsRouter); // Using the items router under the '/api' path

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));