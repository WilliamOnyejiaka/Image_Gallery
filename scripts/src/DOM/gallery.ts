import { Gallery,TokenHandler } from '../modules/main/main.js';
import {imagePropertiesI} from './../interfaces/interfaces.js';
import {ImageService} from './../services/services.js';
import {CookieHandlerExtended} from '../lib/cookie_handler/cookie_handler.js';
import {LocalStorage} from './../modules/utilities/utilities.js';

// (async () => {
//   interface ItemsI {
//     id: number;
//     name: string;
//     created_at: string;
//     user_id: number;
//   }

//   const tokenHandler: TokenHandler = new TokenHandler();
//   const token = await tokenHandler.getToken();
//   if(token) {
//     const imageService: ImageService = new ImageService();
//     const data = await imageService.getAllImages(token);
//     const items: ItemsI[] = data.meta_data.data;
//     const imageProperties: imagePropertiesI[] = items.map((item) => {
//       return {
//         id: item.id,
//         name: item.name,
//       };
//     });
//     new Gallery(imageProperties).createGallery();
//   }else {
//     window.location.href = '/templates/login.html'
//   }
// })();

function logOut(){
  const cookieHandler:CookieHandlerExtended = new CookieHandlerExtended();

  cookieHandler.getCookie("access") && cookieHandler.deleteCookie("access");
  cookieHandler.getCookie("refresh") && cookieHandler.deleteCookie("refresh");

  localStorage.getItem('access') && localStorage.removeItem('access');
  localStorage.getItem('refresh') && localStorage.removeItem('refresh');  
  // window.location.href = "/templates/login.html";
}

logOut();

// console.log(localStorage.getItem('access'));
// window.location.href = "/templates/login.html";


