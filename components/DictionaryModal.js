import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  FlatList,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "./Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IconButton from "./IconButton";

export default function DictionaryModal({ isVisible, onClose }) {
  const insets = useSafeAreaInsets();
  const [words, setWords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState("");
  const [hint, setHint] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedWords = await AsyncStorage.getItem("words");
        const storedCategories = await AsyncStorage.getItem("categories");
        if (storedWords) {
          const parsedWords = JSON.parse(storedWords);
          setWords(parsedWords);
          console.log("Loaded words from storage:", parsedWords);
        } else {
          console.log("No words found in storage");
        }
        if (storedCategories) {
          const parsedCategories = JSON.parse(storedCategories);
          setCategories(parsedCategories);
          if (parsedCategories.length > 0) {
            setCategory(parsedCategories[0].categoryName); // Set default category to the first in the list
          }
          console.log("Loaded categories from storage:", parsedCategories);
        } else {
          console.log("No categories found in storage");
        }
      } catch (error) {
        console.error("Failed to load data from storage:", error);
      }
    };
    if (isVisible) {
      loadData();
    }
  }, [isVisible]);

  const addWord = async () => {
    if (term && category) {
      const termExists = words.some(
        (word) => word.term.toLowerCase() === term.toLowerCase()
      );
      if (termExists) {
        setErrorMessage("Term is already in dictionary");
      } else {
        const newWord = {
          term,
          multiplier: 3,
          know: 0,
          stillLearning: 0,
          category,
          hint: hint || "No hint for this word yet.",
        };
        const updatedWords = [...words, newWord];
        setWords(updatedWords);
        try {
          await AsyncStorage.setItem("words", JSON.stringify(updatedWords));
          console.log("Added new word to storage:", newWord);
        } catch (error) {
          console.error("Failed to save new word to storage:", error);
        }
        setTerm("");
        setCategory(categories.length > 0 ? categories[0].categoryName : ""); // Reset to the first category
        setHint("");
        setErrorMessage(""); // Clear any previous error message
      }
    } else {
      console.log("Term and category are required to add a word");
    }
  };

  const removeWord = async (termToRemove) => {
    const updatedWords = words.filter((word) => word.term !== termToRemove);
    setWords(updatedWords);
    try {
      await AsyncStorage.setItem("words", JSON.stringify(updatedWords));
      console.log("Removed word from storage:", termToRemove);
    } catch (error) {
      console.error("Failed to remove word from storage:", error);
    }
  };

  const renderWordItem = ({ item }) => (
    <View style={styles.wordItem}>
      <Text style={styles.wordText}>{item.term}</Text>
      <Pressable onPress={() => removeWord(item.term)}>
        <MaterialIcons name="delete" size={24} color="red" />
      </Pressable>
    </View>
  );

  return (
    <Modal
      style={styles.modalContainer}
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View
        style={[
          styles.modalContent,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Dictionary</Text>
          <IconButton
            label="Close"
            name="X"
            backgroundColor="rgb(0, 19, 88)"
            strokeColor="#fff"
            size={32}
            onPress={onClose}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Term</Text>
          <TextInput
            style={styles.input}
            value={term}
            onChangeText={setTerm}
            placeholder="Enter term"
          />
          <Text style={styles.label}>Category</Text>
          <RNPickerSelect
            onValueChange={(itemValue) => setCategory(itemValue)}
            items={categories.map((cat, index) => ({
              key: index,
              label: cat.categoryName,
              value: cat.categoryName,
            }))}
            value={category}
            style={pickerSelectStyles}
            placeholder={{ label: "Select a category", value: null }}
          />
          <Text style={styles.label}>Hint (optional)</Text>
          <TextInput
            style={styles.input}
            value={hint}
            onChangeText={setHint}
            placeholder="Enter hint"
          />
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <Button theme="dark" onPress={addWord}>
            Add
          </Button>
          <FlatList
            data={words}
            renderItem={renderWordItem}
            keyExtractor={(item) => item.term}
            style={styles.wordList}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    height: "85%",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    elevation: 20, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.25, // For iOS shadow
    shadowRadius: 3.84, // For iOS shadow
  },
  titleContainer: {
    flex: 1,
    backgroundColor: "#001358",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 24,
  },
  formContainer: {
    flex: 7,
    flexDirection: "column",
    padding: 12,
  },
  label: {
    marginBottom: 12,
    fontSize: 16,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ddd",
    marginVertical: 12,
  },
  pickerContainerWeb: {
    marginVertical: 12,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    justifyContent: "center",
  },
  wordList: {
    marginTop: 12,
  },
  wordItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  wordText: {
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 12,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
