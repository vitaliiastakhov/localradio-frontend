import { Seo } from '@/shared/ui/seo/seo';

const Custom500Page = () => {
  return (
    <>
      <Seo templateTitle='Server-side error occurred' />
      <div className='my-auto flex min-h-screen w-full items-center  justify-between overflow-hidden px-3  text-[15vw] font-black uppercase leading-[0.75]'>
        <div className='grid'>
          <span>Server</span>
          <span>side</span>
          <span>error</span>
        </div>
        <div className='grid'>
          <span>500</span>
        </div>
      </div>
    </>
  );
};
export default Custom500Page;
