const express = require('express');
const models = require('./models');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const todos = require('./routes/todos');
const edit = require('./routes/edit')

const application = express();

application.engine('mustache', mustache());
application.set('views', './views');
application.set('view engine', 'mustache');


application.use('/public', express.static('./public'));
application.use(bodyParser.urlencoded());
application.use(todos);
application.use(edit);

application.listen(3000);