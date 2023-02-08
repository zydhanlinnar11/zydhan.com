import { GetServerSideProps } from 'next'
import { getProvider } from '@/oauth/backend/lib/oidc'
import React from 'react'

const OpenIdConfiguration = () => <></>

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  ;(await getProvider(req)).callback()(req, res)

  return { props: {} }
}

export default OpenIdConfiguration
