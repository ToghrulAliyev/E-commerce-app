import React from 'react'

type Props = {}

const NavCategories = (props: Props) => {
  const navItems = [
        {
          "title": "Teachers' Day Gift",
          "id": 1
        },
        {
          "title": "Gift",
          "id": 2
        },
        {
          "title": "Birthday",
          "id": 3
        },
        {
          "title": "Personal",
          "id": 4
        },
        {
          "title": "Gift Sets",
          "id": 5
        },
        {
          "title": "Home & Living",
          "id": 6
        },
        {
          "title": "Jewelry & Watch",
          "id": 7
        },
        {
          "title": "Sports & Outdoor",
          "id": 8
        },
        {
          "title": "Electronic",
          "id": 9
        },
        {
          "title": "Shoe bag",
          "id": 10
        },
        {
          "title": "Fashion",
          "id": 11
        },
        {
          "title": "Cosmetic",
          "id": 12
        }
      ]
  return (
    <div className='h-[61px] flex items-center justify-center border-b border-solid text-slate-900 border-[#A0DD9F] gap-4'>
        {navItems.map((item:any)=>(
            <>
            <div className='flex items-center'>
                {item.title}
               
            </div>
             <div className="h-1/4 w-[1px] bg-gray-300 " />
            </>
        ))}
    </div>
  )
}

export default NavCategories