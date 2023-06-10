import jwt_decode from "jwt-decode";
import { $authHost, $host } from "./index";
import { createBasketForUser, createWishListForUser } from "./productAPI";

export const registration = async (first_name, last_name, email, password) => {
  console.log('registration', first_name, last_name, email, password)
  const response = await $host.post("auth/users/", { first_name, last_name, email, password });  // Ответ от сервера
  console.log("регистрация response", response);
  createBasketForUser({user: response.data.id})  // создаем корзину
  createWishListForUser({user: response.data.id})  // создаем список желаний 
  console.log("регистрация data", response.data);
  return response.data
};

export const login = async (email, password) => {
  const response = await $host.post("auth/jwt/create/", { email, password });
  console.log("авторизация response", response); 
  console.log("авторизация data", response.data);
  localStorage.setItem("token", response.data.access); // глянь на этот ответ 2:11:7
  console.log("авторизация response.data.access", response.data.access); 
  console.log("авторизация jwt_decode(response.data.access)", jwt_decode(response.data.access)); 

  const responseUserMe = await $authHost.get("api/v1/user-info/");
  console.log("авторизация auth/users/me/ responseUserMe", responseUserMe);
  console.log("авторизация auth/users/me/ responseUserMe data", responseUserMe.data);

  return responseUserMe.data.results[0];
};

// Проверка токена на валидность
// Получение данных о пользователя, если токен не валиден ничего не получим
export const check = async () => {
  console.log("check in userAPI is work")
  localStorage.setItem("token", localStorage.getItem("token"));
  console.log("check in userAPI ", jwt_decode(localStorage.getItem("token")))
  console.log("check in userAPI is work token")

  const userId = jwt_decode(localStorage.getItem("token")).user_id
  const response = await $authHost.get(`api/v1/user-info/${userId}/`);
  //const response = await $authHost.get(`api/v1/user-info/`);
  console.log("check auth/users/me/ token test", `Bearer ${localStorage.getItem("token")}`);
  console.log("check auth/users/me/ response user-info", response);
  console.log("check auth/users/me/ response.data user-info", response.data);

  return response.data.results[0]
};

export const updateUserFirstName = async (first_name) => {
  const userId = jwt_decode(localStorage.getItem("token")).user_id
  //const response = await $authHost.patch(`api/v1/user-info/`, {first_name});
  const response = await $authHost.patch(`api/v1/user-info/${userId}/`, {first_name});
  console.log("updateUser response ", response);
  //console.log("updateUser response.data ", response.data);
  return response
}

export const updateUserLastName = async (lastName) => {
  const userId = jwt_decode(localStorage.getItem("token")).user_id
  const response = await $authHost.patch(`api/v1/user-info/${userId}/`,{lastName});
  console.log("updateUser response ", response);
  console.log("updateUser response.data ", response.data);
  return response.data
}
export const updateUserEmail = async (email) => {
  const userId = jwt_decode(localStorage.getItem("token")).user_id
  const response = await $authHost.patch(`api/v1/user-info/${userId}/`,{email});
  console.log("updateUser response ", response);
  console.log("updateUser response.data ", response.data);
  return response.data
}

export const updateUserPhoneNumber = async (phoneNumber) => {
  const userId = jwt_decode(localStorage.getItem("token")).user_id
  const response = await $authHost.patch(`api/v1/user-info/${userId}/`, {phoneNumber});
  console.log("updateUser response ", response);
  console.log("updateUser response.data ", response.data);
  return response.data
}

export const updateUserCardNumber = async (cardNumber) => {
  const userId = jwt_decode(localStorage.getItem("token")).user_id
  const response = await $authHost.patch(`api/v1/user-info/${userId}/`,{cardNumber});
  console.log("updateUser response ", response);
  console.log("updateUser response.data ", response.data);
  return response.data
}
