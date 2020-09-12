const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, {useUnifiedTopology: true, useNewUrlParser: true,}).then(() => {
  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
}).catch((err) => {
  console.log(err);
})

