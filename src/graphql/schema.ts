import { buildSchema } from 'graphql';
import TaskSchema from './schemas/task';

export default buildSchema(`
  ${TaskSchema.types}

  ${TaskSchema.inputs}

  type RootQuery {
    ${TaskSchema.query}
  }

  type RootMutation {
    ${TaskSchema.mutation}
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);