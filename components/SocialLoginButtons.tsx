import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import React from 'react'
import BlogConfig from '../config/BlogConfig'
import FullWidthButton from './Button/FullWidthButton'

export default function SocialLoginButtons() {
  return (
    <>
      <FullWidthButton
        type='button'
        onClick={() =>
          Router.push(`${BlogConfig.BLOG_API}/auth/google/redirect`)
        }
      >
        <FontAwesomeIcon icon={faGoogle} />{' '}
        <span className='ml-1'>Log in with Google</span>
      </FullWidthButton>
      <FullWidthButton
        type='button'
        onClick={() =>
          Router.push(`${BlogConfig.BLOG_API}/auth/github/redirect`)
        }
      >
        <FontAwesomeIcon icon={faGithub} />{' '}
        <span className='ml-1'>Log in with Github</span>
      </FullWidthButton>
    </>
  )
}
