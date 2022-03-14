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
      target="_blank"
      rel="noreferrer"
      className="max-h-3 max-w-3 text-black/75 hover:text-black/90 focus:text-black dark:text-white/75 hover:dark:text-white/90 focus:dark:text-white"
      aria-label={`Follow my ${name}`}
    >
      <FontAwesomeIcon icon={icon} size="lg" />
    </a>
  )
}
