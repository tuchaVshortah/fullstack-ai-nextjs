import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import z from 'zod'
import { PromptTemplate } from '@langchain/core/prompts'
import { Document } from '@langchain/core/documents'
import { loadQARefineChain } from 'langchain/chains'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('The mood of the person who wrote the journal entry.'),
    summary: z.string().describe('Quick summary of the entire entry.'),
    subject: z.string().describe('The subject of the journal entry.'),
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

export const analyze = async (content) => {
  const input = await getPrompt(content)
  const model = new ChatOpenAI({
    temperature: 0,
    modelName: 'codeninja-1.0-7b',
    configuration: {
      baseURL: 'http://127.0.0.1:1337/v1',
    },
  })

  try {
    const result = await model.invoke(input)
    return parser.parse(result.content.toString())
  } catch (e) {
    console.log(e)
  }
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

export const qa = async (question, entries) => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: { id: entry?.id, createdAt: entry.createdAt },
    })
  })

  const model = new ChatOpenAI({
    temperature: 0,
    modelName: 'codeninja-1.0-7b',
    configuration: {
      baseURL: 'http://127.0.0.1:1337/v1',
    },
  })

  // I cannot use the code below because I did run LLMs locally using Jan
  // and its server simply does not expose any APIs to interact with embeddings.
  //
  const chain = loadQARefineChain(model)
  // const embeddings = new OpenAIEmbeddings()
  // const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  // const relevantDocs = await store.similaritySearch(question)
  // const res = await chain.invoke({
  //   input_documents: relevantDocs,
  //   question,
  // })

  const res = await chain.invoke({
    input_documents: docs,
    question,
  })

  return res.output_text
}
