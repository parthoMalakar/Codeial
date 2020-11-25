const express = require('express');
const app = express();
const port = 8001;
const expressLayouts = require('express-ejs-layouts');


app.use(expressLayouts);
app.use(express.static('./assets'));
//extract style and srcipts from sub pages intp layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', require('./routes/index'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');



app.listen(port, function(err){
    if(err) {
        console.log(`Error in running the server ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});