import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View, SafeAreaView } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
// import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SettingsModal from "./components/SettingsModal";
// import Button from "./components/Button";
import defaultWordData from "./assets/data.js";
import QuizWindow from "./components/QuizWindow.js";
import NavBar from "./components/NavBar.js";
import { config } from "@gluestack-ui/config";
import { StyledProvider } from "@gluestack-style/react";
import { Box, Button, ButtonText } from "@gluestack-ui/themed";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DictionaryModal from "./components/DictionaryModal.js";

export default function App() {
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isDictionaryModalVisible, setIsDictionaryModalVisible] =
    useState(false);
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

  const openDictionaryModal = () => {
    setIsDictionaryModalVisible(true);
  };

  const closeDictionaryModal = () => {
    setIsDictionaryModalVisible(false);
  };

  if (Platform.OS === "web") {
    document.title = "ASL Quiz App";
  }

  const emptyLocalStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Local storage cleared successfully");
    } catch (e) {
      console.log("Failed to remove data", e);
    }
  };
  const printLocalStorage = async () => {
    try {
      const stored = await AsyncStorage.getItem("words");
      console.log(stored);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ backgroundColor: "#386dc2" }}>
        <StyledProvider config={config}>
          <SafeAreaView style={styles.container}>
            <SettingsModal
              isVisible={isSettingsModalVisible}
              saveSettings={saveSettings}
              quizLength={quizLength}
              categories={categories}
              onClose={closeSettingsModal}
            />
            <DictionaryModal
              isVisible={isDictionaryModalVisible}
              onClose={closeDictionaryModal}
            />

            {!isQuizActive && (
              <NavBar
                showSettings={openSettingsModal}
                showDictionary={openDictionaryModal}
              />
            )}

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
                <Text style={styles.textStyleMargin}>
                  Want to start the quiz?
                </Text>
                <Button size="lg" bg="rgb(0, 19, 88)" onPress={startQuiz}>
                  <ButtonText>Start Quiz</ButtonText>
                </Button>

                {/*
                <Button theme="light" onPress={emptyLocalStorage}>
                  Empty Local Storage
                </Button>
                <Button theme="light" onPress={printLocalStorage}>
                  Print Local Storage to Console
                </Button>
            */}
              </View>
            )}

            <StatusBar style="auto" />
          </SafeAreaView>
        </StyledProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
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
  textStyleMargin: {
    color: "#000",
    marginBottom: 42,
  },
});

/* Next Steps /*

// Tasks
* Set up more official "Quiz End"
* Increase touch targets on iOS
* Add button press effect, so you know when you've tapped a button
* Remove ("x+1/y") when finish the quiz

    /* Post MVP /*

Swipe gestures - e.g., Quizlet ("Know" vs "Still Learning")
Clean quiz interface (eg Quizlet) - show word
Separate screen to view words list, success rate, multiplier, #quizzes completed, #words completed, etc.
Ability to edit and organize categories
Ability to add words/categories
Ability to adjust multipliers, etc.
Accounts for multi-platform access


*/
