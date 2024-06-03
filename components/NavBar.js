import React, { useState, useEffect } from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import IconButton from "./IconButton";
import { Box, HStack } from "@gluestack-ui/themed";

export default function NavBar({ showSettings, showDictionary }) {
  return (
    <Box style={styles.header}>
      <Box style={styles.headerLeft}>
        <Image
          style={styles.headerLogo}
          source={require("../assets/asl-logo.png")}
        />
        <Text style={styles.headerTextStyle}>ASL Quiz App</Text>
      </Box>
      <HStack style={styles.buttonGroup}>
        <IconButton
          label="Dictionary"
          name="BookHeart"
          backgroundColor="rgb(0, 19, 88)"
          strokeColor="#fff"
          size={32}
          onPress={showDictionary}
        />
        <IconButton
          label="Settings"
          name="SlidersVertical"
          backgroundColor="rgb(0, 19, 88)"
          strokeColor="#fff"
          size={32}
          onPress={showSettings}
        />
      </HStack>
    </Box>
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
  buttonGroup: {
    justifyContent: "space-between",
  },
});
