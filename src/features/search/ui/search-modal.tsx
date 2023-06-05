import { Dialog, Transition } from '@headlessui/react';
import { useUnit } from 'effector-react';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { Icon } from '@/shared/ui/icons';
import {
  $isOpenedSearchModal,
  $search,
  $searchedData,
  $searchedDataLoading,
  $startedSearch,
  openSearchModalEv,
} from '../model/search.model';
import { SearchData } from './search-data';
import { SearchForm } from './search-form';

export const SearchModal = () => {
  const router = useRouter();
  const {
    searchValue,
    startedSearch,
    isOpenedSearchModal,
    searchedDataLoading,
    searchedData,
    openSearchModal,
  } = useUnit({
    searchValue: $search,
    isOpenedSearchModal: $isOpenedSearchModal,
    startedSearch: $startedSearch,
    searchedData: $searchedData,
    searchedDataLoading: $searchedDataLoading,
    openSearchModal: openSearchModalEv,
  });

  useEffect(() => {
    isOpenedSearchModal &&
      router.events.on('routeChangeComplete', () => {
        openSearchModal(false);
      });
  }, [router.events, isOpenedSearchModal, openSearchModal]);

  return (
    <Transition show={isOpenedSearchModal} as={Fragment}>
      <Dialog onClose={() => openSearchModal(false)}>
        <Transition.Child
          as={Fragment}
          enter='ease-in duration-100'
          enterFrom='opacity-0 '
          enterTo='opacity-200 '
          leave='ease-in duration-200'
          leaveFrom='opacity-100 '
          leaveTo='opacity-0'
        >
          <div
            className='fixed  inset-0 z-20 bg-primary bg-opacity-50 backdrop-blur-[166px] backdrop-saturate-150'
            aria-hidden='true'
          />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter='ease-out duration-200'
          enterFrom='opacity-0 -translate-y-full'
          enterTo='opacity-100 translate-y-0'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 -translate-y-full'
        >
          <div className='fixed  inset-0  top-0 z-30 flex w-full justify-center overflow-y-auto '>
            <Dialog.Panel className='w-full lg:px-[5%] 2xl:px-[10%]'>
              <div className='grid'>
                <div className='sticky top-1.5 mt-[calc(var(--header-height)/3.5)] flex w-full flex-1 flex-col   px-1.5  text-[0.8rem]  md:px-3  lg:px-3.5 xl:text-[0.875rem] '>
                  <div className='flex items-center'>
                    <SearchForm />
                  </div>
                </div>
                <div className='px-1.5 pt-3 md:px-3 lg:px-3.5 lg:pt-3.5  2xl:pt-5'>
                  {searchValue && startedSearch && (
                    <div className='grid items-center gap-3 text-2xl font-semibold uppercase leading-none text-black '>
                      {(searchedData.mixes?.data.length ||
                        searchedData.genres?.data.length) &&
                      searchValue.length > 0
                        ? `Search results for "${searchValue}"`
                        : 'Nothing was found'}
                    </div>
                  )}
                </div>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out delay-200 duration-200'
                  enterFrom='opacity-0 '
                  enterTo='opacity-100 '
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 '
                  leaveTo='opacity-0 '
                >
                  {searchedDataLoading ? (
                    <div className='fixed inset-0 flex items-center justify-center px-1.5 py-9 text-white md:px-3 lg:px-3.5 '>
                      <Icon.Loader />
                    </div>
                  ) : (
                    <SearchData
                      searchValue={searchValue}
                      searchedData={searchedData}
                    />
                  )}
                </Transition.Child>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
