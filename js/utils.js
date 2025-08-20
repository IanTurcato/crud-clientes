const API_URL = "https://crudcrud.com/api/a00c2ed651ef491aa683006960c19202/clientes";

// Função para pegar todos os clientes
export async function buscarClientes() {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (err) {
    console.error("Erro ao listar clientes:", err);
    return [];
  }
}

// Função para cadastrar cliente
export async function cadastrarCliente(cliente) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente)
    });
    return await res.json();
  } catch (err) {
    console.error("Erro ao cadastrar cliente:", err);
  }
}

// Função para excluir cliente
export async function excluirCliente(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (err) {
    console.error("Erro ao excluir cliente:", err);
  }
}

// Função de validação pura
export function validarCliente(cliente) {
  if (!cliente.nome || !cliente.email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(cliente.email);
}
