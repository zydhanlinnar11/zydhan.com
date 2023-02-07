import { Jwk } from '../models/Jwk'

export interface IJwkRepository {
  getAll: () => Promise<Jwk[]>
}
