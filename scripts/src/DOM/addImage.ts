import { AuthService,ImageService } from "./../services/services.js";
import TokenHandler from "./../modules/main/TokenHandler.js";
import CookieHandlerExtended from "./../lib/cookie_handler/CookieHandlerExtended.js";

const tokenHandler = new TokenHandler();

const imageFileElement = document.querySelector(
  "#image-file"
) as HTMLInputElement;

const imagePlaceholder = document.querySelector(
  "#image-placeholder"
) as HTMLDivElement;

imageFileElement.addEventListener("change", async (e) => {
  imageIsValid(imageFileElement.files![0]) &&
    uploadImage(imageFileElement.files![0]);
  // if (imageIsValid(imageFileElement.files![0])) {
  //   uploadImage(imageFileElement.files![0]);
  // }
});

function imageIsValid(file: any) {
  if (!["image/png", "image/jpeg"].includes(file.type)) {
    console.log("invalid file format");
    return false;
  }
  return true;
}

async function uploadImage(file: any): Promise<any> {
  const formData: FormData = new FormData();
  formData.append("image_file", file);

  const token = await tokenHandler.getToken();
  console.log(token);
  
    
  const data = await (new ImageService()).postImage(formData, token);  

  console.log(data);
}
