var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Gallery, loggedIn, TokenHandler } from "../modules/main/main.js";
import { ImageService } from "./../services/services.js";
import { CookieHandlerExtended } from "../lib/cookie_handler/cookie_handler.js";
loggedIn((token) => __awaiter(void 0, void 0, void 0, function* () {
    document.title =
        JSON.parse(localStorage.getItem("currentUser")).name + "'s Gallery";
    const imageService = new ImageService();
    const data = yield imageService.getAllImages(token);
    const items = data.meta_data.data;
    const imageProperties = items.map((item) => {
        return {
            id: item.id,
            name: item.name,
        };
    });
    new Gallery(imageProperties).createGallery();
    const galleryImages = document.querySelectorAll(".gallery-image");
    galleryImages.forEach((galleryImage) => {
        galleryImage.addEventListener("click", (e) => {
            const imageId = e.currentTarget.dataset.imageId;
            localStorage.setItem("imageId", JSON.stringify({
                id: imageId,
            }));
            window.location.href = "/templates/displayImage.html";
        });
    });
}));
const logOutBtn = document.querySelector("#log-out");
const tokenHandler = new TokenHandler();
const imageFileElement = document.querySelector("#image-file");
const imagePlaceholder = document.querySelector("#image-placeholder");
logOutBtn.addEventListener("click", (e) => {
    const cookieHandler = new CookieHandlerExtended();
    cookieHandler.getCookie("access") && cookieHandler.deleteCookie("access");
    cookieHandler.getCookie("refresh") && cookieHandler.deleteCookie("refresh");
    localStorage.getItem("access") && localStorage.removeItem("access");
    localStorage.getItem("refresh") && localStorage.removeItem("refresh");
    window.location.href = "/templates/login.html";
});
imageFileElement.addEventListener("change", (e) => __awaiter(void 0, void 0, void 0, function* () {
    const allowedFileTypes = ["image/png", "image/jpeg"];
    const uploadsImage = new UploadImage(allowedFileTypes, imageFileElement.files[0]);
    const data = yield uploadsImage.upload();
    data ? displayMessage(true) : displayMessage(false); //TODO : Check for server errors
    console.log(data);
}));
function displayMessage(successful) {
    const message = document.querySelector("#message");
    message.style.display = "block";
    if (!successful) {
        message.textContent = "invalid file type png or jpeg required";
        message.className = "text-danger";
    }
    message.textContent = "Image uploaded successfully";
    message.className = "text-success";
}
class UploadImage {
    constructor(allowedFileTypes, image) {
        this.allowedFileTypes = allowedFileTypes;
        this.image = image;
        this.formData = new FormData();
        this.formData.append("image_file", image);
    }
    imageIsValid() {
        return this.allowedFileTypes.includes(this.image.type);
    }
    postImage() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield new TokenHandler().getToken();
            return yield new ImageService().postImage(this.formData, token);
        });
    }
    upload() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.imageIsValid() ? this.postImage() : null;
        });
    }
}
