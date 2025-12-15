/* ==========================================================================
   1. MÁSCARAS DE INPUT
   ========================================================================== */
function maskCNPJ(input) {
    let value = input.value.replace(/\D/g, '').slice(0, 14);
    if (value.length <= 2) input.value = value;
    else if (value.length <= 5) input.value = value.replace(/(\d{2})(\d{0,3})/, '$1.$2');
    else if (value.length <= 8) input.value = value.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
    else if (value.length <= 12) input.value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
    else input.value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
}

function maskTel(input) {
    let value = input.value.replace(/\D/g, "").slice(0, 11);
    if (value.length <= 2) input.value = value.length > 0 ? `(${value}` : value;
    else if (value.length <= 6) input.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    else if (value.length <= 10) input.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    else input.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
}

function maskCEP(input) {
    let value = input.value.replace(/\D/g, '').slice(0, 8);
    if (value.length <= 5) input.value = value;
    else input.value = value.replace(/(\d{5})(\d{0,3})/, '$1-$2');
}

// Aplicar máscaras
const elCnpj = document.getElementById('reg-cnpj');
if (elCnpj) elCnpj.addEventListener('input', (e) => maskCNPJ(e.target));

const elTel = document.getElementById('reg-tel');
if (elTel) elTel.addEventListener('input', (e) => maskTel(e.target));

const elCep = document.getElementById('reg-cep');
if (elCep) elCep.addEventListener('input', (e) => maskCEP(e.target));

/* ==========================================================================
   2. FUNÇÕES VISUAIS DE ERRO
   ========================================================================== */
function setError(input, message) {
    const formGroup = input.parentElement;
    const parent = formGroup.classList.contains('relative') ? formGroup.parentElement : formGroup;

    input.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    input.classList.remove('border-slate-300', 'focus:border-green-500', 'focus:ring-green-500');
}

function clearError(input) {
    const formGroup = input.parentElement;
    const parent = formGroup.classList.contains('relative') ? formGroup.parentElement : formGroup;

    input.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    input.classList.add('border-slate-300', 'focus:border-green-500', 'focus:ring-green-500');
}

/* ==========================================================================
   3. VALIDAÇÕES INDIVIDUAIS
   ========================================================================== */
function validateNome() {
    const input = document.getElementById("reg-nome");
    if (!input.value.trim()) {
        setError(input);
        return false;
    }
    clearError(input);
    return true;
}

function validateCNPJ() {
    const input = document.getElementById("reg-cnpj");
    const cleanValue = input.value.replace(/\D/g, '');
    if (!cleanValue) {
        setError(input);
        return false;
    }
    if (cleanValue.length !== 14) {
        setError(input);
        return false;
    }
    clearError(input);
    return true;
}

function validateTelefone() {
    const input = document.getElementById("reg-tel");
    const cleanValue = input.value.replace(/\D/g, '');
    if (!cleanValue || cleanValue.length < 10) {
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
    const senha = document.getElementById("reg-senha");
    const confirmar = document.getElementById("reg-confirmar-senha");
    if (!confirmar.value || confirmar.value !== senha.value) {
        setError(confirmar);
        return false;
    }
    clearError(confirmar);
    return true;
}

function validateCEP() {
    const input = document.getElementById("reg-cep");
    const cleanValue = input.value.replace(/\D/g, '');
    if (cleanValue.length !== 8) {
        setError(input);
        return false;
    }
    clearError(input);
    return true;
}

function validateNumero() {
    const input = document.getElementById("reg-numero");
    if (!input.value.trim()) {
        setError(input);
        return false;
    }
    clearError(input);
    return true;
}

/* ==========================================================================
   4. INTEGRAÇÃO COM VIACEP
   ========================================================================== */
const ruaInput = document.getElementById("reg-rua");
const bairroInput = document.getElementById("reg-bairro");
const cidadeInput = document.getElementById("reg-cidade");
const estadoInput = document.getElementById("reg-estado");

if (ruaInput) ruaInput.readOnly = true;
if (bairroInput) bairroInput.readOnly = true;
if (cidadeInput) cidadeInput.readOnly = true;
if (estadoInput) estadoInput.readOnly = true;

async function buscarCEP(cep) {
    const inputCep = document.getElementById("reg-cep");
    clearError(inputCep);

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            setError(inputCep);
            limparEndereco();
            return;
        }

        ruaInput.value = data.logradouro || "";
        bairroInput.value = data.bairro || "";
        cidadeInput.value = data.localidade || "";
        estadoInput.value = data.uf || "";

        document.getElementById("reg-numero").focus();
    } catch (error) {
        console.error("Erro ViaCEP:", error);
        setError(inputCep);
    }
}

