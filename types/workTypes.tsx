import { UserModel } from './userTypes';

export interface WorkModel {
  id: string;
  name: string;
  image: string;
  description: string;
  numOfFreelancers: number;
  numOfRequests: number;
  postPerMonth: number;
  test: TestModel;
}

export interface FreelancerWorkModel {
  id: string;
  status: string;
  description: string;
  createdAt: number[]; // [Year, Month, Day, Hour, Minute, Second, Millisecond]
  updatedAt: number[];
  freelancer: UserModel;
  work: WorkModel;
  testResult: TestResultModel;
}

export interface TestResultModel {
  id: string; // Unique identifier for the test result
  startTime: number[]; // [Year, Month, Day, Hour, Minute, Second, Nanosecond]
  endTime: number[]; // [Year, Month, Day, Hour, Minute, Second, Nanosecond]
  point: number; // Total points scored
  numOfCorrectAnswers: number; // Number of correct answers
  freelancer: UserModel; // The freelancer who took the test
  answerForQuestions: AnswerForQuestionModel[]; // Answers provided for each question
  passed: boolean; // Indicates if the test was passed
}

export interface AnswerForQuestionModel {
  question: QuestionModel; // The question being answered
  choice?: ChoiceModel; // The selected choice for MULTICHOICE questions
  content?: string; // The content of the answer for ESSAY questions
  correct: boolean; // Indicates if the answer was correct
}

export interface TestModel {
  id: string;
  testDuration: number;
  passedPoint: number;
  questionCount: number;
}

export interface QuestionModel {
  id: string;
  type: string;
  content: string;
  choices: ChoiceModel[];
}

export interface ChoiceModel {
  id?: string;
  content: string;
  answer: boolean;
  deleted: boolean;
}
