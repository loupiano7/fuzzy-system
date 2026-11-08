const express = require('express');
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

const app = express();
const port = process.env.PORT || 8080;

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'auto',
  endpoint: process.env.AWS_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

app.get('/', (req, res) => {
  res.json({
    status: 'online',
    app: 'fuzzy-system',
    bucket: process.env.R2_BUCKET_NAME || 'not_set',
    timestamp: new Date().toISOString()
  });
});

app.get('/r2-check', async (req, res) => {
  try {
    const data = await s3.send(new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      MaxKeys: 10
    }));
    res.json({
      status: 'connected',
      bucket: process.env.R2_BUCKET_NAME,
      files: data.Contents ? data.Contents.map(item => item.Key) : []
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.listen(port, () => console.log(`fuzzy-system active on port ${port}`));
