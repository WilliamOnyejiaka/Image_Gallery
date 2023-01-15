var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ImageService {
    constructor() {
        this.baseUrl = "/api/routes/image";
    }
    postImage(formData, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("/api/routes/image/upload-image", {
                method: "POST",
                credentials: "include",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return yield response.json();
        });
    }
}
export default ImageService;
