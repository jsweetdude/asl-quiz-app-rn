import { Pressable, Text, StyleSheet } from "react-native";
import { MaterialIcons, Fontisto } from "@expo/vector-icons";

export default function Button({ children, theme, width, onPress, disabled }) {
  const buttonStyle = [
    styles.buttonStyle,
    buttonThemes[theme],
    { width: width },
    disabled && styles.disabledButtonStyle,
  ];

  return (
    <Pressable
      style={buttonStyle}
      onPress={onPress}
      role="button"
      disabled={disabled}
    >
      <Text style={{ color: buttonThemes[theme].color }}>{children}</Text>
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
  disabledButtonStyle: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

const buttonThemes = {
  light: {
    backgroundColor: "rgb(108, 117, 125)",
    color: "#fff",
  },
  dark: {
    backgroundColor: "#001358",
    color: "#fff",
  },
};
