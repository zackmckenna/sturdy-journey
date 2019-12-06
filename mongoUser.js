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

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const user = new User({
  name: 'test2',
  username: 'test2',
  password: 'test2',
});

user.save().then(response => {
  console.log('user saved!');
  mongoose.connection.close();
});
