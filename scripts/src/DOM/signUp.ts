import {AuthService} from './../services/services.js'; 

async function signUp(){
    const name:string = "Micky Locky";
    const email:string = "email@gmail.com";
    const password:string = "password";
    const data = await (new AuthService()).signUp(name,email,password);
    console.log(data);
} 

signUp();