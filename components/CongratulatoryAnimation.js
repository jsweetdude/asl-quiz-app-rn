// CongratulatoryAnimation.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

export const CongratulatoryAnimation = ({ visible, onEnd }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  React.useEffect(() => {
    if (visible) {
      scale.value = withSequence(
        withTiming(1.5, { duration: 500, easing: Easing.ease }),
        withRepeat(
          withTiming(1, { duration: 500, easing: Easing.ease }),
          2,
          true
        )
      );

      opacity.value = withRepeat(
        withTiming(0, { duration: 500, easing: Easing.ease }),
        4,
        true
      );
      setTimeout(onEnd, 3000); // End the animation after 3 seconds
    }
  }, [visible]);

  const Confetti = () => {
    const confetti = Array.from({ length: 30 }).map((_, i) => ({
      key: i,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));

    return (
      <View style={StyleSheet.absoluteFillObject}>
        {confetti.map(({ key, color, left, top }) => (
          <Svg
            key={key}
            height="10"
            width="10"
            style={{ position: "absolute", left, top }}
          >
            <Circle cx="5" cy="5" r="5" fill={color} />
          </Svg>
        ))}
      </View>
    );
  };

  return (
    visible && (
      <View style={styles.container}>
        <Animated.View style={[styles.congratsBox, animatedStyle]}>
          <Text style={styles.congratsText}>Congratulations!</Text>
        </Animated.View>
        <Confetti />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  congratsBox: {
    padding: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
  },
  congratsText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
