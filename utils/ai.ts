import { ChatOpenAI } from '@langchain/openai'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import z from 'zod'
import { PromptTemplate } from '@langchain/core/prompts'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('The mood of the person who wrote the journal entry.'),
    summary: z.string().describe('Quick summary of the entire entry.'),
    negative: z
      .boolean()
      .describe('Whether the journal entry has a negative effect or outcome.'),
    color: z
      .string()
      .describe(
        'A hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
    sentimentScore: z
      .number()
      .describe(
        'Sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
      ),
  })
)

export const analyze = async (prompt) => {
  const model = new ChatOpenAI({
    temperature: 0,
    modelName: 'tinyllama-1.1b',
    configuration: {
      baseURL: 'http://127.0.0.1:1337/v1',
    },
  })
  const result = await model.invoke(prompt)
  console.log(result)
}

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the intructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}
