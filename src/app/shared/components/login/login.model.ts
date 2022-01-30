import { User } from "src/app/core/models/user.model";

export interface loginApiPostData {
  username: string,
  password: string
}
export interface loginApiResponseData {
  data: User,
  message: string,
  success: boolean
}
