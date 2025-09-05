document.addEventListener('DOMContentLoaded', () => {
    // --- Formulário de contato ---
    const formContato = document.getElementById("formContato");
    const feedback = document.getElementById("feedback");
  
    if (formContato && feedback) {
      formContato.addEventListener("submit", function (e) {
        e.preventDefault();
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const mensagem = document.getElementById("mensagem").value;
  
        feedback.style.display = "block";
        feedback.innerHTML = `
          <h3>✨ Obrigada, ${nome}! ✨</h3>
          <p>Recebemos sua mensagem e vamos responder em breve.</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <blockquote>"${mensagem}"</blockquote>
        `;
  
        const dados = { nome, email, mensagem, data: new Date().toLocaleString() };
        localStorage.setItem("ultimoContato", JSON.stringify(dados));
  
        formContato.reset();
      });
  
      // Mostrar última mensagem
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
    }
  
    // --- Carregar posts no blog ---
    const blogSection = document.getElementById('blog');
    if (blogSection) {
      fetch('/posts')
        .then(res => res.json())
        .then(posts => {
          blogSection.innerHTML += posts
            .sort((a,b) => new Date(b.date) - new Date(a.date))
            .map(post => `
              <article>
                <header>
                  <h3>${post.title}</h3>
                  <p><time datetime="${post.date}">${new Date(post.date).toLocaleDateString('pt-BR')}</time></p>
                </header>
                <p>${post.excerpt}</p>
              </article>
            `).join('');
        })
        .catch(err => console.error('Erro ao carregar posts:', err));
    }
  
    // --- Formulário de adicionar post ---
    const formPost = document.getElementById('postForm');
    const btnPost = document.getElementById('submitBtn');
  
    if (formPost && btnPost) {
      btnPost.addEventListener('click', async () => {
        const title = formPost.title.value.trim();
        const date = formPost.date.value.trim();
        const excerpt = formPost.excerpt.value.trim();
  
        if (!title || !date || !excerpt) {
          alert('Todos os campos são obrigatórios!');
          return;
        }
  
        const data = { title, date, excerpt };
  
        try {
          const res = await fetch('/add-post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
  
          const result = await res.json();
  
          if (result.success) {
            alert(result.message);
            formPost.reset();
          } else {
            alert('Erro: ' + (result.error || 'Não foi possível adicionar o post'));
          }
        } catch (err) {
          console.error('Erro ao enviar o post:', err);
          alert('Erro ao adicionar post. Veja o console.');
        }
      });
    }
  });
  