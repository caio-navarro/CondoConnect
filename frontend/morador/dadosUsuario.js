// loadUserData.js - Carregar dados do usuário do localStorage
document.addEventListener('DOMContentLoaded', function () {
    // Buscar dados do localStorage
    const nomeCompleto = localStorage.getItem('nome');
    const cpf = localStorage.getItem('cpf');
    const id = localStorage.getItem('id');

    // Verificar se o usuário está logado
    if (!id || !nomeCompleto) {
        alert('Sessão expirada. Por favor, faça login novamente.');
        window.location.href = 'login.html';
        return;
    }

    // Extrair primeiro nome para a saudação
    const primeiroNome = nomeCompleto.split(' ')[0];

    // Atualizar nome na sidebar (dentro da div de User Info)
    const userNameSidebar = document.querySelector('aside h2');
    if (userNameSidebar) {
        userNameSidebar.textContent = nomeCompleto;
    }

    // Atualizar saudação no dashboard ("Olá, Carlos!")
    const saudacaoDashboard = document.querySelector('main p.text-3xl, main p.text-4xl');
    if (saudacaoDashboard) {
        saudacaoDashboard.textContent = `Olá, ${primeiroNome}!`;
    }

    console.log('Usuário carregado:', {
        nome: nomeCompleto,
        primeiroNome: primeiroNome,
        cpf: cpf,
        id: id
    });
});