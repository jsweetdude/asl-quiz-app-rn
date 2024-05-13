import { View, Pressable, StyleSheet } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function CircleButton({ label, icon, size }) {
  const iconSize = size;
  const containerSize = size * 1.8;
  const borderSize = size > 32 ? 4 : 2;

  // padding adjustments
  let leftPadding = 2;
  let rightPadding = 2;
  if (label === "Next Word") {
    leftPadding = 8;
    rightPadding = 2;
  } else if (label === "Previous Word") {
    leftPadding = 2;
    rightPadding = 6;
  }

  const styles = StyleSheet.create({
    circleButtonContainer: {
      width: containerSize,
      height: containerSize,
      borderWidth: borderSize,
      borderColor: "#fff",
      borderRadius: 100,
      marginHorizontal: 25,
      paddingVertical: 2,
      paddingRight: rightPadding,
      paddingLeft: leftPadding,
    },
    circleButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 42,
      backgroundColor: "#386dc2",
    },
  });

  return (
    <View style={styles.circleButtonContainer}>
      <Pressable
        style={styles.circleButton}
        role="button"
        aria-label={label}
        onPress={() => alert("Pressed " + label)}
      >
        <Ionicons name={icon} color={"white"} size={size} />
      </Pressable>
    </View>
  );
}
