import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Handle Redis connection
client.on('error', function(error) {
    console.error('Redis client not connected to the server: ', error.message);
});

client.on('connect', function() {
    console.log('Redis client connected to the server');
});

// Store hash values using hset
client.hset(
    'HolbertonSchools',
    'Portland',
    50,
    redis.print
);
client.hset(
    'HolbertonSchools',
    'Seattle',
    80,
    redis.print
);
client.hset(
    'HolbertonSchools',
    'New York',
    20,
    redis.print
);
client.hset(
    'HolbertonSchools',
    'Bogota',
    20,
    redis.print
);
client.hset(
    'HolbertonSchools',
    'Cali',
    40,
    redis.print
);
client.hset(
    'HolbertonSchools',
    'Paris',
    2,
    redis.print
);

// Display hash values using hgetall
client.hgetall('HolbertonSchools', function(err, reply) {
    if (err) {
        console.error(err);
    } else {
        console.log(reply);
    }
});

// Close the connection to Redis
client.quit()
