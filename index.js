const {urlencoded} = require('express');
const express = require('express');
const router  = require('./router');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(urlencoded({extended: true}));
app.use('/api', router);
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`success port running at port ${port}`);
}); 