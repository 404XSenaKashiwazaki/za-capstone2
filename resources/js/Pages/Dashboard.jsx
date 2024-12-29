import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Dashboard({ title, d, users, tanaman, hama, pestisida, market}) {
    const [isOpen, setIsOpen] = useState(false)
    const [id, setId] = useState(null) 
    const [datas,setDatas] = useState(null)
    const [data,setData] = useState([])
    const [ search, setSearch ] = useState("")
    useEffect(() => {
        setData(d)
    },[ d ])
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0 
        }).format(angka)
    }

    useEffect(() => {
        const getProdi = async () => {
            try {
                const { data } = await axios.post(route("dashboard.search"),{ search })
                setData(data)
            } catch (error) {
                console.log(error);
                
            }
        }

         getProdi()
    },[ search ])

    const handleChangeSearch = useDebouncedCallback((e)=>{
        e.preventDefault()
        setSearch(e.target.value)
    },200, { maxWait: 5000 })

    const Card = ({ color, textColor, title, value, description }) => <div className={`p-4 ${color} rounded-md`}>
    <div className="flex justify-between items-center">
        <div>
        <h3 className={`font-semibold ${textColor}`}>{title}</h3>
        <p className={`text-2xl font-bold mt-2 ${ textColor }`}>{value}</p>
        <p className={`text-sm ${textColor} mt-3`}>{description}</p>
        </div>
    </div>
    </div>

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title={title} />
            <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
        
        <div className="mx-5 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 mt-10">
        { users.role == "admin" 

            ? <div  className="grid grid-cols-1 sm:grid-cols-4 p-5 gap-5">
                <Link href={route("tanaman")}>
                <Card 
                    title="Produk"
                    value={ tanaman }
                    description=""
                    color="bg-gradient-to-r from-green-500 to-cyan-500"
                    textColor="text-slate-100"
                />
                </Link>
                <Link href={route("hama")}>
                <Card 
                    title="Hama"
                    value={ hama }
                    description=""
                    color="bg-gradient-to-r from-red-600 to-yellow-400"
                    textColor="text-slate-100"
                />
                </Link>
                <Link href={route("pestisida")}>
                <Card 
                    title="Pestisida"
                    value={ pestisida }
                    description=""
                    color="bg-blue-500"
                    textColor="text-slate-100"
                />
                </Link>
                <Link href={route("market")}>
                <Card 
                    title="Info Pasar"
                    value={ market }
                    description=""
                    color="bg-green-500"
                    textColor="text-slate-100"
                />
                </Link>
            </div>
            : <>
                <div className="">
                <div className="flex justify-end">
                <div className="p-2 text-gray-900 dark:text-gray-100 w-full flex justify-end">
                    <TextInput
                            id="nama"
                            type="text"
                            name="nama"
                            // value={search}
                            className="mt-1 block w-full max-w-md"
                            placeholder="Cari.."
                            onChange={handleChangeSearch}
                        />
                    </div>
                </div>
            </div>
            <div className="py-12 grid grid-cols-2 sm:grid-cols-4 gap-2 mx-2">
                { data && data.length > 0 && data.map(e=><div key={e.id} className="mb-3 transition transform duration-300 hover:scale-105 relative">
                    <div className="mx-auto w-full sm:px-1 lg:px-3">
                    <div className="overflow-hidden bg-white shadow-2xl sm:rounded-lg dark:bg-gray-800">
                        <div className="p-0 text-gray-900 dark:text-gray-100">
                            <img src={ e.gambar } className="object-fill w-full h-40 sm:h-56" alt={ e.nama } />
                            <div className="p-2">
                                <h1 className="text-bold w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold text-gray-900 ">{  e.nama } </h1>
                                <div className="absolute -top-1 right-1 bg-gradient-to-r w-auto from-purple-500 to-blue-500 text-white font-medium overflow-hidden text-ellipsis whitespace-nowrap text-sm py-1 px-2 rounded-sm hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">{ e.jenis }</div>
                                <p className="my-2 font-medium text-sm">{ formatRupiah(e.harga) }</p>
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
                { (data && data.length == 0) && <div className="bg-red-500 text-slate-50 w-full font-bold text-sm p-5">Tidak ada data</div> }
            </>
        }
                </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
