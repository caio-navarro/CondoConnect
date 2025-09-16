import React, { useState } from "react";
import { View } from "react-native";
import TextInputField from "./src/components/TextInputField";
import PrimaryButton from "./src/components/PrimaryButton";
import SignUpText from "./src/components/SignUpText";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Senha:", password);
  };

  const handleSignUp = () => {
    console.log("Redirecionar para cadastro");
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <TextInputField
        label="Email"
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInputField
        label="Senha"
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secure={true}
      />
      <PrimaryButton title="Entrar" onPress={handleLogin} />
      <SignUpText onPress={handleSignUp} />
    </View>
  );
}
