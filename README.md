# Docker 
docker build -t legendcity-graphql .
docker run -p 5000:5000 legendcity-graphql


# GraphQl link
# http://localhost:5000/api/v1/graphql


# Create
mutation{
  createTask(input: {name: "Task 3", priority: 44}){
    name
    priority
  }
}

# Read
query{
  readTask(input: {_id: "5dea99ca9822463f1ae5a0eb"}){
    name
    priority
  }
}

# Update
mutation{
  updateTask(input: {_id: "5dea99ca9822463f1ae5a0eb", name: "Task 1", priority: 33}){
    name
    priority
  }
}

# Delete
mutation{
  deleteTask(input: {_id: "5dea99ca9822463f1ae5a0eb"})
}

# Fetch one mouste priority
query{
  fetchTasks(input: {}){
    _id
    name
    priority
  }
}