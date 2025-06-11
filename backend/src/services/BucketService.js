const axios = require('axios');
require('dotenv').config();
const fs = require('fs');

const request_bucket = axios.create({
    baseURL: process.env.BUCKET_API_URL ,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

const BucketService = {
    async get(token) {
        try {
            return {url: `${process.env.BUCKET_API_URL}/upload/${token}.png`};
        } catch (error) {
            console.error('Error fetching buckets:', error);
            throw error;
        }
    },

    async post (localFilePath, remoteFileName) {
        try {
            const fileStream = fs.createReadStream(localFilePath);

            const response = await request_bucket.put(
            `/upload/${remoteFileName}`,
            fileStream,
            {
                headers: {
                'Content-Type': 'application/octet-stream',
                },
            }
            );
            return response.status
        } catch (error) {
            console.error('Error uploading to bucket:', error.message);
            throw error;
        }
    },

    async delete(bucketId) {
        try {
            const response = await request_bucket.delete(`/buckets/${bucketId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting bucket:', error);
            throw error;
        }
    },

    async status() {
        try {
            const response = await request_bucket.get('/status');

            if (response.status !== 200) {
                throw new Error('BUCKET NÃO ESTÁ SINCRONIZADO');
            }

            console.log('BUCKET: CONECTADO COM SUCESSO');
            return response.data;
        } catch (error) {
            console.error('Error fetching bucket status:', error);
            throw error;
        }
    }
};

module.exports = { BucketService };