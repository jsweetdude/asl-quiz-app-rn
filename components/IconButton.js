import { StyleSheet } from "react-native";
import { HStack, VStack, Button } from "@gluestack-ui/themed";
import Icon from "./Icon";

export default function IconButton({
  label,
  name,
  backgroundColor,
  strokeColor,
  size,
  onPress,
  isVisible,
}) {
  const bgColor = {
    backgroundColor: backgroundColor,
  };

  return (
    <Button
      style={[styles.iconButton, bgColor]}
      role="button"
      aria-label={label}
      onPress={onPress}
    >
      <Icon name={name} color={strokeColor} size={size} />
    </Button>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});
