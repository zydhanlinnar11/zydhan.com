export class OAuth2User {
  constructor(private id: any, private name: string, private email: string) {}

  public getId = () => this.id
  public getName = () => this.name
  public getEmail = () => this.email
}
