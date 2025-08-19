const API_URL = "https://crudcrud.com/api/83c46bfd9cae473f911e1d8ade4628af/clientes";
const form = document.getElementById("formCliente");
const lista = document.getElementById("listaClientes");

// Função para renderizar clientes
function renderizarClientes() {
  lista.innerHTML = ""; // limpa a lista antes
  fetch(API_URL)
    .then(res => res.json())
    .then(clientes => {
      clientes.forEach(cliente => {
        const li = document.createElement("li");
        li.innerHTML = `
          ${cliente.nome} - ${cliente.email}
          <button>Excluir</button>
        `;

        const btnExcluir = li.querySelector("button");
        btnExcluir.addEventListener("click", () => {
          fetch(`${API_URL}/${cliente._id}`, { method: "DELETE" })
            .then(() => li.remove());
        });

        lista.appendChild(li);
      });
    })
    .catch(err => console.error("Erro ao listar clientes:", err));
}

// Evento de cadastro
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email })
  })
    .then(res => res.json())
    .then(() => {
      form.reset(); // limpa o form
      renderizarClientes(); // atualiza a lista
    })
    .catch(err => console.error("Erro ao cadastrar cliente:", err));
});

// Carregar clientes ao abrir a página
renderizarClientes();
