import { createClient } from 'redis';
import { promisify } from 'util';

const client = createClient();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

client.on('error', err => console.log('Redis client not connected to the server: ', err.message));

client.on('connect', () => console.log('Redis client connected to the server'));

const setNewSchool = async (schoolName, value) => {
	await setAsync(schoolName, value);
	console.log('Reply: OK');
}

const displaySchoolValue = async (schoolName) => {
	const value = await getAsync(schoolName);
	console.log(value);
};

(async () => {
	await displaySchoolValue('Holberton');
	await setNewSchool('HolbertonSanFrancisco', '100');
	await displaySchoolValue('HolbertonSanFrancisco');
})();
