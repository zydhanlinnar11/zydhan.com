import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface SmallSocialMediaButtonProps {
  icon: IconDefinition
  url: string
  name: string
}

export default function SmallSocialMediaButton({
  icon,
  url,
  name,
}: SmallSocialMediaButtonProps) {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener'
      className='max-h-3 max-w-3 text-white/75 hover:text-white/90 focus:text-white'
      aria-label={`Follow my ${name}`}
    >
      <FontAwesomeIcon icon={icon} size='lg' />
    </a>
  )
}
