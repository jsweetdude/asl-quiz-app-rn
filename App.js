import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Pressable,
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import SettingsModal from "./components/SettingsModal";
import Button from "./components/Button";
import IconButton from "./components/IconButton.js";
import wordList from "./assets/data.js";
import QuizWindow from "./components/QuizWindow.js";
import NavBar from "./components/NavBar.js";

export default function App() {
  const [quizOn, setQuizOn] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [quizLength, setQuizLength] = useState(20);
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(wordList.map((word) => word.category))
    );
    setCategoryList(uniqueCategories);

    const onLoadActiveCategories = [];
    uniqueCategories.map((category) => {
      onLoadActiveCategories.push({ categoryName: category, active: true });
    });
    console.log(onLoadActiveCategories);

    setActiveCategories(onLoadActiveCategories);
  }, []);

  if (Platform.OS === "web") {
    document.title = "ASL Quiz App";
  }

  const startQuiz = () => {
    setQuizOn(true);
  };

  const endQuiz = () => {
    setQuizOn(false);
  };

  const updateQuizLength = (updatedLength) => {
    setQuizLength(updatedLength);
    closeSettingsModal();
  };

  const updateActiveCategories = (updatedActiveCategories) => {
    setActiveCategories(updatedActiveCategories);
  };

  const showSettingsModal = () => {
    setShowSettings(true);
  };
  const closeSettingsModal = () => {
    setShowSettings(false);
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#386dc2" }}>
      <SafeAreaView style={styles.container}>
        <SettingsModal
          isVisible={showSettings}
          updateQuizLength={updateQuizLength}
          updateCategories={updateActiveCategories}
          quizLength={quizLength}
          categories={categoryList}
          activeCategories={activeCategories}
          onClose={closeSettingsModal}
        />

        <NavBar showModal={showSettingsModal}></NavBar>

        {quizOn ? (
          <QuizWindow
            quizLength={quizLength}
            exitQuiz={() => setQuizOn(false)}
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
  iconButton: {
    marginHorizontal: 42,
  },
  textStyle: {
    color: "#000",
  },
});
