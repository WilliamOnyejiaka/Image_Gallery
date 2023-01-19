import { loggedIn } from "./../modules/main/main.js";
import { ImageService } from "./../services/services.js";

const imagePlaceHolder = document.querySelector(
  "#image-placeholder"
) as HTMLImageElement;
const deleteBtn = document.querySelector("#delete-btn") as HTMLLinkElement;
const createdAt = document.querySelector("#created-at") as HTMLParagraphElement;
const imageService: ImageService = new ImageService();
const imageId = JSON.parse(localStorage.getItem("imageId")!)
  ? JSON.parse(localStorage.getItem("imageId")!).id
  : null;

loggedIn(async (token: string | null) => {
  if (imageId !== null) {
    const data = await imageService.getImage(Number(imageId), token as string);
    imagePlaceHolder.setAttribute("src", `./../images/${data.data.name}`);
    createdAt.textContent = `Created at ${data.data.created_at}`;

    deleteBtn.addEventListener("click", async (e) => {
      const data = await imageService.deleteImage(imageId, token as string);
      console.log(data);

      data.error == false
        ? alert("Image deleted successfully")
        : alert("something went wrong");

      localStorage.removeItem("imageId");
      window.location.href = "/templates/gallery.html";
    });
  } else {
    alert("No image id");
    window.location.href = "/templates/gallery.html";
  }
});
