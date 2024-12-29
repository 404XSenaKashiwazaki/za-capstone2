import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Hama({ title, data }) {
    const [isOpen, setIsOpen] = useState(false)
    const [id, setId] = useState(null) 
    const [datas,setDatas] = useState(null)


    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0 
        }).format(angka)
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title={title} />

        <Modal onClose={() => setIsOpen(false)} show={isOpen} setDataForm={setDatas} setId={setId}>
            <div className="bg-white rounded-lg shadow-lg z-50 w-full p-6">
                <div className="mb-4 text-lg font-medium text-slate-600">
                    Detail Data Produk
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[250px_1fr] gap-5">
                    <div className="w-full border border-slate-50 rounded-md shadow-md">
                        { datas?.gambar && <img src={datas?.gambar} className="w-full h-40 sm:h-80 object-cover p-0 m-0" alt="" /> }
                    </div>
                    <div>
                        <div className="grid grid-cols-[150px_2px_1fr] items-center w-full gap-2">
                            <p className='text-md font-medium'>Nama</p> : 
                            <p className='text-md font-light'>{ datas?.nama }</p>
                        </div>
                        <div className="grid grid-cols-[150px_2px_70px] items-center w-full gap-2">
                            <p className='text-md font-medium'>Jenis</p> : 
                            <p className='text-md font-light bg-blue-500 text-slate-50 w-auto py-1 px-3 rounded-md'>{ datas?.jenis }</p>
                        </div>
                        <div className="grid grid-cols-[150px_2px_1fr] items-center w-full gap-2">
                            <p className='text-md font-medium'>Teknik Penamanan</p> : 
                            <p className='text-md font-light'>{ datas?.teknik_penanaman }</p>
                        </div>
                        <div className="grid grid-cols-[150px_2px_1fr] items-center w-full gap-2">
                            <p className='text-md font-medium'>Lingkungan</p> : 
                            <p className='text-md font-light'>{ datas?.lingkungan }</p>
                        </div>
                        <div className="grid grid-cols-[150px_2px_1fr] items-center w-full gap-2">
                            <p className='text-md font-medium'>Periode Panen</p> : 
                            <p className='text-md font-light'>{ datas?.periode_panen }</p>
                        </div>
                        <div className="grid grid-cols-[150px_2px_1fr] items-center w-full gap-2">
                            <p className='text-md font-medium'>Permintaan Pasar</p> : 
                            <p className='text-md font-light'>{ datas?.permintaan_pasar }</p>
                        </div>
                        <div className="grid grid-cols-[150px_2px_1fr] items-center w-full gap-2">
                            <p className='text-md font-medium'>Harga</p> : 
                            <p className='text-md font-light'>{ formatRupiah(datas?.harga) }</p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>

            <div className="py-12 grid grid-cols-2 sm:grid-cols-4 gap-2 mx-2">
                { data && data.length > 0 && data.map(e=><div key={e.id} className="mb-3 transition transform duration-300 hover:scale-105 relative">
                    <div className="mx-auto w-full sm:px-1 lg:px-3">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-0 text-gray-900 dark:text-gray-100">
                            <img src={ e.gambar } className="object-fill w-full h-40 sm:h-56" alt={ e.nama } />
                            <div className="p-2">
                                <h1 className="text-bold w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold text-gray-900 ">{  e.nama } </h1>
                                <div className="absolute -top-1 -right-2 bg-gradient-to-r w-auto from-purple-500 to-blue-500 text-white font-medium overflow-hidden text-ellipsis whitespace-nowrap text-sm py-1 px-2 rounded-sm hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">{ e.jenis }</div>
                                <p className="my-1 font-medium text-sm">{ formatRupiah(e.harga) }</p>
                                <div onClick={() => {
                                    setIsOpen(true)
                                    setDatas(e)
                                }} className="bg-gradient-to-r w-auto text-center from-indigo-500 to-cyan-500 text-white font-medium overflow-hidden text-ellipsis whitespace-nowrap text-sm py-1 px-2 rounded-sm hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">Detail</div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>) }
            </div>
        </AuthenticatedLayout>
    );
}
