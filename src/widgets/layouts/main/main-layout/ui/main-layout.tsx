import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { CartModal } from '@/entities/store/cart/ui/cart-modal';
import { SearchModal } from '@/features/search/ui/search-modal';
import { REFETCH_STREAM_IN_MS } from '@/shared/lib/constants/common';
import { ErrorFallback } from '@/widgets/error-fallback/error-fallback';
import { BottomPlayerWrapper } from '@/widgets/players/bottom-player-wrapper';
import { fetchStreamTitleFx } from '@/widgets/players/stream/model/stream';
import { MainFooter } from '../../main-footer/ui/main-footer';
import { MainHeader } from '../../main-header/ui/main-header';
import localFont from 'next/font/local';
import clsx from 'clsx';

const myFont = localFont({ src: '../../../.././../../public/fonts/PPRightGroteskWideVariable.ttf', variable: '--font-right-grotesk' });

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { fetchStreamTitle } = useUnit({
    fetchStreamTitle: fetchStreamTitleFx,
  });

  useEffect(() => {
    fetchStreamTitle();
  }, [fetchStreamTitle]);
  useEffect(() => {
    setInterval(() => {
      fetchStreamTitle();
    }, REFETCH_STREAM_IN_MS);
  }, [fetchStreamTitle]);

  const errorHandler = (
    error: Error,
    info: {
      componentStack: string;
    }
  ) => {
    console.error('Logging', error, info);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
      <div className={clsx(myFont.className, 'flex min-h-screen flex-col')}>
        <MainHeader />
        <CartModal />
        <SearchModal />
        {children}
        <MainFooter />
        <BottomPlayerWrapper />
      </div>
    </ErrorBoundary>
  );
}
