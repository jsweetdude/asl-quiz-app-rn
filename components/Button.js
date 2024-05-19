import { View, Pressable, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Button({ children, theme, width, onPress }) {
  const buttonStyle = {
    ...styles.buttonStyle,
    ...buttonThemes[theme],
    ...{ width: width },
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={buttonStyle} onPress={onPress}>
        <Text style={{ color: buttonStyle.color }}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  buttonStyle: {
    borderRadius: 6,
    marginHorizontal: 2,
    marginVertical: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    textAlign: "center",
    verticalAlign: "center",
    display: "inline-block",
  },
});

const buttonThemes = {
  light: {
    backgroundColor: "rgb(248, 249, 250)",
    color: "#000",
  },
  dark: {
    backgroundColor: "#001358",
    color: "#fff",
  },
};
