import { JSONSchemaType, Schema } from 'ajv'

export const userParamsSchema: Record<string, any> = {
  sendCode: {
    type: 'object',
    properties: {
      phone: {
        type: 'string',
        pattern: '1[34578]\\d{9}'
      }
    },
    required: ['phone']
  } as JSONSchemaType<{
    phone: string
  }>,
  login: {
    type: 'object',
    properties: {
      phone: {
        type: 'string',
        pattern: '1[034578]\\d{9}'
      },
      code: {
        type: 'string',
        maxLength: 4
      }
    },
    required: ['phone']
  } as JSONSchemaType<{
    phone: string
    code: string
  }>
}
