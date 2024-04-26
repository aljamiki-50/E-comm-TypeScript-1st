import { type SchemaTypeDefinition } from 'sanity'
import productSchema from './schemas/product-schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema],
}
