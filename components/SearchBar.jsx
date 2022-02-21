import Link from 'next/link'

export default function SearchBar() {
  return (
    <div className='flex flex-col items-center py-10 bg-wttj-cream'>
      <h1 className='text-2xl font-bold'>Découvrez les offres d&apos;emploi</h1>
      <div className='mt-8'>
        <input
          className='border h-16 w-96 p-8 outline-wttj-yellow'
          type='text'
          placeholder='Le job de vos rêves ?'
        />
        <input
          className='border h-16 w-64 p-8 outline-wttj-yellow'
          type='text'
          placeholder='Où ?'
        />
        <select className='h-16 outline-none'>
          <option value='cdi'>CDI</option>
          <option value='stage'>Stage</option>
          <option
            defaultValue
            value='alternance'
            className='text-center text-gray-100'
          >
            Contrat
          </option>
          <option value='freelance'>Freelance</option>
          <option value='temps partiel'>Temps partiel</option>
        </select>

        <button className='bg-wttj-yellow h-16 ml-4 px-6 font-semibold'>
          Rechercher
        </button>
      </div>
      <Link href='/'>
        <a className='pb-2 pt-8 text-lg font-semibold underline decoration-wttj-yellow'>
          Recheche avancée
        </a>
      </Link>
    </div>
  )
}
