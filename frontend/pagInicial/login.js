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
function validateEmail() {
    const input = document.getElementById("login-email");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.value.trim() || !regex.test(input.value.trim())) {
        setError(input);
        return false;
    }
    clearError(input);
    return true;
}

function validateSenha() {
    const input = document.getElementById("login-senha");
    if (!input.value) {
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

// Validação em tempo real
document.getElementById("login-email").addEventListener('blur', validateEmail);
document.getElementById("login-email").addEventListener('input', () => clearError(document.getElementById("login-email")));

document.getElementById("login-senha").addEventListener('blur', validateSenha);
document.getElementById("login-senha").addEventListener('input', () => clearError(document.getElementById("login-senha")));

// Submissão do formulário
document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const erros = [];

    if (!validateEmail()) {
        if (!document.getElementById("login-email").value.trim()) {
            erros.push("E-mail é obrigatório.");
        } else {
            erros.push("E-mail inválido.");
        }
    }

    if (!validateSenha()) {
        erros.push("Senha é obrigatória.");
    }

    if (erros.length > 0) {
        mostrarModalErros(erros);
        return;
    }

    const email = document.getElementById("login-email").value.trim();
    const senha = document.getElementById("login-senha").value;

    const btnSubmit = document.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.innerText;
    btnSubmit.disabled = true;
    btnSubmit.innerText = "Entrando...";

    try {
        const res = await fetch("http://localhost:8080/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        if (!res.ok) {
            const erroMsg = await res.text();
            mostrarModalErros(["Credenciais inválidas. Verifique e-mail e senha."]);
            return;
        }

        const usuario = await res.json();

        localStorage.setItem("idUsuario", usuario.idUsuario);
        localStorage.setItem("nome", usuario.nome);
        localStorage.setItem("role", usuario.role);

        if (usuario.role === "MORADOR" || usuario.role === "SINDICO") {
            if (usuario.statusUsuario === "PENDENTE" || usuario.statusUsuario === "INATIVO") {
                window.location.href = "../pagInicial/pedidoPendente.html";
            } else {
                window.location.href = "../morador/completarEndereco.html";
            }
        } else {
            window.location.href = "../condominio/dashboard.html";
        }

    } catch (error) {
        console.error(error);
        mostrarModalErros(["Erro ao conectar ao servidor. Tente novamente."]);
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerText = textoOriginal;
    }
});