// src/components/TextInputField/index.js
import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // ícones (precisa instalar expo/vector-icons ou react-native-vector-icons)

export default function TextInputField({
    label,
    placeholder,
    value,
    onChangeText,
    secure = false, // para senha
}) {
    const [isSecure, setIsSecure] = useState(secure);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={isSecure}
                    autoCapitalize="none"
                />
                {secure && (
                    <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                        <Ionicons
                            name={isSecure ? "eye-off" : "eye"}
                            size={20}
                            color="#555"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: "100%",
    },
    label: {
        marginBottom: 5,
        fontWeight: "bold",
        color: "#333",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    input: {
        flex: 1,
        height: 45,
        color: "#333",
    },
});
