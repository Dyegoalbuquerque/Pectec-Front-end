const express = require('express');
const path = require('path');
const app = express();

let port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, './dist/app/')));

app.get('/*', (req, res) => {
    res.sendFile( path.join(__dirname, './dist/app/index.html'));
});

app.listen(port, () => {
   console.log(`web api running http://localhost:${port}`);
});
