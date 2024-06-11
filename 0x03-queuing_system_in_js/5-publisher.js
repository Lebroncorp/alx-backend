import redis from 'redis';

// Create a Redis client for publishing
const publisher = redis.createClient();

// Handle Redis connection errors for publisher
publisher.on('error', function(error) {
    console.error('Redis client not connected to the server:', error.message);
});

// Handle successful connection for publisher
publisher.on('connect', function() {
    console.log('Redis client connected to the server');
});

// Function to publish message after a certain time
function publishMessage(message, time) {
    setTimeout(() => {
        console.log('About to send', message);
        publisher.publish('holberton school channel', message);
    }, time);
}

// Call publishMessage function with different messages and times
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
