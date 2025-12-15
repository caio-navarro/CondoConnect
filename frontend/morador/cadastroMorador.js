function limparCampos() {
    document.getElementById("reg-nome").value = "";
    document.getElementById("reg-cpf").value = "";
    document.getElementById("reg-email").value = "";
    document.getElementById("reg-tel").value = "";
    document.getElementById("reg-senha").value = "";
    document.getElementById("codigo-cond").value = "";
    document.getElementById("reg-confirmar-senha").value = "";
}

// cadastro
document.getElementById("registro-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("reg-nome").value.trim();
    const cpf = document.getElementById("reg-cpf").value.replace(/\D/g, '');
    const email = document.getElementById("reg-email").value.trim();
    const telefone = document.getElementById("reg-tel").value.replace(/\D/g, '');
    const senha = document.getElementById("reg-senha").value;
    const confirmarSenha = document.getElementById("reg-confirmar-senha").value;
    const codigoCondominio = document.getElementById("codigo-cond").value;

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
        cpf,
        email,
        telefone,
        senha,
        codigoCondominio
    };

    fetch("http://localhost:8080/morador", {
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
            console.log("Morador cadastrado:", msg);
            alert("Cadastro realizado com sucesso!");
            window.location.href = "../pagInicial/pedidoPendente.html";
        })
        .catch(error => {
            console.error("Erro ao cadastrar morador:", error.message);
            alert("Erro: " + error.message);
            limparCampos();
        });
});
