export interface IAuthorizedCallbackOriginRepository {
  isExistByHostName: (hostName: string) => Promise<boolean>
}
