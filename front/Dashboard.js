import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Dashboard = ({ navigation }) => {
  const handleChoice = (language) => {
    console.log('langage', language.toLowerCase())
    navigation.navigate("Compiler", { language });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez votre langage préféré</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice("PHP")}
      >
        <Text style={styles.buttonText}>PHP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice("JavaScript")}
      >
        <Text style={styles.buttonText}>JavaScript</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice("Python")}
      >
        <Text style={styles.buttonText}>Python</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
export default Dashboard;
