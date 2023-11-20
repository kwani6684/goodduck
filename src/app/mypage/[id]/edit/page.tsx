import ProfileImage from "@/app/register/ProfileImage";


export default function Register() {
  return (
    <form action='api/editUserInfo' method='post'>
      <div className='py-12 px-12 lg:px-80 md:px-30'>
       

        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>회원정보 수정</h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>This information will be displayed publicly so be careful what you share.</p>

          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-4'>
              <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
                Username
              </label>
              <div className='mt-2'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <span className='flex select-none items-center pl-3 text-gray-500 sm:text-sm'></span>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    autoComplete='username'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='콰니'
                  />
                </div>
              </div>
            </div>
            <div>
              <div className='font-semibold pb-4'>Profile image</div>
              <div className='pb-4'>프로필 사진은 2MB이하의 이미지 파일로 업로드 해주세요</div>
              <ProfileImage></ProfileImage>
            </div>
            <div className='col-span-full'>
              <label htmlFor='about' className='block text-sm font-medium leading-6 text-gray-900'>
                About
              </label>
              <div className='mt-2'>
                <textarea
                  id='about'
                  name='about'
                  rows={3}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  defaultValue={''}
                />
              </div>
              <p className='mt-3 text-sm leading-6 text-gray-600'>Write a few sentences about yourself.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-10 flex items-center justify-center gap-x-6'>
        <button type='button' className='text-lg font-semibold leading-6 text-gray-900'>
          Cancel
        </button>
        <button
          type='submit'
          className='rounded-md bg-yellow-800 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Save
        </button>
      </div>
    </form>
  );
}
