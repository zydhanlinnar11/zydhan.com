import { oauth2Providers } from '../backend/config/oauth2-providers'
import { SocialMedia } from '../types/SocialMedia'

const useSocialMediaList = () => {
  return oauth2Providers.map(
    ({ id, providerName }) =>
      ({
        id,
        name: providerName,
      } as SocialMedia)
  )
}

export default useSocialMediaList
