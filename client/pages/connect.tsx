import { AiFillGithub } from 'react-icons/ai'

export default function Page() {
  return <>
    <div className="grid grid-cols-12">
      <div className="col-span-4 bg-zinc-800 h-screen flex justify-center border-r-8 border-zinc-400">
        <div>
          <a className='bg-zinc-100 flex flex-col justify-center h-72 w-72 rounded-lg border-8 border-zinc-400 border-double cursor-grab transition-transform hover:scale-105 duration-300 mt-36'>
            <div className="flex justify-center">
              <img className="h-60 w-60"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/1200px-42_Logo.svg.png" />
            </div>
          </a>
          <p className="text-zinc-200 font-pixel mt-12 text-center text-2xl">CONNECT WITH 42</p>
          <div className="flex justify-center mt-52">
            <a className='bg-zinc-100 flex flex-col justify-center h-36 w-36 rounded-lg border-8 border-zinc-400 border-double cursor-grab transition-transform hover:scale-105 duration-300 mt-36'>
              <div className="text-8xl flex justify-center">
                <AiFillGithub />
              </div>
            </a>
          </div>
          <p className="text-zinc-200 font-pixel mt-12 text-center text-2xl">GITHUB
          </p>
        </div>
      </div>
      <div className="col-span-8 bg-zinc-200 h-screen">
        <p className="mt-16 text-center font-pixel text-black text-8xl underline">
          pong.io
        </p>
        <div className="mt-48 flex justify-center">
          <img className="border-8 rounded-lg border-zinc-400 border-double h-2/3 w-3/4"
            src="https://media2.ledevoir.com/images_galerie/nwd_132675_102056/image.jpg"
          />
        </div>

      </div>
    </div>
  </>
}
