const express = require('express');
const bodyParser = require('body-parser')
const {PORT} = require('./config/server.config')
const app = express();
const apiRouter = require('./routes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
    return res.json({message:'Problem Service is alive'});
});
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})
