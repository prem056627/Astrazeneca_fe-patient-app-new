import React from 'react'
import { ReactComponent as Help } from '../../assets/images/svg/bg_image/Help.svg';
import { useDispatch, useSelector } from 'react-redux';
import { SelectIsFabButtonOpen, isFabButtonOpen } from '../../pages/slice';
function FabButton() {

  const dispatch = useDispatch()
const IsFabbuttonOpen = useSelector(SelectIsFabButtonOpen)
function handleFabutton(){
  console.log("fab button clicked")
  dispatch(isFabButtonOpen())

  console.log(" ----IsFabbuttonOpen" , IsFabbuttonOpen);
}
  return (
    <div className="flex justify-end px-5 py-2">
      <button onClick={handleFabutton} className="flex cursor-pointer items-center bg-white justify-center w-16 h-16 border text-white text-2xl font-bold rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ">
        <Help/>
      </button>
    </div>
  )
}

export default FabButton