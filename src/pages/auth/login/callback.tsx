import { GetServerSideProps } from 'next'
import React from 'react'

const CallbackPage = () => <></>

export const getServerSideProps: GetServerSideProps = async () => {
  // TODO: redirect intended
  return { redirect: { destination: '/', permanent: true } }
}

export default CallbackPage
