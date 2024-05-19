import { View, Pressable, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Button({ children, theme, width, onPress }) {
  const buttonStyle = {
    ...styles.buttonStyle,
    ...buttonThemes[theme],
    ...{ width: width },
  };

  return (
    <Pressable style={buttonStyle} onPress={onPress} role="button">
      <Text style={{ color: buttonStyle.color }}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    display: "flex",
    borderRadius: 6,
    marginHorizontal: 14,
    marginVertical: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    textAlign: "center",
    verticalAlign: "center",
    display: "inline-block",
    alignItems: "center",
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
