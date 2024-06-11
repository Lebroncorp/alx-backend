import redis from 'redis';

// Create a Redis client for subscription
const subscriber = redis.createClient();

// Handle Redis connection errors for subscriber
subscriber.on('error', function(error) {
    console.error('Redis client not connected to the server:', error.message);
});

// Handle successful connection for subscriber
subscriber.on('connect', function() {
    console.log('Redis client connected to the server');
});

// Subscribe to the "holberton school channel"
subscriber.subscribe('holberton school channel');

// Listen for messages on the subscribed channel
subscriber.on('message', function(channel, message) {
    console.log( message);
    if (message === 'KILL_SERVER') {
        subscriber.unsubscribe(); // Unsubscribe from the channel
        subscriber.quit(); // Quit the Redis client
    }
});
