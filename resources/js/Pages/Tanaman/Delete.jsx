
import {  router} from '@inertiajs/react'
import { useState } from 'react'


const DeletePage = ({ nama,setIsOpen, id, type = "", data = null,setType}) => {
    const [error, setError] = useState(null)
        const handleDelete = (e) => {
            e.preventDefault();
            
            router.delete(route('tanaman.destroy', id), {
                onSuccess: () => {
                    setIsOpen(false)
                    setType("")
                },
                onError: (error) => {
                    console.log(error);
                    
                    setError("Gagal menghapus data")
                }
            })
        }
        
        return <div className="bg-white rounded-lg shadow-lg z-50 w-full p-6">
            { error &&  <div className="mb-4 bg-red-100 text-red-700 p-3 rounded flex justify-between items-center">
                        <span>{error}</span>
                        </div> 
            }
            <div className="mb-4 text-lg font-medium text-slate-600">
                Anda yakin akan menghapus data: { nama } ?
            </div>
            <div className="flex justify-end">
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 mb-4 px-4 rounded"
                    >
                    Hapus
                </button>
            </div>
        </div>
}


export default DeletePage