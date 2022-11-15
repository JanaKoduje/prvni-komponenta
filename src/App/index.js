import { Header } from "./../Header/index.js";
import { HomePage } from "./../HomePage/index.js";
import { RegisterPage } from "./../RegisterPage/index.js";
import { LoginPage } from "./../LoginPage/index.js";

export const App = () => {
  const element = document.createElement("div");
  element.classList.add("app");
  element.append(Header());

  const { pathname } = window.location;
  if (pathname === "/") {
    element.append(HomePage());
  } else if (pathname === "/register") {
    element.append(RegisterPage({}));
  } else if (pathname === "/login") {
    element.append(LoginPage());
  }

  return element;
};


