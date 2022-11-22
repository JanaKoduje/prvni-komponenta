import "./style.css";

export const LoginPage = (props) => {
  const { error, session } = props;

  if (session !== undefined && session !== "no-session") {
    window.location.href = "/";
    return null;
  }

  let alert = "";
  console.log("error: ", error)
  console.log("alert prvni: ", alert)

  if (error !== undefined) {
    alert = `<div class="alert">${error}</div>`;
  }

  console.log("alert po error: ", alert)
  const element = document.createElement("div");
  element.classList.add("page");

  element.innerHTML = `
    <div class="container">
      <h1>Přihlásit</h1>
      ${alert}
      <form>
        <label class="form-field">
          E-mail: <input class="email-input" type="email" />
        </label>
        <label class="form-field">
          Heslo: <input class="password-input" type="password" />
        </label>
        <button type="submit">Přihlásit</button>
      </form>
    </div>
  `;

  const formular = element.querySelector("form");
  console.log(formular)
  
  formular.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = element.querySelector(".email-input").value;
    const password = element.querySelector(".password-input").value;

    fetch("https://apps.kodim.cz/daweb/shoplist/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.status === "success") {
          localStorage.setItem("authToken", data.results.token);
          window.location.href = "/";
        } else {
          element.replaceWith(LoginPage({ error: data.errors[0], session }));
        }
      });
  });

  return element;
};
