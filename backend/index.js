const express = require('express');
const cors = require('cors');

const app = express();

//Config JSON response
app.use(express.json());

//Config CORS
app.use(cors({ credentials: true,  origin: 'https://localhost:3000'}));

app.listen(5000)
