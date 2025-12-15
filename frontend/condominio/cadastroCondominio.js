function limparCampos() {
    document.getElementById("reg-nome").value = "";
    document.getElementById("reg-cnpj").value = "";
    document.getElementById("reg-email").value = "";
    document.getElementById("reg-tel").value = "";
    document.getElementById("reg-senha").value = "";
    document.getElementById("reg-confirmar-senha").value = "";
}

// cadastro
document.getElementById("registro-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("reg-nome").value.trim();
    const cnpj = document.getElementById("reg-cnpj").value.replace(/\D/g, '');
    const email = document.getElementById("reg-email").value.trim();
    const telefone = document.getElementById("reg-tel").value.replace(/\D/g, '');
    const senha = document.getElementById("reg-senha").value;
    const confirmarSenha = document.getElementById("reg-confirmar-senha").value;
    const role = "CONDOMINIO";

    const cep = document.getElementById("reg-cep").value.replace(/\D/g, '');
    const rua = document.getElementById("reg-rua").value.trim();
    const bairro = document.getElementById("reg-bairro").value.trim();
    const numero = document.getElementById("reg-numero").value.trim();
    const cidade = document.getElementById("reg-cidade").value.trim();
    const estado = document.getElementById("reg-estado").value.trim();

    if (telefone.length !== 11) {
        alert("O telefone precisa ter 11 dígitos!");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    const cadastroData = {
        nome,
        cnpj,
        email,
        telefone,
        senha,
        role,
        endereco: {
            cep,
            rua,
            bairro,
            numero,
            cidade,
            estado
        }
    };

    fetch("http://localhost:8080/condominio", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cadastroData)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(msg => { throw new Error(msg); });
            }
            return response.text();
        })
        .then(msg => {
            console.log("Condominio cadastrado:", msg);
            alert("Cadastro realizado com sucesso!");
            window.location.href = "../pagInicial/login.html";
        })
        .catch(error => {
            console.error("Erro ao cadastrar cliente:", error.message);
            alert("Erro: " + error.message);
            limparCampos();
        });
});

// Seleciona os campos
const cepInput = document.getElementById("reg-cep");
const ruaInput = document.getElementById("reg-rua");
const bairroInput = document.getElementById("reg-bairro");
const cidadeInput = document.getElementById("reg-cidade");
const estadoInput = document.getElementById("reg-estado");

// Define os campos como somente leitura
ruaInput.readOnly = true;
bairroInput.readOnly = true;
cidadeInput.readOnly = true;
estadoInput.readOnly = true;

// Função para buscar CEP
async function buscarCEP(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            alert("CEP não encontrado!");
            ruaInput.value = "";
            bairroInput.value = "";
            cidadeInput.value = "";
            estadoInput.value = "";
            return;
        }

        ruaInput.value = data.logradouro;
        bairroInput.value = data.bairro;
        cidadeInput.value = data.localidade;
        estadoInput.value = data.uf;

    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        alert("Erro ao buscar CEP. Tente novamente.");
    }
}

// Evento de input do CEP
cepInput.addEventListener("blur", () => {
    const cep = cepInput.value.replace(/\D/g, ''); // remove caracteres não numéricos
    if (cep.length === 8) {
        buscarCEP(cep);
    } else {
        ruaInput.value = "";
        bairroInput.value = "";
        cidadeInput.value = "";
        estadoInput.value = "";
    }
});
