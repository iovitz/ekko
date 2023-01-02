import { JSONSchemaType, Schema } from 'ajv'

export const userParamsSchema: Record<
  string,
  JSONSchemaType<{
    phone: string
  }>
> = {
  sendCode: {
    type: 'object',
    properties: {
      phone: {
        type: 'string',
        pattern: '1[34578]\\d{9}'
      }
    },
    required: ['phone']
  }
}
