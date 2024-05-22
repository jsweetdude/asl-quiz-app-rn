import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View, SafeAreaView } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SettingsModal from "./components/SettingsModal";
import Button from "./components/Button";
import defaultWordData from "./assets/data.js";
import QuizWindow from "./components/QuizWindow.js";
import NavBar from "./components/NavBar.js";

export default function App() {
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [words, setWords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [quizLength, setQuizLength] = useState(20);

  useEffect(() => {
    // Check if data is stored on device
    // If not, use defaultWordData to create 'categories' state, and then save this default data to device
    // If so, create 'words' from "words", 'categories' from "categories", and 'quizLength' from "quiz_length"
    const initializeData = async () => {
      try {
        const storedWordList = await loadDeviceWordList();

        // No device storage.
        if (!storedWordList) {
          // Save words to state
          setWords(defaultWordData);

          // Create default categories data:
          // Get unique categories from defaultWordData
          const uniqueCategories = Array.from(
            new Set(defaultWordData.map((word) => word.category))
          );

          // Build array of objects, with all categories set to 'active'
          const categories = uniqueCategories.map((category) => ({
            categoryName: category,
            active: true,
          }));
          // Save categories to state
          setCategories(categories);

          // Save words, categories, and quiz length to local device
          saveToDevice(defaultWordData, categories, quizLength);

          // Data stored on device.
        } else {
          // Retrieve words, categories, and quiz length from local device
          const deviceWords = await AsyncStorage.getItem("words");
          const deviceCategories = await AsyncStorage.getItem("categories");
          const deviceQuizLength = await AsyncStorage.getItem("quiz_length");

          // Save words, categories, and quiz length to state
          setWords(JSON.parse(deviceWords));
          setCategories(JSON.parse(deviceCategories));
          setQuizLength(JSON.parse(deviceQuizLength));
        }
      } catch (error) {
        console.error("Failed to initialize data", error);
      }
    };

    initializeData();
  }, []);

  // Pull the initial words data from local device
  // only used on app initialization, to check for device-stored data
  const loadDeviceWordList = async () => {
    try {
      const stored = await AsyncStorage.getItem("words");
      return stored;
    } catch (error) {
      return null;
    }
  };

  // Save all relevant variables to local device
  const saveToDevice = async (
    updatedWords,
    updatedCategories,
    updatedQuizLength
  ) => {
    try {
      if (updatedWords)
        await AsyncStorage.setItem("words", JSON.stringify(updatedWords));
      if (updatedCategories)
        await AsyncStorage.setItem(
          "categories",
          JSON.stringify(updatedCategories)
        );
      await AsyncStorage.setItem(
        "quiz_length",
        JSON.stringify(updatedQuizLength)
      );
    } catch (error) {
      console.error("Failed to save updated data.", error);
    }
  };

  // Settings Modal - Save data when user closes Settings modal by hitting 'Save'
  const saveSettings = (updatedCategories, updatedQuizLength) => {
    setCategories(updatedCategories);
    setQuizLength(updatedQuizLength);
    saveToDevice(undefined, updatedCategories, updatedQuizLength);
    closeSettingsModal();
  };

  const startQuiz = () => {
    setIsQuizActive(true);
  };

  const endQuiz = () => {
    setIsQuizActive(false);
  };

  const openSettingsModal = () => {
    setIsSettingsModalVisible(true);
  };

  const closeSettingsModal = () => {
    setIsSettingsModalVisible(false);
  };

  if (Platform.OS === "web") {
    document.title = "ASL Quiz App";
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: "#386dc2" }}>
      <SafeAreaView style={styles.container}>
        <SettingsModal
          isVisible={isSettingsModalVisible}
          saveSettings={saveSettings}
          quizLength={quizLength}
          categories={categories}
          onClose={closeSettingsModal}
        />

        <NavBar showModal={openSettingsModal} isQuizActive={isQuizActive} />

        {isQuizActive ? (
          <QuizWindow
            quizLength={quizLength}
            exitQuiz={() => setIsQuizActive(false)}
            categories={categories}
            words={words}
          />
        ) : (
          <View style={styles.homeContainer}>
            <Text style={styles.textStyle}>Hey beautiful!</Text>
            <Text style={styles.textStyle}>Want to start the quiz?</Text>
            <Button theme="dark" onPress={startQuiz}>
              Start Quiz
            </Button>
          </View>
        )}

        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    alignContent: "center",
  },
  homeContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "#000",
  },
});

/* Next Steps /*

Hook up +/- buttons to multiplier, connect to local storage
 - include removal of word after '-' pressed enough times
Hook up Back button, prevent from going before 0
Hook up Hint button, give user option to create hints, connect to local storage
Set up quiz End animation/etc.

    /* Post MVP /*

Separate screen to view words list, success rate, multiplier, #quizzes completed, #words completed, etc.
Ability to edit and organize categories
Ability to add words/categories


*/
