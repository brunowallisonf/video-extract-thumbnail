const ThumbnailPicker = require("./ThumbnailPicker")

const main = async () => {
    const args = process.argv.slice(2);
    const thumbnailPicker = new ThumbnailPicker();

    const inputFolderIndex = args.findIndex(item => item === "-i") + 1
    const inputFile = args[inputFolderIndex]

    const outputFolderIndex = args.findIndex(item => item === "-o") + 1
    const outputFolder = args[outputFolderIndex]

    const proportionIndex = args.findIndex(item => item === "-p") + 1
    const proportion = args[proportionIndex]
    if (!outputFolder || !inputFile) {
        console.error("Wrong params, please verify exiting...")
        process.exit(1)
    }
    try {
        await thumbnailPicker.createThumbnail(inputFile, outputFolder, Number(proportion))

    } catch (e) {
        console.error("Wrong params, please verify exiting...")
        process.exit(1)
    }


}

main()
