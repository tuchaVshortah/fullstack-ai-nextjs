import { ChatOpenAI } from '@langchain/openai'

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
