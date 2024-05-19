import React from "react";
import { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import IconButton from "./IconButton";
import wordList from "../assets/data.js";

export default function QuizWindow({ quizLength, exitQuiz }) {
  const [quizSetArray, setQuizSetArray] = useState([]);
  const [quizWord, setQuizWord] = useState(null);

  let questionNum = useRef(-1);

  useEffect(() => {
    let tempQuizSetArray = [];
    wordList.forEach((word, index) => {
      for (let i = 0; i < word.multiplier; i++) {
        tempQuizSetArray.push(index);
      }
    });
    tempQuizSetArray.sort(() => 0.5 - Math.random());
    setQuizSetArray(tempQuizSetArray);
    questionNum.current = 0;
    setQuizWord(wordList[tempQuizSetArray[questionNum.current]].term);
  }, []);

  const getNextWord = () => {
    questionNum.current = questionNum.current + 1;
    if (questionNum.current < quizLength) {
      setQuizWord(wordList[quizSetArray[questionNum.current]].term);
    } else {
      alert("You rock!");
      exitQuiz();
    }
  };

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
