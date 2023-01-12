import { JSONSchemaType, Schema } from 'ajv'

export const diaryParamsSchema: Record<string, any> = {
  publish: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
        maxLength: 1000
      },
      files: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              maxLength: 250
            },
            type: {
              type: 'string',
              maxLength: 250
            }
          },
          required: ['url', 'type']
        }
      }
    },
    required: ['content']
  } as JSONSchemaType<{
    content: string
    files: {
      url: string
      type: string
    }[]
  }>
}
