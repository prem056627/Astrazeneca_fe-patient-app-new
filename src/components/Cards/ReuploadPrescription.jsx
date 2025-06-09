
import { ReactComponent as Warning } from '../../assets/images/svg/Warning.svg';
function ReuploadPrescription() {
  return (
    <div className=' bg-[#FFEFD4]  px-5 py-5'>
<div className='flex gap-2 '>
    <Warning  className="h-7 w-7"/>
    <div className=' '>
    <p className='text-[#595454] font-open-sans font-semibold text-sm'>Uploaded document for Prescription is not as per the program guideline.</p>
    <p className='text-[#BD7701] font-open-sans font-semibold text-sm py-1'>Re-upload Prescription</p>
    </div>
</div>
 

    </div>
  )
}

export default ReuploadPrescription
