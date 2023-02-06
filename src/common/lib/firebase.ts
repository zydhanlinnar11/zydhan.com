import { initializeApp, getApp, getApps } from 'firebase-admin/app'
import { credential } from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNTS
if (!serviceAccount)
  throw new Error('Service account not specified in environment variable')

const apps = getApps()
export const app = !apps.length
  ? initializeApp({
      credential: credential.cert(JSON.parse(serviceAccount)),
    })
  : getApp()

export const db = getFirestore()
