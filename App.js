import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Pressable,
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
import CircleButton from "./components/CircleButton";
import BorderlessButton from "./components/BorderlessButton";
import wordList from "./assets/data.js";

export default function App() {
  const [quizOn, setQuizOn] = useState(false);
  const [headerFlex, setHeaderFlex] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [quizLength, setQuizLength] = useState(20);
  const [quizTerm, setQuizTerm] = useState(null);
  const [quizTermNum, setQuizTermNum] = useState(0);
  const [quizSetArray, setQuizSetArray] = useState([]);

  useEffect(() => {
    let tempQuizSetArray = [];
    wordList.forEach((word, index) => {
      for (let i = 0; i < word.multiplier; i++) {
        tempQuizSetArray.push(index);
      }
    });
    tempQuizSetArray.sort(() => 0.5 - Math.random());
    setQuizSetArray(tempQuizSetArray);
    // Ensure we fetch the first word only when quiz is actually started
    if (quizOn) {
      getNextWord(0, tempQuizSetArray); // Pass initial index explicitly
    }
  }, [quizOn]); // Effect depends on quizOn to reinitialize when quiz starts

  const startQuiz = () => {
    setQuizOn(true);
    setHeaderFlex(2);
  };

  const getNextWord = (
    currentQuizTermNum = quizTermNum,
    currentQuizSetArray = quizSetArray
  ) => {
    if (currentQuizTermNum < currentQuizSetArray.length) {
      const indexOfWord = currentQuizSetArray[currentQuizTermNum];
      const word = wordList[indexOfWord];
      if (word) {
        setQuizTerm(word.term);
        setQuizTermNum(currentQuizTermNum + 1);
      } else {
        console.error("No word at index:", indexOfWord);
      }
    } else {
      console.error(
        "Index out of bounds:",
        currentQuizTermNum,
        currentQuizSetArray.length
      );
      // Optionally reset quiz or handle end of quiz
    }
  };

  const endQuiz = () => {
    setQuizOn(false);
    setHeaderFlex(1);
  };

  const changeQuizLength = (updatedLength) => {
    setQuizLength(updatedLength);
  };

  const onCloseModal = () => {
    setShowSettings(false);
  };

  // Conditional Styles
  const headerStyle = {
    ...styles.header,
    flex: headerFlex,
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#386dc2" }}>
      <SafeAreaView style={styles.container}>
        <SettingsModal
          isVisible={showSettings}
          quizLength={quizLength}
          changeQuizLength={changeQuizLength}
          onCloseModal={onCloseModal}
        />

        <View style={headerStyle}>
          <View style={styles.headerLeft}>
            <Image
              style={styles.headerLogo}
              source={require("./assets/asl-logo.png")}
            />
            <Text style={styles.headerTextStyle}>ASL Quiz App</Text>
          </View>
          <Pressable onPress={() => setShowSettings(true)}>
            <MaterialIcons name="settings" size={32} color="#fff" />
          </Pressable>
        </View>

        {quizOn ? (
          <>
            <View style={styles.exitContainer}>
              <Pressable onPress={endQuiz}>
                <MaterialIcons name="close" size={32} color="#001358" />
              </Pressable>
            </View>

            <View style={styles.quizWord}>
              <Text style={styles.quizWordextStyle}>{quizTerm}</Text>
            </View>

            <View style={styles.controlsContainer}>
              <View style={styles.controlsTopRow}>
                <BorderlessButton
                  btnType="icon-only circle"
                  label="Increase Frequency"
                  icon="plus"
                  size={24}
                />
              </View>

              <View style={styles.controlsMidRow}>
                <BorderlessButton
                  btnType="icon-only circle"
                  label="Previous Word"
                  icon="step-backward"
                  size={44}
                />

                <BorderlessButton
                  btnType="icon-only circle"
                  label="Hint"
                  icon="lightbulb-o"
                  size={44}
                />

                <BorderlessButton
                  btnType="icon-only circle"
                  label="Next Word"
                  icon="forward"
                  size={44}
                  onPress={() => getNextWord()}
                />
              </View>

              <View style={styles.controlsBottomRow}>
                <BorderlessButton
                  btnType="icon-only circle"
                  label="Decrease Frequency"
                  icon="minus"
                  size={24}
                />
              </View>
            </View>
          </>
        ) : (
          <View style={styles.startQuiz}>
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
  },
  header: {
    justifyContent: "space-between",
    backgroundColor: "#001358",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerLogo: {
    width: 65,
    height: 65,
    marginVertical: 12,
  },
  headerTextStyle: {
    color: "#fff",
    fontSize: 24,
    marginLeft: 24,
  },
  startQuiz: {
    flex: 7,
    justifyContent: "center",
    alignContent: "center",
  },
  exitContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    paddingLeft: 12,
  },
  quizWord: {
    flex: 6,
    justifyContent: "center",
  },
  quizWordextStyle: {
    color: "#000",
    fontSize: 36,
  },
  controlsContainer: {
    flex: 6,
    justifyContent: "center",
    flexDirection: "column",
  },
  controlsTopRow: {
    alignItems: "center",
  },
  controlsMidRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 56,
  },
  controlsBottomRow: {
    alignItems: "center",
  },
  iconButton: {
    marginHorizontal: 42,
  },
  textStyle: {
    color: "#000",
  },
});
