const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/',cors(), express.static('../rinconcito-fe/dist/rinconcito-fe/browser/'));

app.listen(port, () => {
    console.log(`fe-server started on port: ${port}`);
});