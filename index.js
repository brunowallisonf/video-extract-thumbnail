const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const getDuration = async (link) => new Promise((resolve, reject) => {
  exec(`ffprobe -i ${link} -show_entries format=duration -v quiet -of csv="p=0"`, (error, stdout) => {
    if (error) {
      return reject(stdout);
    }
    return resolve(stdout);
  });
});

const createThumbnail = async (link, temporaryFolderPath) => {
  const videoDuration = await getDuration(link);

  const temporaryFolderExists = await new Promise((resolve) => {
    fs.access(temporaryFolderPath).then(() => resolve(true)).catch(() => resolve(false));
  });
  if (!temporaryFolderExists) await fs.mkdir(temporaryFolderPath);
  return new Promise((resolve, reject) => {
    const filePath = `${path.resolve(temporaryFolderPath)}/${uuidv4()}.png`;
    exec(`ffmpeg -ss ${(10 / 100) * Math.floor(videoDuration)} -i ${link} -vframes 1 ${filePath}`, (error, stdout) => {
      if (error) {
        return reject(error);
      }
      return resolve(filePath);
    });
  });
};

(async () => {
  const filePath = await createThumbnail('https://assets14.ign.com/videos/zencoder/2021/04/05/1920/6bafee57743996c202c6839447dd260d-3906000-1617642138.mp4', path.resolve(__dirname, 'tmp'));
  await fs.rm(filePath);
})();
