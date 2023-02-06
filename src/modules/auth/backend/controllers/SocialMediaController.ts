import { SocialMedia } from '@/auth/types/SocialMedia'
import { BaseController } from '@/common/backend/controllers/BaseController'
import { db } from '@/common/lib/firebase'
import { NextApiRequest, NextApiResponse } from 'next'
import { oauth2Providers } from '../config/oauth2-providers'
import { ProviderBuilder } from '../providers/OAuth2/ProviderBuilder'
import { FieldValue } from 'firebase-admin/firestore'
import { OAuth2User } from '../models/OAuth2User'
import { AbstractProvider } from '../providers/OAuth2/AbstractProvider'

export class SocialMediaController extends BaseController {
  public index = async (req: NextApiRequest, res: NextApiResponse) => {
    const data: SocialMedia[] = oauth2Providers.map(({ id, providerName }) => ({
      id,
      name: providerName,
    }))

    res.send(data)
  }

  protected getProvider = (req: NextApiRequest) =>
    oauth2Providers.find(({ id }) => id === req.query.id)

  public getRedirectUrl = async (req: NextApiRequest, res: NextApiResponse) => {
    const Provider = this.getProvider(req)
    if (!Provider) return BaseController.notFound(res)

    return res.send({
      redirect_url: ProviderBuilder.build(Provider).getRedirectUrl(),
    })
  }

  public callback = async (req: NextApiRequest, res: NextApiResponse) => {
    const Provider = this.getProvider(req)
    if (!Provider) return BaseController.notFound(res)
    const provider = ProviderBuilder.build(Provider)

    const socialUser = await provider.getUser(req)
    const isUserExistInDb =
      (
        await db
          .collection('users')
          .where(`${Provider.id}Id`, '==', socialUser.getId())
          .limit(1)
          .count()
          .get()
      ).data().count !== 0

    if (!isUserExistInDb) {
      const userWithSameEmailCount = (
        await db
          .collection('users')
          .where(`email`, '==', socialUser.getEmail())
          .limit(1)
          .count()
          .get()
      ).data().count
      const isUserWithSameEmailExist = userWithSameEmailCount !== 0
      if (isUserWithSameEmailExist) {
        return res.status(401).send({ message: 'user_with_same_email_exist' })
      }
      const userRef = db.collection('users').doc()
      await userRef.set({
        [`${Provider.id}Id`]: socialUser.getId(),
        email: socialUser.getEmail(),
        name: socialUser.getName(),
        created_at: FieldValue.serverTimestamp(),
        updated_at: FieldValue.serverTimestamp(),
      })
    }

    const userSnapshot = await this.getUserSnapshotFromSocialUser(
      Provider,
      socialUser
    )

    // @ts-ignore
    req.session.userId = userSnapshot.id
    await req.session.save()

    return res.status(204).send(null)
  }

  private async getUserSnapshotFromSocialUser(
    Provider: typeof AbstractProvider,
    socialUser: OAuth2User
  ) {
    const snapshot = await db
      .collection('users')
      .where(`${Provider.id}Id`, '==', socialUser.getId())
      .limit(1)
      .get()

    let userData: any

    snapshot.forEach((doc) => {
      userData = { ...doc.data(), id: doc.id }
    })

    return userData
  }
}
