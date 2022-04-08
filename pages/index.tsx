import PageContainer from '@/layout/Main'
import useUser from '@/lib/useUser';
import type { NextPage } from 'next'

const Home: NextPage = () => {
  // when user is logged in
  // const { user, mutateUser } = useUser();
  // when user is logged in || redirectIfFound -> login page = true home page = false
  // const { user, mutateUser } = useUser({redirectIfFound: true, redirectTo: '/dashboard'});
  return (
  <PageContainer>
    Home
  </PageContainer
  )
}

export default Home
