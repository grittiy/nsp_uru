import React from 'react'

type Props = {
    roomIds: (number | null)[];
    toolIds: (number | null)[];
    userId:number
}

const Button = (props: Props) => {
  return (
    <div className='flex items-center justify-center mt-20 cursor-pointer'>
        <span className='px-10 p-2 text-white bg-purple-600 rounded-full'>
        Checkout
        </span>
    </div>
  )
}

export default Button