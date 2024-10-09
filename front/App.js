import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';

const App = () => {
  const [code, setCode] = useState(''); // Store user's code
  const [output, setOutput] = useState(''); // Store execution result
  const [correction, setCorrection] = useState(''); // Store the correction message

  const handleRunCode = async () => {
    try {
      // Sending the code to the backend for execution
      const res = await axios.post('http://localhost:3000/run-code', { code });
      setOutput(res.data.output); // Set the output of the code execution

      // Display if the code is correct or not
      if (res.data.isCorrect) {
        setCorrection('Bravo, votre code est correct !');
      } else {
        setCorrection('Votre code contient des erreurs.');
      }
    } catch (error) {
      console.error(error);
      setOutput('Erreur lors de l’exécution du code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Python: Imprimez "Hello, World!"</Text>

      {/* Code editor */}
      <MonacoEditor
        language="python"
        theme="vs-dark"
        value={code}
        options={{ selectOnLineNumbers: true }}
        onChange={(newValue) => setCode(newValue)} // Update the code state on change
        editorDidMount={(editor) => editor.focus()}
        height="200"
      />

      {/* Button to run code */}
      <Button title="Exécuter le code" onPress={handleRunCode} />

      {/* Display output */}
      <Text style={styles.outputTitle}>Résultat :</Text>
      <Text style={styles.output}>{output}</Text>

      {/* Display correction */}
      <Text style={styles.correction}>{correction}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  outputTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  output: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  correction: {
    fontSize: 16,
    color: '#e74c3c',
  },
});

export default App;
