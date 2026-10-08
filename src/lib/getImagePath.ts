export const getImagePath = (imagePath: string) => {
    const url = "http://res.cloudinary.com/"

    if(imagePath.startsWith(url)) {
        return imagePath
    } else {
        return `/products/${imagePath}.jpg`
    }
}