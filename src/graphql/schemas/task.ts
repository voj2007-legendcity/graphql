export default {
  inputs: `
    input TaskInputCreate {
      name: String!
      priority: Int!
    }

    input TaskInputUpdate {
      _id: ID!
      name: String!
      priority: Int!
    }

    input TaskInputID {
      _id: ID!
    }

    input TaskInputFetch {
      condition: String
    }
  `,
  types: `
    type Task {
      _id: ID!
      name: String
      priority: Int!
    }
  `,
  query: `
    readTask(input: TaskInputID): Task!
    fetchTasks(input: TaskInputFetch): [Task]!
  `,
  mutation: `
    createTask(input: TaskInputCreate): Task!
    updateTask(input: TaskInputUpdate): Task!
    deleteTask(input: TaskInputID): Boolean!
  `
};