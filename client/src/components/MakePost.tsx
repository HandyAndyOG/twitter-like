import React from 'react'
import testImg from '../assets/media/test.jpeg'

const MakePost = () => {
  return (
    <section className='border'>
        <div className='flex flex-row'>
            <img src={testImg} className='rounded-full h-20 w-20 object-cover'/>
            <input placeholder='Whats goin on?'/>
        </div>
            <button className='rounded-xl bg-indigo-500 text-white px-2 '>Tweet</button>
    </section>
  )
}

export default MakePost