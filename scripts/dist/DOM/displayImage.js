var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loggedIn } from "./../modules/main/main.js";
import { ImageService } from "./../services/services.js";
const imagePlaceHolder = document.querySelector("#image-placeholder");
const deleteBtn = document.querySelector("#delete-btn");
const createdAt = document.querySelector("#created-at");
const imageService = new ImageService();
const imageId = JSON.parse(localStorage.getItem("imageId"))
    ? JSON.parse(localStorage.getItem("imageId")).id
    : null;
loggedIn((token) => __awaiter(void 0, void 0, void 0, function* () {
    if (imageId !== null) {
        const data = yield imageService.getImage(Number(imageId), token);
        imagePlaceHolder.setAttribute("src", `./../images/${data.data.name}`);
        createdAt.textContent = `Created at ${data.data.created_at}`;
        deleteBtn.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield imageService.deleteImage(imageId, token);
            console.log(data);
            data.error == false
                ? alert("Image deleted successfully")
                : alert("something went wrong");
            localStorage.removeItem("imageId");
            window.location.href = "/templates/gallery.html";
        }));
    }
    else {
        alert("No image id");
        window.location.href = "/templates/gallery.html";
    }
}));
