// components/QuestionItem.tsx
import React from "react";
import { View } from "react-native";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import EssayQuestion from "./EssayQuestion";
import { QuestionModel } from "@/types/workTypes";
import { Text } from "@/components/ui/text";

const QuestionItem = ({
  questionNumber,
  item,
  answers,
  onSelect,
  onEssayChange,
}: {
  questionNumber: number;
  item: QuestionModel;
  answers: Record<string, string>;
  onSelect: (questionId: string, optionId: string) => void;
  onEssayChange: (questionId: string, text: string) => void;
}) => (
  <View className="mb-5 p-3">
    <Text size="xl" className="font-semibold mb-2">
      Question {questionNumber}: {item.content}
    </Text>

    {item.type === "MULTICHOICE" && (
      <MultipleChoiceQuestion
        item={item}
        answers={answers}
        onSelect={onSelect}
      />
    )}

    {item.type === "ESSAY" && (
      <EssayQuestion item={item} answers={answers} onEssayChange={onEssayChange} />
    )}
  </View>
);

export default QuestionItem;
