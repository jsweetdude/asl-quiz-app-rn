import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Platform } from "react-native";
import IconButton from "./IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HintModal from "./HintModal.js";
import { HStack, VStack, Box, Divider } from "@gluestack-ui/themed";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";

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

  let questionNum = useRef(-1);

  //////////////////////////////////////////////////
  ////////// Begin Gesture/Swipe Handling //////////
  //////////////////////////////////////////////////

  const translateX = useRef(new Animated.Value(0)).current;
  const [cardWidth, setCardWidth] = useState(1);

  // Ensure initial value is 0
  useEffect(() => {
    translateX.setValue(0);
  }, []);

  const greenBoxOpacity = translateX.interpolate({
    inputRange: [80, 200],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const redBoxOpacity = translateX.interpolate({
    inputRange: [-200, -80],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const borderColor = translateX.interpolate({
    inputRange: [-50, 0, 50],
    outputRange: ["#ea580c", "#E9E9E9", "rgb(5, 150, 105)"],
    extrapolate: "clamp",
  });

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
        },
      },
    ],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      const translationPercent = (translateX._value / cardWidth) * 100;

      if (translationPercent > 50) {
        handleSwipeRight();
      } else if (translationPercent < -50) {
        handleSwipeLeft();
      }
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  const panGestureProps = Platform.select({
    web: {
      activeOffsetX: [-10, 10],
      failOffsetY: [-10, 10],
    },
    default: {},
  });

  useEffect(() => {
    const listener = translateX.addListener(({ value }) => {
      const translationPercent = (value / cardWidth) * 100;

      // debug
      // logPositionPercent(translationPercent);
    });

    return () => {
      translateX.removeListener(listener);
    };
  }, [cardWidth]);

  // debug - can remove
  // const logPositionPercent = (position) => {
  //   console.log("Position is " + position);
  // };

  const changeWordRating = (direction) => {
    const updatedWords = words.map((word) => {
      if (word.term === quizWord) {
        if (direction === "know") {
          word.know = word.know + 1;
        } else if (direction === "still learning") {
          word.stillLearning = word.stillLearning + 1;
        }
      }
      return word;
    });
    saveWordsToStorage(updatedWords);
  };

  const handleSwipeRight = () => {
    console.log("Swiped right");
    changeWordRating("know");
    getNextWord();
  };

  const handleSwipeLeft = () => {
    console.log("Swiped left");
    changeWordRating("still learning");
    getNextWord();
  };

  //////////////////////////////////////////
  ////////// Begin Quiz Mechanics //////////
  //////////////////////////////////////////

  useEffect(() => {
    const activeCategoryNames = new Set(
      categories
        .filter((category) => category.active)
        .map((category) => category.categoryName)
    );

    const filteredWordList = words.filter((word) =>
      activeCategoryNames.has(word.category)
    );

    setFilteredWordListArray(filteredWordList);

    if (filteredWordList.length === 0) {
      setQuizWord("No words available");
      return;
    }

    let tempRandomWordIndex = [];
    while (tempRandomWordIndex.length < quizLength) {
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
      // setShowCongrats(true);
      exitQuiz();
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
          word.multiplier = word.multiplier + 1;
        } else if (direction === "down") {
          if (word.multiplier === 1) {
            createPromptAlert((remove) => {
              if (!remove) {
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
    const updatedWords = words.map((word) => {
      if (word.term === quizWord) {
        word.hint = newHintText;
      }
      return word;
    });
    saveWordsToStorage(updatedWords);
  };

  const handleAnimationEnd = () => {
    // setShowCongrats(false);
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

      <VStack style={styles.outerContainer}>
        <HStack style={styles.topBar}>
          <IconButton
            name="X"
            backgroundColor="#fff"
            strokeColor="rgb(0,19,88)"
            size={40}
            onPress={exitQuiz}
          />
          <Text style={styles.quizStatus}>
            {questionNum.current + 1} / {quizLength}
          </Text>
          <Box style={styles.spacerBox} />
        </HStack>

        <Divider mx="2.5" bg="$indigo500" h={2} backgroundColor="gray" />

        <Box style={styles.quizCardContainer}>
          <Animated.View
            style={[styles.stillLearningBox, { opacity: redBoxOpacity }]}
          >
            <Text style={styles.stillLearningText}>-1</Text>
          </Animated.View>
          <Animated.View style={[styles.knowBox, { opacity: greenBoxOpacity }]}>
            <Text style={styles.knowText}>+1</Text>
          </Animated.View>
          <GestureHandlerRootView style={styles.container}>
            <PanGestureHandler
              onGestureEvent={onGestureEvent}
              onHandlerStateChange={onHandlerStateChange}
              {...panGestureProps}
            >
              <Animated.View
                style={[
                  styles.swipeableCard,
                  {
                    transform: [{ translateX }],
                    borderColor: borderColor,
                  },
                ]}
                onLayout={(event) => {
                  const { width } = event.nativeEvent.layout;
                  setCardWidth(width);
                }}
              >
                <Text style={styles.text}>Swipe me</Text>
                <Text style={styles.quizWordTextStyle}>{quizWord}</Text>
              </Animated.View>
            </PanGestureHandler>
          </GestureHandlerRootView>
        </Box>

        <HStack style={styles.bottomBar}>
          <IconButton
            name="Undo2"
            backgroundColor="#fff"
            strokeColor="rgb(0,19,88)"
            size={40}
            onPress={getPrevWord}
          />
          <IconButton
            name="Lightbulb"
            backgroundColor="#fff"
            strokeColor="rgb(0,19,88)"
            size={40}
            onPress={() => {
              setIsHintModalVisible(true);
            }}
          />
        </HStack>
      </VStack>
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: 8,
    width: "100%",
  },
  topBar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  quizStatus: {
    textAlign: "center",
    fontSize: "18pt",
  },
  spacerBox: {
    width: 48,
  },
  quizCardContainer: {
    flex: 9,
  },
  stillLearningBox: {
    position: "absolute",
    top: 30,
    left: 30,
    zIndex: 100,
    backgroundColor: "red",
    borderRadius: 20,
    width: 36,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0, // Ensure opacity is set to 0 initially
  },
  stillLearningText: {
    color: "white",
    fontSize: 24,
  },
  knowBox: {
    position: "absolute",
    top: 30,
    right: 30,
    zIndex: 100,
    backgroundColor: "green",
    borderRadius: 20,
    width: 36,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0, // Ensure opacity is set to 0 initially
  },
  knowText: {
    color: "white",
    fontSize: 24,
  },
  swipeableCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(252,250,250)",
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 12,
    border: "2px solid #E9E9E9",
    borderRadius: 12,
  },
  bottomBar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
