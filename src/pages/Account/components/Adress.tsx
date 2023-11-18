import {useState} from 'react'
import { BsPlus } from "react-icons/bs";
import MyAccout from "..";
import AddressAddModal from '../../../components/Modals/AddressAddModal';
  

type Props = {};

const Adress = (props: Props) => {
  const [openModal,setOpenModal]=useState<boolean>(false)

 

  return (
    <>
    <MyAccout>
      <div id="address" className="mt-24 pl-7 pt-2  w-full">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold ">Adress</h1>
          <button onClick={()=> setOpenModal(!openModal)} className="flex items-center gap-1 px-2 rounded border border-solid border-green-400 text text-green-400 hover:border-green-500 duration-300 hover:text-green-500">
            <BsPlus />
            Add New Address
          </button>
        </div>
        <div className="w-full h-[0.5px] bg-gray-200 mt-4" />

        <div className="border border-solid rounded-lg mt-8 border-gray-200 flex flex-col gap-4">
          <h1 className="border-b border-solid border-gray-200 px-6 py-2">
            Ev
          </h1>
          <div className="pl-6 pb-6 pr-6 flex flex-col gap-4 ">
            <span>Toghrul Aliyev</span>
            <span>
              Bahçelievler Zafer mahallesi Yeşil sokak no 27 Arzu apartmanı A
              blok daire 2
            </span>
            <span>0558853365</span>
            <span>Baku-Azerbaijan</span>
          </div>
        </div>
        
        
      </div>

      
    </MyAccout>
     <AddressAddModal openModal={openModal} setOpenModal={setOpenModal}/>
 
    
    </>
  );
};

export default Adress;

// Tugrul Aliyev
// Bahçelievler Zafer mahallesi Yeşil sokak no 27 Arzu apartmanı A blok daire 2

// İSTANBUL-AVRUPA

// 545 783 33 65
