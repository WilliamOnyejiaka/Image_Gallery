import { Gallery, loggedIn, TokenHandler } from "../modules/main/main.js";
import { imagePropertiesI } from "./../interfaces/interfaces.js";
import { ImageService } from "./../services/services.js";
import { CookieHandlerExtended } from "../lib/cookie_handler/cookie_handler.js";

loggedIn(async (token: string | null) => {
  interface ItemsI {
    id: number;
    name: string;
    created_at: string;
    user_id: number;
  }

  document.title =
    JSON.parse(localStorage.getItem("currentUser")!).name + "'s Gallery";
  const imageService: ImageService = new ImageService();
  const data = await imageService.getAllImages(token as string);
  const items: ItemsI[] = data.meta_data.data;
  const imageProperties: imagePropertiesI[] = items.map((item) => {
    return {
      id: item.id,
      name: item.name,
    };
  });
  new Gallery(imageProperties).createGallery();

  const galleryImages: NodeListOf<HTMLImageElement> =
    document.querySelectorAll(".gallery-image");
  galleryImages.forEach((galleryImage) => {
    galleryImage.addEventListener("click", (e) => {
      const imageId = (e.currentTarget as HTMLElement).dataset.imageId;
      localStorage.setItem(
        "imageId",
        JSON.stringify({
          id: imageId,
        })
      );
      window.location.href = "/templates/displayImage.html";
    });
  });
});

const logOutBtn = document.querySelector("#log-out") as HTMLLinkElement;
const tokenHandler = new TokenHandler();
const imageFileElement = document.querySelector(
  "#image-file"
) as HTMLInputElement;
const imagePlaceholder = document.querySelector(
  "#image-placeholder"
) as HTMLDivElement;

logOutBtn.addEventListener("click", (e) => {
  const cookieHandler: CookieHandlerExtended = new CookieHandlerExtended();

  cookieHandler.getCookie("access") && cookieHandler.deleteCookie("access");
  cookieHandler.getCookie("refresh") && cookieHandler.deleteCookie("refresh");

  localStorage.getItem("access") && localStorage.removeItem("access");
  localStorage.getItem("refresh") && localStorage.removeItem("refresh");
  window.location.href = "/templates/login.html";
});

imageFileElement.addEventListener("change", async (e) => {
  const allowedFileTypes: string[] = ["image/png", "image/jpeg"];
  const uploadsImage: UploadImage = new UploadImage(
    allowedFileTypes,
    imageFileElement.files![0]
  );
  const data = await uploadsImage.upload();

  data ? displayMessage(true) : displayMessage(false); //TODO : Check for server errors
  console.log(data);
});

function displayMessage(successful: boolean): void {
  const message = document.querySelector("#message") as HTMLParagraphElement;
  message.style.display = "block";
  if (!successful) {
    message.textContent = "invalid file type png or jpeg required";
    message.className = "text-danger";
  }
  message.textContent = "Image uploaded successfully";
  message.className = "text-success";
}

class UploadImage {
  private allowedFileTypes: string[];
  private image: File;
  private formData: FormData;

  constructor(allowedFileTypes: string[], image: File) {
    this.allowedFileTypes = allowedFileTypes;
    this.image = image;
    this.formData = new FormData();
    this.formData.append("image_file", image);
  }

  private imageIsValid(): boolean {
    return this.allowedFileTypes.includes(this.image.type);
  }

  private async postImage() {
    const token = await new TokenHandler().getToken();
    return await new ImageService().postImage(this.formData, token);
  }

  public async upload() {
    return this.imageIsValid() ? this.postImage() : null;
  }
}
