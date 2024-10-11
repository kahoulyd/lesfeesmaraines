import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import MonacoEditor from "react-monaco-editor";
import axios from "axios";

const Compiler = ({ route }) => {
  const { language } = route.params;


  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [correction, setCorrection] = useState("");

  const handleRunCodePY = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/run-code-${language.toLowerCase()}`, {
        code,
      });
      setOutput(res.data.output);

      if (res.data.isCorrect) {
        setCorrection("Bravo, votre code est correct !");
      } else {
        setCorrection("Votre code contient des erreurs.");
      }
    } catch (error) {
      console.error(error);
      setOutput("Erreur lors de l’exécution du code.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test {language}: Imprimez "Hello, World!"</Text>

      {}
      <MonacoEditor
        language={language}
        theme="vs-dark"
        value={code}
        options={{ selectOnLineNumbers: true }}
        onChange={(newValue) => setCode(newValue)}
        editorDidMount={(editor) => editor.focus()}
        height="200"
      />

      {}
      <Button title="Exécuter le code" onPress={handleRunCodePY} />

      {}
      <Text style={styles.outputTitle}>Résultat :</Text>
      <Text style={styles.output}>{output}</Text>

      {}
      <Text style={styles.correction}>{correction}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  outputTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  output: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  correction: {
    fontSize: 16,
    color: "#e74c3c",
  },
});

export default Compiler;
