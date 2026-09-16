import { openai } from '@ai-sdk/openai';

export const embeddingModel = openai.embedding('text-embedding-3-small');
