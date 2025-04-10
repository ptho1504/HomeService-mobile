import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StarRating = ({ rating = 4, size = 24, color = "gold" }) => {
  const maxStars = 5;

  return (
    <View style={{ flexDirection: "row" }}>
      {[...Array(maxStars)].map((_, index) => {
        const starType =
          index + 1 <= rating
            ? "star" // Sao đầy
            : index + 0.5 <= rating
            ? "star-half" // Sao nửa
            : "star-outline"; // Sao rỗng

        return <Ionicons key={index} name={starType} size={size} color={color} />;
      })}
    </View>
  );
};

export default StarRating;
