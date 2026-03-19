import { createAnthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-latest'),
      system: `You are the UniGuide Chatbot, an expert South African student counselor. 
Your goal is to assist students navigating higher education in South Africa.
Be warm, encouraging, and highly knowledgeable. Keep your answers concise unless detail is necessary. 
If they ask about universities, APS scores, NSFAS, or bursaries, provide clear, step-by-step guidance.
Remember that UniGuide includes tools like a CV Builder, Career Assessment, Financial Aid matcher, and Institution comparison tools. 
Encourage students to use these tools when appropriate. NEVER make up information about UniGuide tools that don't exist.`,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Error communicating with AI' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
