require('dotenv').config();
const redisLib = require('redis');

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

const redisClient = redisLib.createClient({
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT,
    },
    password: REDIS_PASSWORD,
});

redisClient.on('error', (err) => {
    console.error('REDIS SERVER:', err);
});


const redis = {
    get: async (key) => {
        return new Promise((resolve, reject) => {
            redisClient.get(key, (err, value) => {
                if (err) {
                    return reject(err);
                }
                resolve(value);
            });
        });
    },

    set: async (key, value, expiration) => {
        return new Promise((resolve, reject) => {
            if (expiration) {
                redisClient.setex(key, expiration, value, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            } else {
                redisClient.set(key, value, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            }
        });
    },

    del: async (key) => {
        return new Promise((resolve, reject) => {
            redisClient.del(key, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    },
};

const connect = async () => {
    try {
        await redisClient.connect();
        console.log('REDIS SERVER: CONECTADO COM SUCESSO');
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
}

const disconnect = async () => {
    try {
        await redisClient.quit();
        console.log('Redis client disconnected successfully');
    } catch (error) {
        console.error('Error disconnecting from Redis:', error);
    }
}

module.exports = {
    redis,
    initRedis: connect,
};