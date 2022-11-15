import './style.css';

export const LoginPage = () => {
  const element = document.createElement("div");
  element.classList.add("page");
  element.innerHTML = `
    <div class="container">
      <h1>Přihlásit</h1>
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

  return element;
};
