# video-extract-thumbnail

A code to extract thumbnail from a video using FFMPEG and Node.js
Usage:
`node src/index.js -i <input_file> -o <output_file> -p <proportion>`

### Dictionary

input_file: the video that you want to get the thumbnail

output_file: the name and folder of the image that you want to save

proportion: the proportion in percent of seconds that you want to capture the image.
Example: if the duration of a video is 100 seconds and the proportion is 60,
then the thumbnail will be the frame that is showed in the 60th second of the video
