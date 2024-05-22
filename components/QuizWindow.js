import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, Alert, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import IconButton from "./IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QuizWindow({
  words,
  categories,
  quizLength,
  exitQuiz,
}) {
  const [quizSetArray, setQuizSetArray] = useState([]);
  const [quizWord, setQuizWord] = useState(null);
  const [filteredWordListArray, setFilteredWordListArray] = useState([]);

  let questionNum = useRef(-1);

  useEffect(() => {
    const activeCategoryNames = new Set(
      categories
        .filter((category) => category.active)
        .map((category) => category.categoryName)
    );

    // Filter the words data to include only words from active categories
    const filteredWordList = words.filter((word) =>
      activeCategoryNames.has(word.category)
    );

    setFilteredWordListArray(filteredWordList);

    if (filteredWordList.length === 0) {
      setQuizWord("No words available");
      return;
    }

    let tempRandomWordIndex = [];
    filteredWordList.forEach((word, index) => {
      for (let i = 0; i < word.multiplier; i++) {
        tempRandomWordIndex.push(index);
      }
    });
    tempRandomWordIndex.sort(() => 0.5 - Math.random());
    setQuizSetArray(tempRandomWordIndex);
    questionNum.current = 0;
    if (tempRandomWordIndex.length > 0) {
      setQuizWord(
        filteredWordList[tempRandomWordIndex[questionNum.current]].term
      );
    }
  }, [categories]);

  const getNextWord = () => {
    questionNum.current = questionNum.current + 1;
    if (
      questionNum.current < quizLength &&
      questionNum.current < quizSetArray.length
    ) {
      setQuizWord(
        filteredWordListArray[quizSetArray[questionNum.current]].term
      );
    } else {
      alert("You rock!");
      exitQuiz();
    }
  };

  const saveWordsToStorage = async (updatedWords) => {
    try {
      await AsyncStorage.setItem("words", JSON.stringify(updatedWords));
    } catch (error) {
      console.error("Failed to save updated data.", error);
    }
  };

  const adjustFrequency = (direction) => {
    let thisWordMultiplier = -1;
    const updatedWords = words.map((word) => {
      if (word.term === quizWord) {
        word.multiplier =
          direction === "up" ? word.multiplier + 1 : word.multiplier - 1;
        thisWordMultiplier = word.multiplier;
      }
      return word;
    });
    if (thisWordMultiplier === 0) {
      console.log("WARNING");

      // This isn't creating an alert
      createWarningAlert();
    }
    console.log(updatedWords);
    saveWordsToStorage(updatedWords);
  };

  const createWarningAlert = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  return (
    <View style={styles.quizContainer}>
      <View style={styles.exitContainer}>
        <Pressable onPress={exitQuiz}>
          <MaterialIcons name="close" size={32} color="#001358" />
        </Pressable>
      </View>

      <View style={styles.quizWord}>
        <Text style={styles.quizWordTextStyle}>{quizWord}</Text>
      </View>

      <View style={styles.controlsContainer}>
        <View style={styles.controlsTopRow}>
          <IconButton
            btnType="icon-only circle"
            label="Increase Frequency"
            icon="plus"
            size={24}
            onPress={() => {
              adjustFrequency("up");
            }}
          />
        </View>

        <View style={styles.controlsMidRow}>
          <IconButton
            btnType="icon-only circle"
            label="Previous Word"
            icon="step-backward"
            size={44}
          />

          <IconButton
            btnType="icon-only circle"
            label="Hint"
            icon="lightbulb-o"
            size={44}
          />

          <IconButton
            btnType="icon-only circle"
            label="Next Word"
            icon="forward"
            size={44}
            onPress={getNextWord}
          />
        </View>

        <View style={styles.controlsBottomRow}>
          <IconButton
            btnType="icon-only circle"
            label="Decrease Frequency"
            icon="minus"
            size={24}
            onPress={() => {
              adjustFrequency("down");
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quizContainer: {
    flex: 7,
    width: "100%",
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
    alignItems: "center",
  },
  quizWordTextStyle: {
    color: "#000",
    fontSize: 32,
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
});
