import logo from '../img/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { SearchIcon, ChevronDownIcon } from '@heroicons/react/outline'

export default function Header() {
  const menuArr = [
    'Home',
    'Média',
    'Découvir les entreprises',
    'Trouver un job',
    'Tech'
  ]

  return (
    <div className='sticky top-0 z-50 flex justify-between w-full border-b pt-2 px-16 items-center'>
      <div className='relative w-32 h-20 mx-8'>
        <Image src={logo} layout='fill' objectFit='contain' />
      </div>
      <div className='mr-64'>
        <ul className='flex'>
          {menuArr.map((item, i) => (
            <li key={i} className='mx-3'>
              <Link href='/'>
                <a className='font-semibold'>{item}</a>
              </Link>
            </li>
          ))}
          <div className='border-l' />
          <li className='mx-3'>
            <Link href='/'>
              <a className='font-semibold'>Le lab</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex items-center'>
        <div className=' flex items-center justify-center h-8 w-8 rounded-full cursor-pointer hover:bg-gray-200'>
          <SearchIcon className='h-5' />
        </div>
        <div className='flex bg-gray-200 h-8 w-8 rounded-full items-center justify-center border-gray-800 mx-2 cursor-pointer'>
          <p>G</p>
        </div>
        <ChevronDownIcon className='h-5 cursor-pointer' />
        <Link href='/login'>
          <a className='whitespace-nowrap ml-2'>Se connecter</a>
        </Link>
      </div>
    </div>
  )
}
