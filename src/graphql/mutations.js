/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSimulationReport = /* GraphQL */ `
  mutation CreateSimulationReport(
    $input: CreateSimulationReportInput!
    $condition: ModelsimulationReportConditionInput
  ) {
    createSimulationReport(input: $input, condition: $condition) {
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
export const updateSimulationReport = /* GraphQL */ `
  mutation UpdateSimulationReport(
    $input: UpdateSimulationReportInput!
    $condition: ModelsimulationReportConditionInput
  ) {
    updateSimulationReport(input: $input, condition: $condition) {
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
export const deleteSimulationReport = /* GraphQL */ `
  mutation DeleteSimulationReport(
    $input: DeleteSimulationReportInput!
    $condition: ModelsimulationReportConditionInput
  ) {
    deleteSimulationReport(input: $input, condition: $condition) {
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
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
