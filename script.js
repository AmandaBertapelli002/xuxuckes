
  const form = document.getElementById("formContato");
  const feedback = document.getElementById("feedback");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // impede envio real

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    // cria um "cartão mágico" com os dados
    feedback.style.display = "block";
    feedback.innerHTML = `
      <h3>✨ Obrigada, ${nome}! ✨</h3>
      <p>Recebemos sua mensagem e vamos responder em breve.</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <blockquote>"${mensagem}"</blockquote>
    `;

    // salva no navegador (localStorage)
    const dados = { nome, email, mensagem, data: new Date().toLocaleString() };
    localStorage.setItem("ultimoContato", JSON.stringify(dados));

    // limpa formulário
    form.reset();
  });

  window.addEventListener("DOMContentLoaded", () => {
    const ultimo = localStorage.getItem("ultimoContato");
    if (ultimo) {
      const dados = JSON.parse(ultimo);
      feedback.style.display = "block";
      feedback.innerHTML = `
        <h3>🌟 Última mensagem salva 🌟</h3>
        <p><strong>Nome:</strong> ${dados.nome}</p>
        <p><strong>E-mail:</strong> ${dados.email}</p>
        <p><em>${dados.mensagem}</em></p>
        <small>Enviado em ${dados.data}</small>
      `;
    }
  });
