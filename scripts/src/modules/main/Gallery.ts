import { imagePropertiesI } from "../../interfaces/interfaces.js";

class Gallery {
  private imageProperties: imagePropertiesI[];
  private galleryElement: HTMLDivElement;

  public constructor(imageProperties: imagePropertiesI[]) {
    this.imageProperties = imageProperties;
    this.galleryElement = document.querySelector(".gallery")!;
  }

  private setAttributes(
    imgTag: HTMLImageElement,
    imageProperty: imagePropertiesI
  ): void {
    imgTag.setAttribute("src", `./../images/${imageProperty.name}`);
    imgTag.setAttribute("data-image-id", `${imageProperty.id}`);
  }

  private createImgTags(): HTMLImageElement[] {
    return this.imageProperties.map((imageProperty) => {
      const imgTag: HTMLImageElement = document.createElement("img");
      this.setAttributes(imgTag, imageProperty);
      return imgTag;
    });
  }

  public createGallery(): void {
    this.createImgTags().forEach((imgTag) => {
      this.galleryElement.append(imgTag);
    });
  }
}

export default Gallery;
