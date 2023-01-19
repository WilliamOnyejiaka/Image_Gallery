class Gallery {
    constructor(imageProperties) {
        this.imageProperties = imageProperties;
        this.galleryElement = document.querySelector(".gallery");
    }
    setAttributes(imgTag, imageProperty) {
        imgTag.setAttribute("src", `./../images/${imageProperty.name}`);
        imgTag.setAttribute("class", "gallery-image");
        imgTag.setAttribute("data-image-id", `${imageProperty.id}`);
    }
    createImgTags() {
        return this.imageProperties.map((imageProperty) => {
            const imgTag = document.createElement("img");
            this.setAttributes(imgTag, imageProperty);
            return imgTag;
        });
    }
    createGallery() {
        this.createImgTags().forEach((imgTag) => {
            this.galleryElement.append(imgTag);
        });
    }
}
export default Gallery;
