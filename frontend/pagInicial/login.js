localStorage.clear();

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