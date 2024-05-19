import { Pressable, StyleSheet } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function IconButton({ btnType, label, icon, size, onPress }) {
  if (btnType === "icon-only circle") {
    return (
      <Pressable
        style={[styles.iconButton, { width: size }]}
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
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    backgroundColor: "#fff",
    marginHorizontal: 48,
  },
});
