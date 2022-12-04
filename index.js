const redis = require('redis');

const host = 'localhost'
const port = 8080

const client = redis.createClient(port, host);

client.on('connect', function () {
  if (err) {
    console.log('Could not establish a connection with Redis. ' + err);
  } else {
    console.log('Connected to Redis successfully!');
  }
});

// Strings

client.set('framework', 'ReactJS', function (err, reply) {
  console.log(reply); // OK
});

client.get('framework', function (err, reply) {
  console.log(reply); // ReactJS
});

// Hashes

client.HMGET('frameworks_hash', 'javascript', 'ReactJS', 'css', 'TailwindCSS', 'node', 'Express');

client.HGETALL('frameworks_hash', function (err, object) {
  console.log(object); // { javascript: 'ReactJS', css: 'TailwindCSS', node: 'Express' }
});

// Lists

client.rPush(['frameworks_list', 'ReactJS', 'Angular'], function (err, reply) {
  console.log(reply); // 2
});

client.lRange('frameworks_list', 0, -1, function (err, reply) {
  console.log(reply); // [ 'ReactJS', 'Angular' ]
});

// Sets

client.sAdd(['frameworks_set', 'ReactJS', 'Angular', 'Svelte', 'VueJS', 'VueJS'], function (err, reply) {
  console.log(reply); // 4
});

client.sMembers('frameworks_set', function (err, reply) {
  console.log(reply); // [ 'Angular', 'ReactJS', 'VueJS', 'Svelte' ]
});

// Check the existence of a key

client.exists('framework', function (err, reply) {
  if (reply === 1) {
    console.log('Exists!');
  } else {
    console.log('Doesn\'t exist!');
  }
});

// Delete a key

client.del('frameworks_list', function (err, reply) {
  console.log(reply); // 1
});

// Increment a key

client.set('working_days', 5, function () {
  client.incr('working_days', function (err, reply) {
    console.log(reply); // 6
  });
});