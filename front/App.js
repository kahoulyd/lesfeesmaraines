import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import MonacoEditor from "react-monaco-editor";
import axios from "axios";

const App = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [correction, setCorrection] = useState("");

  const [codeJS, setCodeJS] = useState("");
  const [outputJS, setOutputJS] = useState("");
  const [correctionJS, setCorrectionJS] = useState("");

  const [codePHP, setCodePHP] = useState("");
  const [outputPHP, setOutputPHP] = useState("");
  const [correctionPHP, setCorrectionPHP] = useState("");

  const handleRunCodePY = async () => {
    try {
      const res = await axios.post("http://localhost:3000/run-code-py", {
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

  const handleRunCodeJS = async () => {
    try {
      const res = await axios.post("http://localhost:3000/run-code-js", {
        code: codeJS,
      });
      setOutputJS(res.data.output);

      if (res.data.isCorrect) {
        setCorrectionJS("Bravo, votre code est correct !");
      } else {
        setCorrectionJS("Votre code contient des erreurs.");
      }
    } catch (error) {
      console.error(error);
      setOutputJS("Erreur lors de l’exécution du code.");
    }
  };

  const handleRunCodePHP = async () => {
    try {
      const res = await axios.post("http://localhost:3000/run-code-php", {
        code : codePHP,
      });
      setOutputPHP(res.data.output);

      if (res.data.isCorrect) {
        setCorrectionPHP("Bravo, votre code est correct !");
      } else {
        setCorrectionPHP("Votre code contient des erreurs.");
      }
    } catch (error) {
      console.error(error);
      setOutputPHP("Erreur lors de l’exécution du code.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Python: Imprimez "Hello, World!"</Text>

      {}
      <MonacoEditor
        language="python"
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

      <Text style={styles.title}>
        Test Javascript: Imprimez "Hello, World!"
      </Text>

      {}
      <MonacoEditor
        language="javascript"
        theme="vs-dark"
        value={codeJS}
        options={{ selectOnLineNumbers: true }}
        onChange={(newValue) => setCodeJS(newValue)}
        height="200"
      />

      {}
      <Button title="Exécuter le code" onPress={handleRunCodeJS} />

      {}
      <Text style={styles.outputTitle}>Résultat :</Text>
      <Text style={styles.output}>{outputJS}</Text>

      {}
      <Text style={styles.correction}>{correctionJS}</Text>

      <Text style={styles.title}>Test PHP: Imprimez "Hello, World!"</Text>

      {}
      <MonacoEditor
        language="php"
        theme="vs-dark"
        value={codePHP}
        options={{ selectOnLineNumbers: true }}
        onChange={(newValue) => setCodePHP(newValue)}
        height="200"
      />

      {}
      <Button title="Exécuter le code" onPress={handleRunCodePHP} />

      {}
      <Text style={styles.outputTitle}>Résultat :</Text>
      <Text style={styles.output}>{outputPHP}</Text>

      {}
      <Text style={styles.correction}>{correctionPHP}</Text>
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

export default App;
