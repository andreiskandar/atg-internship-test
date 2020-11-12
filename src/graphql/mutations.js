/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTalk = /* GraphQL */ `
  mutation CreateTalk(
    $input: CreateTalkInput!
    $condition: ModelTalkConditionInput
  ) {
    createTalk(input: $input, condition: $condition) {
      id
      clientId
      name
      description
      speakerName
      speakerBio
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateTalk = /* GraphQL */ `
  mutation UpdateTalk(
    $input: UpdateTalkInput!
    $condition: ModelTalkConditionInput
  ) {
    updateTalk(input: $input, condition: $condition) {
      id
      clientId
      name
      description
      speakerName
      speakerBio
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteTalk = /* GraphQL */ `
  mutation DeleteTalk(
    $input: DeleteTalkInput!
    $condition: ModelTalkConditionInput
  ) {
    deleteTalk(input: $input, condition: $condition) {
      id
      clientId
      name
      description
      speakerName
      speakerBio
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createSimulationReport = /* GraphQL */ `
  mutation CreateSimulationReport(
    $input: CreateSimulationReportInput!
    $condition: ModelsimulationReportConditionInput
  ) {
    createSimulationReport(input: $input, condition: $condition) {
      id
      combine_weight
      wheel_diameter
      fuel_type
      auger_length
      time_per_pass
      time_taken_to_plane_the_field
      percentage_of_field_chosen_to_cover
      cost_per_run
      total_efficiency
      _version
      _deleted
      _lastChangedAt
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
      combine_weight
      wheel_diameter
      fuel_type
      auger_length
      time_per_pass
      time_taken_to_plane_the_field
      percentage_of_field_chosen_to_cover
      cost_per_run
      total_efficiency
      _version
      _deleted
      _lastChangedAt
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
      combine_weight
      wheel_diameter
      fuel_type
      auger_length
      time_per_pass
      time_taken_to_plane_the_field
      percentage_of_field_chosen_to_cover
      cost_per_run
      total_efficiency
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
