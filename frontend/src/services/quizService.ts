import api from './api';
import { ApiResponse } from '../types';

export interface QuizQuestion {
  id: number;
  topic: string;
  subTopic: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface QuizDiagnosticResponse {
  topic: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  overallStatus: 'MASTERY' | 'PROFICIENT' | 'NEEDS_IMPROVEMENT';
  laggingSubTopics: string[];
  strongSubTopics: string[];
  subTopicScores: Record<string, number>;
  aiRecommendationMessage: string;
  recommendedExperts: Array<{
    id: number;
    fullName: string;
    currentDesignation: string;
    organization: string;
    rating: number;
    sessionFee: number;
    areas: string[];
  }>;
}

export const quizService = {
  getTopics: async (): Promise<ApiResponse<string[]>> => {
    const res = await api.get('/student/quiz/topics');
    return res.data;
  },

  getQuestions: async (topic: string): Promise<ApiResponse<QuizQuestion[]>> => {
    const res = await api.get(`/student/quiz/questions`, { params: { topic } });
    return res.data;
  },

  evaluateQuiz: async (topic: string, answers: Record<number, number>): Promise<ApiResponse<QuizDiagnosticResponse>> => {
    const res = await api.post('/student/quiz/evaluate', { topic, answers });
    return res.data;
  },
};
