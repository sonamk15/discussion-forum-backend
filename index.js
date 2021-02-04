const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const morgan = require('morgan');
const port =  5000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'));

app.use('/swagger-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('./lib/routes')(app);

app.listen(port, () =>
  console.log(`listening on port: ${port}`)
)
