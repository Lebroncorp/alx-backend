import { createClient, print } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis client not connected to the server: ', err.message));

client.on('connect', () => console.log('Redis client connected to the server'));

const setNewSchool = (schoolName, value) => {
	client.set(schoolName, value, print);
}

const displaySchoolValue = (schoolName) => {
	client.get(schoolName, (err, response) => {
		if (err) {
			console.error('Error: ', err.message);
			return;
		}
		console.log(response);
	});
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
