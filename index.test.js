const assert = require('assert');

const { describe, it, beforeEach } = require('mocha');

const fs = require('fs').promises;
const path = require('path');
const ThumbnailPicker = require('./src/ThumbnailPicker');

describe('Extract thumbnail test suite', () => {
  describe('Should return the path of the thumbnail', () => {
    it('Should return the path of the thumbnail', async () => {
      const thumbnailPicker = new ThumbnailPicker();
      const result = await thumbnailPicker.createThumbnail('https://assets14.ign.com/videos/zencoder/2021/04/12/1920/ea1216f23e90c2ee90d7ce0691e54362-3906000-1618266430.mp4', path.resolve(__dirname, 'tmp'));

      assert.match(result, new RegExp(path.resolve(__dirname, 'tmp'), 'gi'));
    });
  });
  describe('Should throw an error', () => {
    it('Should throw an error', async () => {
      const thumbnailPicker = new ThumbnailPicker();
      const result = thumbnailPicker.createThumbnail('https://assets14.ign.com/videos/zencoder/2021/04/12/1920/ea1216f23e90c2ee90d7ce0691e54362-3906000-1618266430.mp4ss', path.resolve(__dirname, 'tmp'));
      await assert.rejects(result);
    });
  });
  describe('Should throw an error', () => {
    beforeEach('removing folders', async () => {
      try {
        await fs.rm(path.resolve(__dirname, 'tmp'), { recursive: true });
      } catch (error) {

      }
    });
    it('should creare a new funcion', async () => {
      const thumbnailPicker = new ThumbnailPicker();
      const result = thumbnailPicker.createThumbnail('https://assets14.ign.com/videos/zencoder/2021/04/12/1920/ea1216f23e90c2ee90d7ce0691e54362-3906000-1618266430.mp4', path.resolve(__dirname, 'tmp'));
      await assert.doesNotReject(result);
    });
  });
});
