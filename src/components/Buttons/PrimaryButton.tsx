import React, { FC } from 'react'

type Props = {
    extraClassName?:string
    click?: React.MouseEventHandler<HTMLButtonElement>
    children: string | number | React.ReactNode
    type?: "button" | "submit" | "reset"
}

const PrimaryButton:FC<Props> = ({extraClassName,click, children,type}) => {
  return (
    <button type={type} onClick={click} className={`${extraClassName} px-6 py-4 rounded-md text-black bg-[#F3EEEA] hover:bg-[#EBE3D5] duration-300 `}>
        {children}
    </button>
  )
}

export default PrimaryButton