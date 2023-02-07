export class CookieKey {
  constructor(
    private id: string,
    private key: string,
    private timestamp: Date
  ) {}

  getId = () => this.id
  getKey = () => this.key
  getTimestamp = () => this.timestamp
}
