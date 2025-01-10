import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateText } from './services/aiService';
import type { PromptInputs } from './types/api';

function App() {
  const [inputs, setInputs] = useState<PromptInputs>({
    input1: '',
    input2: '',
    input3: '',
  });
  const [generatedText, setGeneratedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const prompt = `${inputs.input1} Provide eco-friendly product suggestions based on the following criteria:

Product Type: ${inputs.input1}
Price Range: ${inputs.input2}
Primary Use: ${inputs.input3}
Focus on recommending items that are sustainable, environmentally friendly, and adhere to green manufacturing practices. Include a brief explanation for each suggestion highlighting its eco-friendly features.
Output the suggestions in bullet points, and for each suggestion:

Mention the product name.
Provide a brief explanation of its eco-friendly features.
Include any certifications or sustainable attributes.
Focus on recommending items that are sustainable, environmentally friendly, and adhere to green manufacturing practices.
Ensure each product suggestion is listed on a new line and presented in a neat and visually appealing format.`;
      const result = await generateText(prompt);
      setGeneratedText(result);
    } catch (err) {
      setError('Failed to generate text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
        <Sparkles className="mx-auto h-12 w-12 text-green-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            ECO SUGGESTIFY
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
              <label htmlFor={`input1`} className="block text-sm font-medium text-gray-700">
                  Enter the Product you wanna buy
                </label>
                <input
                  type="text"
                  name={`input1`}
                  id={`input1`}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  value={inputs[`input1` as keyof PromptInputs]}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
              <label htmlFor={`input2`} className="block text-sm font-medium text-gray-700">
                  Enter your price 
                </label>
                <input
                  type="text"
                  name={`input2`}
                  id={`input2`}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  value={inputs[`input2` as keyof PromptInputs]}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
              <label htmlFor={`input3`} className="block text-sm font-medium text-gray-700">
                  Enter your primary use
                </label>
                <input
                  type="text"
                  name={`input3`}
                  id={`input3`}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  value={inputs[`input3` as keyof PromptInputs]}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              'Give Alternatives'
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        {generatedText && !error && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Given Alternatives:</h3>
            <div className="mt-2 p-4 bg-white rounded-md shadow">
              <p className="text-gray-700">{generatedText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;