import { Pressable, StyleSheet } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function BorderlessButton({
  btnType,
  label,
  icon,
  size,
  onPress,
}) {
  const hintBtnPaddingLeft = 14;
  const buttonPaddingLeft = label === "Hint" ? hintBtnPaddingLeft : 0;

  const buttonStyle = {
    ...styles.borderlessButton,
    ...{ paddingLeft: buttonPaddingLeft },
  };

  if (btnType === "icon-only circle") {
    return (
      <Pressable
        style={buttonStyle}
        role="button"
        aria-label={label}
        onPress={onPress}
      >
        <FontAwesome name={icon} color={"#001358"} size={size} />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  borderlessButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    backgroundColor: "#fff",
    marginHorizontal: 48,
  },
});
