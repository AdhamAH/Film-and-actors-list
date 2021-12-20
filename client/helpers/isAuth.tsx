import { useMeQuery } from '../generated/graphql'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const isAuth = (): void => {
  const { data, loading } = useMeQuery()
  const router = useRouter()
  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace('/login?next=' + router.pathname).then()
    }
  }, [loading, data, router.pathname])
}
