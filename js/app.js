// Importações dos módulos
import { Cliente } from "./classes.js";
import { buscarClientes, cadastrarCliente, excluirCliente, validarCliente } from "./utils.js";

// Seleção dos elementos do DOM
const form = document.getElementById("formCliente");
const lista = document.getElementById("listaClientes");

// Criar elemento para mostrar o total de clientes
const totalClientesEl = document.createElement("p");
totalClientesEl.id = "totalClientes";
lista.parentNode.insertBefore(totalClientesEl, lista);

/**
 * Função para renderizar clientes no DOM
 * - Usa map para criar elementos <li>
 * - Usa reduce para contar total de clientes
 * - Atualiza automaticamente ao cadastrar ou excluir
 */
async function renderizarClientes() {
  lista.innerHTML = ""; // Limpa lista antes de renderizar

  const clientes = await buscarClientes(); // Busca clientes do CRUD CRUD

  // Contagem de clientes usando reduce (exemplo de programação funcional)
  const total = clientes.reduce((acc) => acc + 1, 0);
  totalClientesEl.textContent = `Total de clientes: ${total}`;

  // Map para criar cada <li> com botão de excluir
  const elementos = clientes.map(c => {
    const li = document.createElement("li");
    li.innerHTML = `${c.nome} - ${c.email} <button>Excluir</button>`;

    // Evento do botão de excluir
    li.querySelector("button").addEventListener("click", async () => {
      await excluirCliente(c._id); // Exclui no CRUD CRUD
      li.remove();                 // Remove do DOM
      renderizarClientes();        // Atualiza contagem e lista
    });

    return li;
  });

  // Adiciona todos os <li> ao DOM
  elementos.forEach(el => lista.appendChild(el));
}

/**
 * Evento do formulário para cadastrar cliente
 * - Evita reload da página
 * - Valida os dados
 * - Cadastra via CRUD CRUD
 * - Atualiza lista
 */
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita reload da página

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  const novoCliente = new Cliente(nome, email);

  // Validação básica
  if (!validarCliente(novoCliente)) {
    alert("Preencha um nome e e-mail válidos!");
    return;
  }

  // Cadastra cliente no CRUD CRUD
  await cadastrarCliente(novoCliente);

  form.reset();          // Limpa formulário
  renderizarClientes();  // Atualiza lista e contagem
});

/**
 * Inicializa a lista ao abrir a página
 */
renderizarClientes();
