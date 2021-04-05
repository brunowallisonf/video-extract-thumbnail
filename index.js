const { rejects } = require("assert");
const {exec} = require("child_process");
const { resolve } = require("path");


const getDuration = async (path) =>{
    return new Promise((resolve,reject) => {
        exec(`ffprobe -i ${path} -show_entries format=duration -v quiet -of csv="p=0"`, (error, stdout, stderr) => {
            if (error) {
                return reject(stdout)
            }
           return resolve(stdout)
          });
    })
};

const takeThumbnail = async (link) => {
    const videoDuration = await getDuration(link);
    const now = Date.now()
    return new Promise((resolve,reject) => {
        exec(`ffmpeg -ss ${ (10 /100) * Math.floor(videoDuration)} -i ${link} -vframes 1 ${now}.png`, (error, stdout, stderr) => {
            if (error) {
                return reject(error)
            }
           return resolve(stdout)
          });
    })

}

(async () => {
 console.log(await takeThumbnail(`https://assets14.ign.com/videos/zencoder/2021/04/05/1920/6bafee57743996c202c6839447dd260d-3906000-1617642138.mp4`))
})()