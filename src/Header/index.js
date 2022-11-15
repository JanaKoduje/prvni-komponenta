import './style.css';

export const Header = () => {
  const element = document.createElement("header");
  element.innerHTML = `
    <div class="container">  
      <nav>
        <a href="/">Domů</a>  
      </nav>
      <div class="user">
        <nav>
          <a href="/register">Registrovat</a>
          <a href="/login">Přihlásit</a>
        </nav>
      </div>
    </div>
  `;

  return element;
};
