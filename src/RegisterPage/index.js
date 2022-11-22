export const RegisterPage = (props) => {
  const { error } = props;

  let alert = "";

  if (error !== undefined) {
    alert = `<div class="alert">${error}</div>`;
  }

  const element = document.createElement("div");
  element.classList.add("page");
  element.innerHTML = `
      <div class="container">
        <h1>Registrovat</h1>
        ${alert}
        <form>
          <label class="form-field">
            E-mail: <input class="email-input" type="email" />
          </label>
          <label class="form-field">
            Heslo: <input class="password-input" type="password" />
          </label>
          <button type="submit">Registrovat</button>
        </form>
      </div>
    `;

  element.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = element.querySelector(".email-input").value;
    const password = element.querySelector(".password-input").value;
   

    fetch("https://apps.kodim.cz/daweb/shoplist/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          window.location.href = "/login";
        } else {
          element.replaceWith(RegisterPage({ error: data.errors[0] }));
        }
      });
  });

  return element;
};
