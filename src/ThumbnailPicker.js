const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class ThumbnailPicker {
    async createThumbnail(link, outputFilePath, percent = 10) {
        const videoDuration = await this.getDuration(link);
        const fileExists = await fs.readFile(outputFilePath)
        if (fileExists) {
            await fs.rm(outputFilePath)
        }
        return new Promise((resolve) => {
            const filePath = `${outputFilePath}`;
            exec(`ffmpeg -ss ${(percent / 100) * Math.floor(videoDuration)} -i ${link} -vframes 1 ${filePath}`, (error, stdout) => resolve(filePath));
        });
    }

    async getDuration(link) {
        return new Promise((resolve, reject) => {
            exec(`ffprobe -i ${link} -show_entries format=duration -v quiet -of csv="p=0"`, (error, stdout) => {
                if (error) {
                    return reject(stdout);
                }
                return resolve(stdout);
            });
        });
    }
}

module.exports = ThumbnailPicker;
