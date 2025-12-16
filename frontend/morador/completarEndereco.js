// Função para atualizar o endereço do morador
async function atualizarEndereco(event) {
    event.preventDefault();

    // Pega os valores dos campos
    const rua = document.querySelector('input[placeholder="Rua F"]').value.trim();
    const numero = document.querySelector('input[placeholder="Ex: 101"]').value.trim();

    // Validação básica
    if (!rua || !numero) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Pega o ID do morador do localStorage
    const moradorId = localStorage.getItem('id');

    if (!moradorId) {
        alert('ID do morador não encontrado. Faça login novamente.');
        return;
    }

    // Dados para enviar
    const dados = {
        rua: rua,
        numero: numero
    };

    try {
        // Desabilita o botão durante o envio
        const botao = event.target.querySelector('button');
        botao.disabled = true;
        botao.textContent = 'Salvando...';

        // Faz a requisição PUT com o ID do morador
        const response = await fetch(`http://localhost:8080/morador/${moradorId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const resultado = await response.json();

        // Salva as informações do morador no localStorage
        localStorage.setItem('id', resultado.id);
        localStorage.setItem('nome', resultado.nome);
        localStorage.setItem('cpf', resultado.cpf);
        localStorage.setItem('idCondominio', resultado.condominio.id);

        // Sucesso
        console.log('Resposta:', resultado);
        alert('Endereço salvo com sucesso!');

        // Redireciona para o dashboard
        window.location.href = 'dashboard.html';

    } catch (erro) {
        console.error('Erro ao salvar endereço:', erro);
        alert('Erro ao salvar endereço. Tente novamente.');

        // Reabilita o botão em caso de erro
        const botao = event.target.querySelector('button');
        botao.disabled = false;
        botao.textContent = 'Salvar Endereço';
    }
}

// Adiciona o event listener ao formulário quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', atualizarEndereco);
    }
});