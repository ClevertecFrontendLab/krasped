export interface IFeedback {
  "id": string,
  "fullName": string,
  "imageSrc": string,
  "message": string,
  "rating": number,
  "createdAt": string
}
export interface IFeedbackReq {
  "message": string,
  "rating": number,
}