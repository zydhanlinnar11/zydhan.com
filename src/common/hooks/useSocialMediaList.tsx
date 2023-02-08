import { oauth2Providers } from '../config/oauth2-providers'
import { SocialMedia } from '../types/SocialMedia'

const useSocialMediaList = (): SocialMedia[] => {
  return oauth2Providers.map((provider) => ({
    id: provider.id,
    name: provider.providerName,
  }))
}

export default useSocialMediaList
