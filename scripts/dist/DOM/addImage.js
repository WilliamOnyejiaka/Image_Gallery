var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ImageService } from "./../services/services.js";
import TokenHandler from "./../modules/main/TokenHandler.js";
const tokenHandler = new TokenHandler();
const imageFileElement = document.querySelector("#image-file");
const imagePlaceholder = document.querySelector("#image-placeholder");
imageFileElement.addEventListener("change", (e) => __awaiter(void 0, void 0, void 0, function* () {
    imageIsValid(imageFileElement.files[0]) &&
        uploadImage(imageFileElement.files[0]);
    // if (imageIsValid(imageFileElement.files![0])) {
    //   uploadImage(imageFileElement.files![0]);
    // }
}));
function imageIsValid(file) {
    if (!["image/png", "image/jpeg"].includes(file.type)) {
        console.log("invalid file format");
        return false;
    }
    return true;
}
function uploadImage(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const formData = new FormData();
        formData.append("image_file", file);
        const token = yield tokenHandler.getToken();
        console.log(token);
        const data = yield (new ImageService()).postImage(formData, token);
        console.log(data);
    });
}
