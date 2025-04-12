import React from "react";
import { FlatList, TouchableOpacity, Text, View } from "react-native";
import { QuestionModel } from "@/types/workTypes";

const MultipleChoiceQuestion = ({
  item,
  answers,
  onSelect,
}: {
  item: QuestionModel;
  answers: Record<string, string>;
  onSelect: (questionId: string, optionId: string) => void;
}) => (
  <View className="mb-5">
    {/* <Text className="text-xl font-semibold mb-2">{item.content}</Text> */}
    <FlatList
      data={item.choices.filter((choice) => !choice.deleted)}
      keyExtractor={(choice) => choice.id || ""}
      renderItem={({ item: choice }) => (
        <TouchableOpacity
          className={`p-4 my-1 rounded-lg border-2 ${
            answers[item.id] === choice.id
              ? "bg-green-600 border-green-500"
              : "bg-white border-gray-200"
          }`}
          onPress={() => onSelect(item.id, choice.id || "")}
        >
          <Text
            className={`text-xl ${
              answers[item.id] === choice.id
                ? "text-white font-semibold"
                : "text-black"
            }`}
          >
            {choice.content}
          </Text>
        </TouchableOpacity>
      )}
    />
  </View>
);

export default MultipleChoiceQuestion;