function limparEndereco() {
    ruaInput.value = "";
    bairroInput.value = "";
    cidadeInput.value = "";
    estadoInput.value = "";
}

const inputCepRef = document.getElementById("reg-cep");
if (inputCepRef) {
    inputCepRef.addEventListener("blur", () => {
        const cep = inputCepRef.value.replace(/\D/g, '');
        if (cep.length === 8) {
            buscarCEP(cep);
        } else {
            limparEndereco();
        }
    });
}

/* ==========================================================================
   5. MODAL DE ERROS
   ========================================================================== */
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

/* ==========================================================================
   6. VALIDAÇÃO AO SAIR DO CAMPO (feedback instantâneo)
   ========================================================================== */
const validations = [
    { id: 'reg-nome', fn: validateNome },
    { id: 'reg-cnpj', fn: validateCNPJ },
    { id: 'reg-tel', fn: validateTelefone },
    { id: 'reg-email', fn: validateEmail },
    { id: 'reg-senha', fn: validateSenha },
    { id: 'reg-confirmar-senha', fn: validateConfirmarSenha },
    { id: 'reg-cep', fn: validateCEP },
    { id: 'reg-numero', fn: validateNumero }
];

validations.forEach(({ id, fn }) => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('blur', fn);
        el.addEventListener('input', () => clearError(el));
    }
});

/* ==========================================================================
   7. ENVIO DO FORMULÁRIO
   ========================================================================== */
document.getElementById("registro-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const erros = [];

    if (!validateNome()) erros.push("Nome do condomínio é obrigatório.");
    if (!validateCNPJ()) {
        const cnpjLimpo = document.getElementById("reg-cnpj").value.replace(/\D/g, '');
        if (!cnpjLimpo) erros.push("CNPJ é obrigatório.");
        else erros.push("CNPJ deve conter 14 dígitos.");
    }
    if (!validateTelefone()) {
        const telLimpo = document.getElementById("reg-tel").value.replace(/\D/g, '');
        if (!telLimpo) erros.push("Telefone é obrigatório.");
        else erros.push("Telefone incompleto (mínimo 10 dígitos).");
    }
    if (!validateEmail()) {
        const email = document.getElementById("reg-email").value.trim();
        if (!email) erros.push("E-mail é obrigatório.");
        else erros.push("E-mail inválido.");
    }
    if (!validateSenha()) erros.push("Senha deve ter no mínimo 6 caracteres.");
    if (!validateConfirmarSenha()) {
        const confirmar = document.getElementById("reg-confirmar-senha").value;
        if (!confirmar) erros.push("Confirme a senha.");
        else erros.push("As senhas não conferem.");
    }
    if (!validateCEP()) erros.push("CEP deve conter 8 dígitos.");
    if (!validateNumero()) erros.push("Número do endereço é obrigatório.");

    if (erros.length > 0) {
        mostrarModalErros(erros);
        return;
    }

    // Todos os campos válidos → envio
    const cadastroData = {
        nome: document.getElementById("reg-nome").value.trim(),
        cnpj: document.getElementById("reg-cnpj").value.replace(/\D/g, ''),
        email: document.getElementById("reg-email").value.trim(),
        telefone: document.getElementById("reg-tel").value.replace(/\D/g, ''),
        senha: document.getElementById("reg-senha").value,
        role: "CONDOMINIO",
        endereco: {
            cep: document.getElementById("reg-cep").value.replace(/\D/g, ''),
            rua: document.getElementById("reg-rua").value.trim(),
            bairro: document.getElementById("reg-bairro").value.trim(),
            numero: document.getElementById("reg-numero").value.trim(),
            cidade: document.getElementById("reg-cidade").value.trim(),
            estado: document.getElementById("reg-estado").value.trim()
        }
    };

    const btnSubmit = document.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.innerText;
    btnSubmit.disabled = true;
    btnSubmit.innerText = "Registrando...";

    fetch("http://localhost:8080/condominio", {
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
        alert("Cadastro realizado com sucesso! Redirecionando para login...");
        setTimeout(() => {
            window.location.href = "../pagInicial/login.html";
        }, 1000);
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao cadastrar: " + error.message);
        btnSubmit.disabled = false;
        btnSubmit.innerText = textoOriginal;

        document.getElementById("reg-senha").value = "";
        document.getElementById("reg-confirmar-senha").value = "";
    });
});