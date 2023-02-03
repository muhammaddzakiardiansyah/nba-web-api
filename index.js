const {urlencoded} = require('express');
const express = require('express');
const router  = require('./router');
const app = express();
const port = 3000;

app.use(urlencoded({extended: true}));
app.use('/api', router);

app.listen(port, () => {
    console.log(`success port running at port ${port}`);
});