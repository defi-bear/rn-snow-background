import React, { useRef, useEffect } from "react";
import { StyleSheet, Dimensions, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  snow: {
    width: 10,
    height: 10,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 5,
    top: 30,
  },
});

function Snow() {
  const random_range = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const randomX = (Math.random() * 100 * width) / 100;
  const randomOffset = (random_range(-100, 100) * width) / 100;
  const randomXEnd = randomX + randomOffset;
  const randomXEndYo = randomX + randomOffset / 2;
  const randomYoTime = random_range(0, 80) / 100;
  const randomYoY = randomYoTime * height;
  const randomScale = Math.random() * 100 * 0.01;
  const fallDuration = random_range(10, 30) * 1000;
  const opacity = Math.random() * 100 * 0.01;

  const animValue = useRef(new Animated.Value(0)).current;

  const animate = () => {
    animValue.setValue(randomYoTime);
    Animated.timing(animValue, {
      toValue: 1,
      duration: fallDuration,
      useNativeDriver: true,
    }).start(() => {
      animate();
    });
  };

  useEffect(() => {
    animate();
  }, [animate]);

  return (
    <Animated.View
      style={[
        styles.snow,
        { opacity },
        {
          transform: [
            {
              translateX: animValue.interpolate({
                inputRange: [randomYoTime, 1],
                outputRange: [
                  parseInt(randomXEnd, 10),
                  parseInt(randomXEndYo, 10),
                ],
              }),
            },
            {
              translateY: animValue.interpolate({
                inputRange: [randomYoTime, 1],
                outputRange: [parseInt(randomYoY, 10), height],
              }),
            },
            {
              scale: randomScale,
            },
          ],
        },
      ]}
    />
  );
}

export default function SnowBackground({
  colors = ["#1b2735", "#090a0f"],
  snowCount = 150,
}) {
  return (
    <LinearGradient colors={colors} style={styles.container}>
      {new Array(snowCount).fill(0).map((_, i) => (
        <Snow key={i} />
      ))}
    </LinearGradient>
  );
}
