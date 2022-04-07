export interface SignedInUserModel {
    expireAt: string,
    token: string,
    user: {
      email: string,
      id: number
    }
}
