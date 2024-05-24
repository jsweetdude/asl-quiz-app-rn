import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import IconButton from "./IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HintModal from "./HintModal.js";
import { CongratulatoryAnimation } from "./CongratulatoryAnimation.js";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function ensureNoConsecutiveDuplicates(array) {
  shuffleArray(array);
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] === array[i + 1]) {
      let swapIndex = i + 2;
      while (swapIndex < array.length && array[i] === array[swapIndex]) {
        swapIndex++;
      }
      if (swapIndex < array.length) {
        [array[i + 1], array[swapIndex]] = [array[swapIndex], array[i + 1]];
      } else {
        return ensureNoConsecutiveDuplicates(array);
      }
    }
  }
  return array;
}

export default function QuizWindow({
  words,
  categories,
  quizLength,
  exitQuiz,
}) {
  const [quizSetArray, setQuizSetArray] = useState([]);
  const [quizWord, setQuizWord] = useState(null);
  const [quizWordHint, setQuizWordHint] = useState(null);
  const [filteredWordListArray, setFilteredWordListArray] = useState([]);
  const [isHintModalVisible, setIsHintModalVisible] = useState(false);
  const [dummyState, setDummyState] = useState(true);
  const [showCongrats, setShowCongrats] = useState(false);

  let questionNum = useRef(-1);

  useEffect(() => {
    // Generate an array containing only the active categories
    // Used to filter 'words' dictionary to words in those categories
    const activeCategoryNames = new Set(
      categories
        .filter((category) => category.active)
        .map((category) => category.categoryName)
    );

    // Filter the words data to include only words from active categories
    const filteredWordList = words.filter((word) =>
      activeCategoryNames.has(word.category)
    );

    // State contains all applicable words objects, including term, multiplier, category, hint
    setFilteredWordListArray(filteredWordList);

    // Error: if no categories are chosen, or if an error importing 'words' list
    if (filteredWordList.length === 0) {
      setQuizWord("No words available");
      return;
    }

    // Create array container for this quiz
    // To contain the indices of words
    let tempRandomWordIndex = [];
    // The 'while' loop ensures that there will be enough quiz words
    // to last the length of 'quizLength'
    while (tempRandomWordIndex.length < quizLength) {
      // Go through each active word in 'words'
      // and push it into the quiz array as many times
      // as its multiplier dictates
      filteredWordList.forEach((word, index) => {
        for (let i = 0; i < word.multiplier; i++) {
          tempRandomWordIndex.push(index);
        }
      });
    }

    tempRandomWordIndex = ensureNoConsecutiveDuplicates(tempRandomWordIndex);

    setQuizSetArray(tempRandomWordIndex);
    questionNum.current = 0;
    if (tempRandomWordIndex.length > 0) {
      setQuizWord(
        filteredWordList[tempRandomWordIndex[questionNum.current]].term
      );
      setQuizWordHint(
        filteredWordList[tempRandomWordIndex[questionNum.current]].hint
      );
    }
  }, [categories]);

  const getNextWord = () => {
    questionNum.current = questionNum.current + 1;
    console.log(
      "quizLength and questionNum.current",
      quizLength,
      questionNum.current
    );
    if (
      questionNum.current < quizLength &&
      questionNum.current < quizSetArray.length
    ) {
      setQuizWord(
        filteredWordListArray[quizSetArray[questionNum.current]].term
      );
      setQuizWordHint(
        filteredWordListArray[quizSetArray[questionNum.current]].hint
      );
      setDummyState(!dummyState);
    } else {
      setShowCongrats(true);
      // exitQuiz();
    }
  };

  const getPrevWord = () => {
    if (questionNum.current > 0) {
      questionNum.current = questionNum.current - 1;
      setQuizWord(
        filteredWordListArray[quizSetArray[questionNum.current]].term
      );
      setQuizWordHint(
        filteredWordListArray[quizSetArray[questionNum.current]].hint
      );
      setDummyState(!dummyState);
    } else {
      createAlert();
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
    const updatedWords = words.map((word) => {
      if (word.term === quizWord) {
        if (direction === "up") {
          // If the user is INCREASING frequency
          word.multiplier = word.multiplier + 1;
        } else if (direction === "down") {
          // If the user is DECREASING frequency
          if (word.multiplier === 1) {
            // If the word is already at 1
            createPromptAlert((remove) => {
              if (!remove) {
                // If the user DOES NOT opt to REMOVE
                word.multiplier = 1;
              } else {
                word.multiplier = 0;
              }
            });
          } else {
            word.multiplier = word.multiplier - 1;
          }
        }
      }
      return word;
    });
    saveWordsToStorage(updatedWords);
  };

  const createPromptAlert = (callback) => {
    if (Platform.OS === "web") {
      if (
        window.confirm(
          "This will remove the word from your rotation. You will never see it again, after the current quiz. Are you sure?"
        )
      ) {
        callback(true);
      } else {
        callback(false);
      }
    } else if (Platform.OS === "ios") {
      Alert.alert(
        "Remove Word",
        "This will remove the word from your rotation. You will never see it again, after the current quiz. Are you sure?",
        [
          {
            text: "Nevermind, keep it in rotation",
            onPress: () => {
              callback(false);
            },
            style: "cancel",
          },
          {
            text: "Yes, remove this word",
            onPress: () => {
              callback(true);
            },
          },
        ]
      );
    }
  };

  const createAlert = () => {
    if (Platform.OS === "web") {
      alert("You cannot go back. This is the first word in the quiz.");
    } else if (Platform.OS === "ios") {
      Alert.alert(
        "Notice",
        "You cannot go back. This is the first word in the quiz.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  const closeHintModal = () => {
    setIsHintModalVisible(false);
  };

  const saveNewHint = (newHintText) => {
    setIsHintModalVisible(false);
    // If the hint has changed, replace the existing hint with the new one
    // (in device storage)
    // Also, needs to update in the current quiz - in case it reappears
    // CAN REMOVE IF NOT ALLOWING DUPLICATES
    const updatedWords = words.map((word) => {
      if (word.term === quizWord) {
        word.hint = newHintText;
      }
      return word;
    });
    saveWordsToStorage(updatedWords);
  };

  const handleAnimationEnd = () => {
    setShowCongrats(false);
    exitQuiz();
  };

  return (
    <>
      <HintModal
        isVisible={isHintModalVisible}
        word={quizWord}
        oldHint={quizWordHint}
        onClose={closeHintModal}
        onSave={saveNewHint}
      />
      <View style={styles.quizContainer}>
        <View style={styles.exitContainer}>
          <Pressable onPress={exitQuiz}>
            <MaterialIcons name="close" size={32} color="#001358" />
          </Pressable>
        </View>

        <View style={styles.quizWord}>
          <Text style={styles.quizWordCounter}>
            {questionNum.current + 1} / {quizLength}
          </Text>
          <Text style={styles.quizWordTextStyle}>{quizWord}</Text>
        </View>

        <View style={styles.controlsContainer}>
          <View style={styles.controlsTopRow}>
            <IconButton
              btnType="icon-only circle"
              label="Increase Frequency"
              icon="plus"
              iconLibrary="fontawesome"
              size={24}
              color={"#001358"}
              backgroundColor={"#fff"}
              onPress={() => {
                adjustFrequency("up");
              }}
              isVisible={true}
            />
          </View>

          <View style={styles.controlsMidRow}>
            <IconButton
              btnType="icon-only circle"
              label="Previous Word"
              icon="step-backward"
              iconLibrary="fontawesome"
              size={44}
              color={"#001358"}
              backgroundColor={"#fff"}
              onPress={getPrevWord}
              isVisible={true}
            />

            <IconButton
              btnType="icon-only circle"
              label="Hint"
              icon="lightbulb-o"
              iconLibrary="fontawesome"
              size={44}
              color={"#001358"}
              backgroundColor={"#fff"}
              onPress={() => {
                setIsHintModalVisible(true);
              }}
              isVisible={true}
            />

            {questionNum.current >= quizLength - 1 ? (
              <IconButton
                btnType="icon-only circle"
                label="Next Word"
                icon="flag-checkered"
                iconLibrary="fontawesome"
                size={44}
                color={"#001358"}
                backgroundColor={"#fff"}
                onPress={getNextWord}
                isVisible={true}
              />
            ) : (
              <IconButton
                btnType="icon-only circle"
                label="Next Word"
                icon="forward"
                iconLibrary="fontawesome"
                size={44}
                color={"#001358"}
                backgroundColor={"#fff"}
                onPress={getNextWord}
                isVisible={true}
              />
            )}
          </View>

          <View style={styles.controlsBottomRow}>
            <IconButton
              btnType="icon-only circle"
              label="Decrease Frequency"
              icon="minus"
              iconLibrary="fontawesome"
              size={24}
              color={"#001358"}
              backgroundColor={"#fff"}
              onPress={() => {
                adjustFrequency("down");
              }}
              isVisible={true}
            />
          </View>
        </View>
      </View>
      <CongratulatoryAnimation
        visible={showCongrats}
        onEnd={handleAnimationEnd}
      />
    </>
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
  quizWordCounter: {
    flex: 1,
    width: "50%",
    alignItems: "start",
  },
  quizWordTextStyle: {
    flex: 11,
    alignContent: "center",
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
