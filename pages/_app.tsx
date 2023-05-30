import '../src/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { client } from '@/shared/api/apollo/apollo-client';
import { Page } from '@/shared/types/page';
import { MainLayout } from '@/widgets/layouts/main/main-layout/ui/main-layout';

interface Props extends AppProps {
  Component: Page;
}

const MyApp = ({ Component, pageProps }: Props) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ApolloProvider client={client}>
      <MainLayout>
        <div className='flex flex-1 flex-col'>
          {getLayout(<Component {...pageProps} />)}
        </div>
      </MainLayout>
    </ApolloProvider>
  );
};

export default MyApp;
