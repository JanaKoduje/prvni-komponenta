import "./style.css";

export const Header = (props) => {
  const { session } = props;

  const element = document.createElement("header");

  let userContent = `
  <nav>
  <a href="/register">Registrovat</a>
  <a href="/login">Přihlásit</a>
</nav>
  `;

  if (session !== undefined && session !== "no-session") {
    userContent = `<div>${session.user}</div>`;
  }

  element.innerHTML = `
    <div class="container">  
      <nav>
        <a href="/">Domů</a>  
      </nav>
      <div class="user">
      ${userContent}
      </div>
    </div>
  `;

  return element;
};
