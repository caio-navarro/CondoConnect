const API_BASE_URL = 'http://localhost:8080';

let moradores = [];

document.addEventListener('DOMContentLoaded', () => {
    carregarMoradores();
});

// Função para buscar moradores pendentes
async function carregarMoradores() {
    try {
        mostrarLoading(true);

        const response = await fetch(`${API_BASE_URL}/morador/moradores-pendentes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar moradores');
        }

        moradores = await response.json();
        renderizarMoradores();

    } catch (error) {
        console.error('Erro ao carregar moradores:', error);
        mostrarMensagem('Erro ao carregar moradores. Tente novamente.', 'erro');
    } finally {
        mostrarLoading(false);
    }
}

// Função para renderizar moradores na tela
function renderizarMoradores() {
    const tabelaDesktop = document.querySelector('tbody');
    const listaMobile = document.querySelector('.grid.gap-4.lg\\:hidden');

    if (moradores.length === 0) {
        mostrarMensagemVazia(tabelaDesktop, listaMobile);
        return;
    }

    // Renderizar tabela desktop
    tabelaDesktop.innerHTML = moradores.map(morador => `
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/30" data-id="${morador.id}">
            <td class="px-6 py-4 text-sm font-medium text-[#111518] dark:text-white">
                ${morador.nome} - ${formatarCPF(morador.cpf)}
            </td>
            <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                    <button
                        onclick="recusarMorador('${morador.id}')"
                        class="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        id="btn-recusar-${morador.id}">
                        Recusar
                    </button>
                    <button
                        onclick="aprovarMorador('${morador.id}')"
                        class="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        id="btn-aprovar-${morador.id}">
                        Aprovar
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    // Renderizar lista mobile
    listaMobile.innerHTML = moradores.map(morador => `
        <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-background-dark/50" data-id="${morador.id}">
            <div class="flex flex-col gap-3">
                <div class="flex items-start justify-between">
                    <div>
                        <p class="font-bold text-[#111518] dark:text-white">${morador.nome}</p>
                        <p class="text-sm text-[#617789] dark:text-gray-400">CPF: ${formatarCPF(morador.cpf)}</p>
                        ${morador.apartamento ? `<p class="text-sm text-[#617789] dark:text-gray-400">Apto: ${morador.apartamento}</p>` : ''}
                    </div>
                </div>
            </div>
            <div class="mt-4 flex gap-3 border-t border-gray-200 pt-4 dark:border-gray-800">
                <button
                    onclick="recusarMorador('${morador.id}')"
                    class="flex-1 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    id="btn-recusar-mobile-${morador.id}">
                    Recusar
                </button>
                <button
                    onclick="aprovarMorador('${morador.id}')"
                    class="flex-1 rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    id="btn-aprovar-mobile-${morador.id}">
                    Aprovar
                </button>
            </div>
        </div>
    `).join('');
}

// Função para aprovar morador
async function aprovarMorador(moradorId) {
    if (!confirm('Tem certeza que deseja aprovar este morador?')) {
        return;
    }

    try {
        desabilitarBotoes(moradorId, true);

        const response = await fetch(`${API_BASE_URL}/morador/${moradorId}/aprovar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Adicione token de autenticação se necessário
                // 'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                status: 'aprovado'
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao aprovar morador');
        }

        const resultado = await response.json();

        mostrarMensagem('Morador aprovado com sucesso!', 'sucesso');
        removerMoradorDaLista(moradorId);

    } catch (error) {
        console.error('Erro ao aprovar morador:', error);
        mostrarMensagem('Erro ao aprovar morador. Tente novamente.', 'erro');
        desabilitarBotoes(moradorId, false);
    }
}

// Função para recusar morador
async function recusarMorador(moradorId) {
    if (!confirm('Tem certeza que deseja recusar este morador?')) {
        return;
    }

    try {
        desabilitarBotoes(moradorId, true);

        const response = await fetch(`${API_BASE_URL}/morador/${moradorId}/recusar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Adicione token de autenticação se necessário
                // 'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                status: 'recusado'
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao recusar morador');
        }

        const resultado = await response.json();

        mostrarMensagem('Morador recusado.', 'info');
        removerMoradorDaLista(moradorId);

    } catch (error) {
        console.error('Erro ao recusar morador:', error);
        mostrarMensagem('Erro ao recusar morador. Tente novamente.', 'erro');
        desabilitarBotoes(moradorId, false);
    }
}

// Função para remover morador da lista após aprovação/recusa
function removerMoradorDaLista(moradorId) {
    moradores = moradores.filter(m => m.id !== moradorId);

    // Remover da DOM com animação
    const elementosDesktop = document.querySelector(`tbody tr[data-id="${moradorId}"]`);
    const elementosMobile = document.querySelector(`.grid.gap-4.lg\\:hidden > div[data-id="${moradorId}"]`);

    if (elementosDesktop) {
        elementosDesktop.style.opacity = '0';
        elementosDesktop.style.transform = 'translateX(-20px)';
        elementosDesktop.style.transition = 'all 0.3s ease';
        setTimeout(() => elementosDesktop.remove(), 300);
    }

    if (elementosMobile) {
        elementosMobile.style.opacity = '0';
        elementosMobile.style.transform = 'translateX(-20px)';
        elementosMobile.style.transition = 'all 0.3s ease';
        setTimeout(() => elementosMobile.remove(), 300);
    }

    // Verificar se não há mais moradores pendentes
    if (moradores.length === 0) {
        setTimeout(() => {
            const tabelaDesktop = document.querySelector('tbody');
            const listaMobile = document.querySelector('.grid.gap-4.lg\\:hidden');
            mostrarMensagemVazia(tabelaDesktop, listaMobile);
        }, 300);
    }
}

// Função para desabilitar botões durante requisição
function desabilitarBotoes(moradorId, desabilitar) {
    const botoesDesktop = [
        document.getElementById(`btn-aprovar-${moradorId}`),
        document.getElementById(`btn-recusar-${moradorId}`)
    ];

    const botoesMobile = [
        document.getElementById(`btn-aprovar-mobile-${moradorId}`),
        document.getElementById(`btn-recusar-mobile-${moradorId}`)
    ];

    [...botoesDesktop, ...botoesMobile].forEach(btn => {
        if (btn) {
            btn.disabled = desabilitar;
            if (desabilitar) {
                btn.innerHTML = '<span class="animate-spin">⏳</span>';
            }
        }
    });
}

// Função para formatar CPF
function formatarCPF(cpf) {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Função para mostrar mensagem vazia
function mostrarMensagemVazia(tabelaDesktop, listaMobile) {
    const mensagemHTML = `
        <div class="flex flex-col items-center justify-center py-12">
            <span class="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">
                check_circle
            </span>
            <p class="text-lg font-medium text-[#617789] dark:text-gray-400">
                Nenhuma solicitação pendente
            </p>
            <p class="text-sm text-[#617789] dark:text-gray-400 mt-2">
                Todas as solicitações foram processadas
            </p>
        </div>
    `;

    if (tabelaDesktop) {
        tabelaDesktop.innerHTML = `<tr><td colspan="2">${mensagemHTML}</td></tr>`;
    }
    if (listaMobile) {
        listaMobile.innerHTML = mensagemHTML;
    }
}

// Função para mostrar loading
function mostrarLoading(show) {
    const loadingHTML = `
        <div id="loading-overlay" class="fixed inset-0 bg-black/20 dark:bg-black/40 z-50 flex items-center justify-center">
            <div class="bg-white dark:bg-background-dark rounded-lg p-6 shadow-xl">
                <div class="flex items-center gap-3">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span class="text-[#111518] dark:text-white font-medium">Carregando...</span>
                </div>
            </div>
        </div>
    `;

    const existingLoading = document.getElementById('loading-overlay');

    if (show && !existingLoading) {
        document.body.insertAdjacentHTML('beforeend', loadingHTML);
    } else if (!show && existingLoading) {
        existingLoading.remove();
    }
}

// Função para mostrar mensagens de feedback
function mostrarMensagem(mensagem, tipo = 'info') {
    const cores = {
        sucesso: 'bg-green-500',
        erro: 'bg-red-500',
        info: 'bg-blue-500',
        aviso: 'bg-yellow-500'
    };

    const icones = {
        sucesso: 'check_circle',
        erro: 'error',
        info: 'info',
        aviso: 'warning'
    };

    const mensagemHTML = `
        <div id="toast-message" class="fixed top-4 right-4 z-50 ${cores[tipo]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in">
            <span class="material-symbols-outlined">${icones[tipo]}</span>
            <span class="font-medium">${mensagem}</span>
            <button onclick="document.getElementById('toast-message').remove()" class="ml-4">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
    `;

    // Remover mensagem anterior se existir
    const mensagemAnterior = document.getElementById('toast-message');
    if (mensagemAnterior) {
        mensagemAnterior.remove();
    }

    document.body.insertAdjacentHTML('beforeend', mensagemHTML);

    // Auto-remover após 5 segundos
    setTimeout(() => {
        const toast = document.getElementById('toast-message');
        if (toast) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

// Adicionar CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    .animate-fade-in {
        animation: fade-in 0.3s ease;
    }
`;
document.head.appendChild(style);