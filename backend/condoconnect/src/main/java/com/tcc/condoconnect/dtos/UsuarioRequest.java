package com.tcc.condoconnect.dtos;

public record UsuarioRequest(Long id, String nome, String cpf, String senha, String email, String telefone, String codigoCondominio) {

    public void validar() {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("O nome é obrigatório.");
        }
        if (nome.length() < 4) {
            throw new IllegalArgumentException("O nome deve ter pelo menos 4 caracteres.");
        }

        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("O e-mail é obrigatório.");
        }

        String emailRegex = "^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$";
        if (!email.matches(emailRegex)) {
            throw new IllegalArgumentException("O e-mail informado é inválido.");
        }

        if (cpf == null) {
            throw new IllegalArgumentException("O CPF é obrigatório.");
        }

        String cpfLimpo = cpf.replaceAll("\\D", "");
        if (cpfLimpo.length() != 11 || !cpfLimpo.matches("\\d{11}")) {
            throw new IllegalArgumentException("O CPF deve conter 11 dígitos numéricos.");
        }

        if (cpfLimpo.chars().distinct().count() == 1) {
            throw new IllegalArgumentException("O CPF informado é inválido.");
        }

        if (telefone == null || telefone.isBlank()) {
            throw new IllegalArgumentException("O telefone é obrigatório.");
        }
        String telLimpo = telefone.replaceAll("\\D", "");
        if (!telLimpo.matches("^\\d{11}$")) {
            throw new IllegalArgumentException("O telefone deve conter DDD e 9 dígitos (ex: 75999998888).");
        }

        if (codigoCondominio == null) {
            throw new IllegalArgumentException("O código do condomínio é obrigatório.");
        }
    }

}