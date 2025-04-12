import React from "react";
import { TextInput, View, Text } from "react-native";
import { QuestionModel } from "@/types/workTypes";

const EssayQuestion = ({
  item,
  answers,
  onEssayChange,
}: {
  item: QuestionModel;
  answers: Record<string, string>;
  onEssayChange: (questionId: string, text: string) => void;
}) => (
  <View className="mb-5">
    {/* <Text className="text-xl font-semibold mb-2">{item.content}</Text> */}
    <TextInput
      className="border border-gray-300 p-3 rounded-lg mt-2 bg-white text-lg"
      placeholder="Enter your answer"
      multiline
      value={answers[item.id] || ""}
      onChangeText={(text) => onEssayChange(item.id, text)}
    />
  </View>
);

export default EssayQuestion;
