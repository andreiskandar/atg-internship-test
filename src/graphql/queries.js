/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSimulationReport = /* GraphQL */ `
  query GetSimulationReport($id: ID!) {
    getSimulationReport(id: $id) {
      id
      combineWeight
      wheelDiameter
      fuelType
      augerLength
      timeSpentToPlaneTheField
      costPerRun
      percentageOfFieldChosenToCover
      numOfElectricRuns
      createdAt
      updatedAt
    }
  }
`;
export const listSimulationReports = /* GraphQL */ `
  query ListSimulationReports(
    $filter: ModelsimulationReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSimulationReports(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        combineWeight
        wheelDiameter
        fuelType
        augerLength
        timeSpentToPlaneTheField
        costPerRun
        percentageOfFieldChosenToCover
        numOfElectricRuns
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
