import { createApi } from "@reduxjs/toolkit/query";
import { API } from "../base";
import { Address, BankAccount } from "@/types/types";
import {
  QuestionModel,
  TestResultModel,
  DoingTestModel,
  registerServiceModel,
  registerServiceResultModel,
} from "@/types/workTypes";

import { Response } from "@/types/response";

const baseUrl = "/tests";

const testApi = API.injectEndpoints({
  endpoints: (build) => ({
    // getUser: build.query<User, string>({
    //   query: (id) => `users/${id}`,
    // }),

    // Get all service (of a freelancer)
    getQuestionOfTest: build.query<
      Response<QuestionModel[]>,
      {
        id: string;
      }
    >({
      query: ({ id }) => {
        // Kết hợp base URL và query string
        return `${baseUrl}/${id}/questions`; //?questionCount=1
      },
    }),

    submitTest: build.mutation<
      Response<TestResultModel>,
      { testId: string; answer: Partial<DoingTestModel> }
    >({
      query: ({ testId, answer }) => ({
        url: `${baseUrl}/${testId}/testResults`,
        method: "POST",
        body: answer,
      }),
    }),
  }),
});

export const { useGetQuestionOfTestQuery, useSubmitTestMutation } = testApi;
