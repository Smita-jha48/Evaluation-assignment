const redis = require('redis');
const redisClient = redis.createClient();
redisClient.on('error', (error) => console.error(`Error : ${error}`));

const get = async (token) => {
    await redisClient.connect();
    const tokenvalue = await redisClient.get(token);
    await redisClient.disconnect();
    return tokenvalue;
};

const set = async (token) => {
    await redisClient.connect();
    await redisClient.set(token,' ');
    await redisClient.disconnect();
};

const remove = async (token) => {
    redisClient.connect();
    await redisClient.del(token);
    redisClient.disconnect();
};


module.exports = { get, set, remove, redisClient };