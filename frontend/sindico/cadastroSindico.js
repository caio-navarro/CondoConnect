// Funções de estilo de erro
function setError(input) {
    input.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    input.classList.remove('border-slate-300', 'focus:border-primary', 'focus:ring-primary');
}

function clearError(input) {
    input.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    input.classList.add('border-slate-300', 'focus:border-primary', 'focus:ring-primary');
}

// Validações individuais
function validateNome() {
    const input = document.getElementById("reg-nome");
    if (!input.value.trim()) {
        setError(input);
        return false;
    }
    clearError(input);
    return true;
}

function validateEmail() {
    const input = document.getElementById("reg-email");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.value.trim() || !regex.test(input.value.trim())) {
        setError(input);
        return false;
    }
    clearError(input);
    return true;
}

function validateCPF() {
    const input = document.getElementById("reg-cpf");
    const cpf = input.value.replace(/\D/g, '');
    if (cpf.length !== 11) {
        setError(input);
        return false;
    }
    clearError(input);
    return true;
}

function validateTelefone() {
    const input = document.getElementById("reg-tel");
    const tel = input.value.replace(/\D/g, '');
    if (tel.length !== 11) {
        setError(input);
        return false;
    }
    clearError(input);
    return true;
}

function validateSenha() {
    const input = document.getElementById("reg-senha");
    if (input.value.length < 6) {
        setError(input);
        return false;
    }
    clearError(input);
    return true;
}

function validateConfirmarSenha() {
    const senha = document.getElementById("reg-senha").value;
    const confirmar = document.getElementById("reg-confirmar-senha");
    if (confirmar.value !== senha || !confirmar.value) {
        setError(confirmar);
        return false;
    }
    clearError(confirmar);
    return true;
}

function validateCodigoCondominio() {
    const input = document.getElementById("codigo-cond");
    if (!input.value.trim()) {
        setError(input);
        return false;
    }
    clearError(input);
    return true;
}

// Modal de erros
function mostrarModalErros(listaErros) {
    const modal = document.getElementById("erro-modal");
    const lista = document.getElementById("erro-list");
    const backdrop = document.getElementById("erro-modal-backdrop");
    const closeBtn = document.getElementById("erro-modal-close");

    if (!modal || !lista || !backdrop || !closeBtn) {
        console.warn("Modal de erros não encontrado.");
        return;
    }

    lista.innerHTML = "";
    listaErros.forEach(erro => {
        const li = document.createElement("li");
        li.textContent = erro;
        lista.appendChild(li);
    });

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    const fecharModal = () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    };

    closeBtn.onclick = fecharModal;
    backdrop.onclick = fecharModal;
}

// Adiciona validação em tempo real
const validations = [
    { id: 'reg-nome', fn: validateNome },
    { id: 'reg-email', fn: validateEmail },
    { id: 'reg-cpf', fn: validateCPF },
    { id: 'reg-tel', fn: validateTelefone },
    { id: 'reg-senha', fn: validateSenha },
    { id: 'reg-confirmar-senha', fn: validateConfirmarSenha },
    { id: 'codigo-cond', fn: validateCodigoCondominio }
];

validations.forEach(({ id, fn }) => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('blur', fn);
        el.addEventListener('input', () => clearError(el));
    }
});

// Submissão do formulário
document.getElementById("registro-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const erros = [];

    if (!validateNome()) erros.push("Nome completo é obrigatório.");
    if (!validateEmail()) {
        const email = document.getElementById("reg-email").value.trim();
        if (!email) erros.push("E-mail é obrigatório.");
        else erros.push("E-mail inválido.");
    }
    if (!validateCPF()) erros.push("CPF deve conter 11 dígitos.");
    if (!validateTelefone()) erros.push("Telefone deve conter 11 dígitos (com DDD).");
    if (!validateSenha()) erros.push("Senha deve ter no mínimo 6 caracteres.");
    if (!validateConfirmarSenha()) {
        const confirmar = document.getElementById("reg-confirmar-senha").value;
        if (!confirmar) erros.push("Confirme a senha.");
        else erros.push("As senhas não coincidem.");
    }
    if (!validateCodigoCondominio()) erros.push("Código do condomínio é obrigatório.");

    if (erros.length > 0) {
        mostrarModalErros(erros);
        return;
    }

    const cadastroData = {
        nome: document.getElementById("reg-nome").value.trim(),
        cpf: document.getElementById("reg-cpf").value.replace(/\D/g, ''),
        email: document.getElementById("reg-email").value.trim(),
        telefone: document.getElementById("reg-tel").value.replace(/\D/g, ''),
        senha: document.getElementById("reg-senha").value,
        codigoCondominio: document.getElementById("codigo-cond").value.trim()
    };

    const btnSubmit = document.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.innerText;
    btnSubmit.disabled = true;
    btnSubmit.innerText = "Registrando...";

    try {
        const response = await fetch("http://localhost:8080/sindico", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cadastroData)
        });

        if (!response.ok) {
            const erroMsg = await response.text();
            throw new Error(erroMsg || "Erro ao cadastrar síndico.");
        }

        // Sucesso
        mostrarModalErros(["Cadastro realizado com sucesso! Aguarde aprovação do administrador."], true);
        setTimeout(() => {
            window.location.href = "../pagInicial/pedidoPendente.html";
        }, 2000); // Delay para ver a mensagem de sucesso

    } catch (error) {
        console.error("Erro:", error);
        mostrarModalErros(["Erro ao cadastrar: " + error.message]);

        btnSubmit.disabled = false;
        btnSubmit.innerText = textoOriginal;

        // Limpa senhas em caso de erro
        document.getElementById("reg-senha").value = "";
        document.getElementById("reg-confirmar-senha").value = "";
    }
});