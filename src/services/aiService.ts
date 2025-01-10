import axios, { AxiosError } from 'axios';
import { AIResponse } from '../types/api';

const API_URL = 'https://api.cohere.ai/generate';
const API_KEY = '4CvguqtPnkjAdCk7YD5dlJM5QPPjQDoSiZ03yl1O'; // Add your DeepAI API key here

import {CohereClientV2} from 'cohere-ai'

const cohere = new CohereClientV2({
  token: API_KEY,
});

export const generateText = async (prompt: string) => {
  try {
    const response = await cohere.chat({
      model: 'command-r-plus',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });
    const chatResponse=response.message.content[0].text;
    return chatResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.error || error.message;
      throw new Error(`API Error: ${message}`);
    }
    throw new Error('Failed to generate text');
  }
};