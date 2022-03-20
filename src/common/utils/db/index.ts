import config from '@/common/config'
import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(config.firebaseServiceAccountKey)
    ),
  })
}

export default admin.firestore()
