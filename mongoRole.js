const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url =
  `mongodb+srv://fullstack:${password}@cluster0-lcd1p.mongodb.net/nappzack?retryWrites=true&w=majority
  `;

mongoose.connect(url, { useNewUrlParser: true });

const roleSchema = new mongoose.Schema({
  name: String,
  alignment: String,
  description: String,
  actions: String,
  booleanAlign: Boolean
});

const Role = mongoose.model('Role', roleSchema);

const role = new Role({
  name: 'guard',
  alignment: 'good',
  description: 'You defend the keyholder',
  actions: 'identify the traitor',
  booleanAlign: true
});

role.save().then(response => {
  console.log('role saved!');
  mongoose.connection.close();
});
