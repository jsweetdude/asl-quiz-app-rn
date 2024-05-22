import React from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import IconButton from "./IconButton";
import QuizWindow from "./QuizWindow";

export default function NavBar({ showModal, quizOn }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image
          style={styles.headerLogo}
          source={require("../assets/asl-logo.png")}
        />
        <Text style={styles.headerTextStyle}>ASL Quiz App</Text>
      </View>
      <Pressable onPress={showModal} visible={!quizOn}>
        <Fontisto name="equalizer" size={24} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
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
});
