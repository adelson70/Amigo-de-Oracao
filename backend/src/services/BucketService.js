const axios = require('axios');
require('dotenv').config();

const request_bucket = axios.create({
    baseURL: process.env.BUCKET_API_URL ,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

const BucketService = {
    async getBuckets(arquivo) {
        try {
            const response = await request_bucket.get(`/${arquivo}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching buckets:', error);
            throw error;
        }
    },

    async createBucket(bucketData) {
        try {
            const response = await request_bucket.post('/buckets', bucketData);
            return response.data;
        } catch (error) {
            console.error('Error creating bucket:', error);
            throw error;
        }
    },

    async deleteBucket(bucketId) {
        try {
            const response = await request_bucket.delete(`/buckets/${bucketId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting bucket:', error);
            throw error;
        }
    }
};

module.exports = { BucketService };