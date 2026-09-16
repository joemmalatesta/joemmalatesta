import { openai } from '@ai-sdk/openai';

export const chatModel = openai('gpt-5-nano');
export const embeddingModel = openai.embedding('text-embedding-3-small');
