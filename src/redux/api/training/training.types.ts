
export interface IExercise {
  "name": string,
  "replays": number,
  "weight": number,
  "approaches": number,
  "isImplementation": boolean
}

export interface IExerciseWithId extends IExercise {
  _id: string
}

interface IParameters {
  "repeat": boolean,
  "period": number,
  "jointTraining": boolean,
  "participants": string[]
}

export interface ITraining {
  "_id": string,
  "name": string,
  "date": string,
  "isImplementation": false,
  "userId": "string",
  "parameters": IParameters,
  "exercises": IExerciseWithId[]
}

export interface ITrainingReq {
  "name": string,
  "date": string,
  "isImplementation": boolean,
  "parameters": IParameters,
  "exercises": IExercise[]
}
