function setError(input) {
    input.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    input.classList.remove('border-slate-300', 'focus:border-primary', 'focus:ring-primary');
}

function clearError(input) {
    input.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    input.classList.add('border-slate-300', 'focus:border-primary', 'focus:ring-primary');
}

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

function mostrarModalErros(listaErros) {
    const modal = document.getElementById("erro-modal");
    const lista = document.getElementById("erro-list");
    const backdrop = document.getElementById("erro-modal-backdrop");
    const closeBtn = document.getElementById("erro-modal-close");

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

document.getElementById("registro-form").addEventListener("submit", function (event) {
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

    fetch("http://localhost:8080/sindico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cadastroData)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(msg => { throw new Error(msg || "Erro no servidor"); });
        }
        return response.text();
    })
    .then(() => {
        alert("Cadastro realizado com sucesso! Aguarde aprovação do administrador.");
        window.location.href = "../pagInicial/pedidoPendente.html";
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao cadastrar: " + error.message);
        btnSubmit.disabled = false;
        btnSubmit.innerText = textoOriginal;

        
        document.getElementById("reg-senha").value = "";
        document.getElementById("reg-confirmar-senha").value = "";
    });
});localStorage.clear();

document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const senha = document.getElementById("login-senha").value;

    if (!email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    try {
        const res = await fetch("http://localhost:8080/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        if (!res.ok) {
            const erro = await res.text();
            alert("Login inválido.");
            return;
        }

        const usuario = await res.json();

        localStorage.setItem("idUsuario", usuario.idUsuario);
        localStorage.setItem("nome", usuario.nome);
        localStorage.setItem("role", usuario.role);

        if (usuario.role == "MORADOR" || usuario.role == "SINDICO") {
            if (usuario.statusUsuario == "PENDENTE" || usuario.statusUsuario == "INATIVO") {
                window.location.href = "../pagInicial/pedidoPendente.html";
                return;
            }

            window.location.href = "../morador/completarEndereco.html";
        } else {
            window.location.href = "../condominio/dashboard.html";
        }

        /*
        switch (usuario.role) {
            case "MORADOR" || "SINDICO":
                window.location.href = "../pagInicial/pedidoPendente.html";
                break;
            default:
                window.location.href = "../condominio/dashboard.html";
        } */

    } catch (error) {
        alert("Erro ao conectar ao servidor.");
    }
});