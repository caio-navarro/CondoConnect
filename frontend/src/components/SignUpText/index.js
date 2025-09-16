// src/components/SignUpText/index.js
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SignUpText({ onPress }) {
    return (
        <Text style={styles.text}>
            Não tem uma conta?{" "}
            <Text style={styles.link} onPress={onPress}>
                Cadastre-se
            </Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: "#333",
        textAlign: "center",
        marginTop: 10,
    },
    link: {
        color: "#007bff",
        fontWeight: "bold",
    },
});
