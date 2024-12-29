import { Head, router, usePage } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TableComponent from '@/Components/Table'
import { useEffect, useState } from 'react'
import Modal from '@/Components/Modal'
import FormPage from './Form'
import DeletePage from './Delete'
import TextInput from '@/Components/TextInput'
import { useDebouncedCallback } from 'use-debounce';

const IndexPage = ({title, d, users}) => {
    const { flash } = usePage().props
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [isOpenDetail, setIsOpenDetail] = useState(false)
    const [visible, setVisible] = useState(false)
    const [id, setId] = useState(null) 
    const [nama,setNama] = useState(null)
    const [data,setData] = useState(null)
    const [ search, setSearch ] = useState("")
    const [ datas, setDatas ] = useState(null)
    const [ type, setType ] = useState("")

    useEffect(() => {
        setDatas(d)
    },[ d ])

    useEffect(() => {
        const getProdi = async () => {
            try {
                const { data } = await axios.post(route("pestisida.search"),{ search })
                setDatas(data)
            } catch (error) {
                console.log(error);
                
            }
        }

         getProdi()
    },[ search ])

    useEffect(() => {
        if(flash?.message) setVisible(true)
    },[flash])

    const formatDate = (datetime) => {
        if(!datetime) return ""
        const dateObj = new Date(datetime)
      
        const year = dateObj.getFullYear()
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
        const day = dateObj.getDate().toString().padStart(2, '0')
        return `${year}-${month}-${day}`;
      }
    
    const tableBody = data => {
        
        return (data && data.length > 0) ? data.map((d) => (
            <tr key={d.id} className="p-0 text-start h-20">
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                    <img src={d.gambar} className="w-10 h-10 rounded-full object-cover p-0 m-0" alt="" />
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                {d.nama}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                {d.hama}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                {d.dosis}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatDate(d.kadaluarsa)}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 flex gap-1 p-1">
                <button
                        onClick={() => {
                            setId(d.id)
                            setData(d)
                            setIsOpenDetail(true)
                        }}
                        className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 mb-4 px-4 rounded"
                        >
                        Detail
                    </button>
                {  users.role == "admin" &&  
                    <div className="">
                   
                        <button
                        onClick={() => {
                            setId(d.id)
                            setData(d)
                            setIsOpen(true)
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-4 px-4 rounded mr-1"
                        >
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            setId(d.id)
                            setNama(d.nama)
                            setIsOpenDelete(true)
                        }}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 mb-4 px-4 rounded"
                        >
                        Hapus
                    </button>
                    </div> }
                </td>  
            </tr>
            )) :  (<tr className="w-full"><td colSpan={5} className="bg-red-700 text-slate-50 p-1 font-medium text-md text-center">Tidak ada data</td></tr>)
    }

    const handleChangeSearch = useDebouncedCallback((e)=>{
        e.preventDefault()
        setSearch(e.target.value)
    },200, { maxWait: 5000 })

    const Detail = () => {
        if(!data) return <></>
        return <div className="bg-white rounded-lg shadow-lg z-50 w-full p-6">
            <div className="mb-4 text-lg font-medium text-slate-600">
                Detail Data Pestisida
            </div>
            <div className="grid  grid-cols-1 sm:grid-cols-[250px_1fr] gap-5">
                <div className="w-full border border-slate-50 rounded-md shadow-md">
                    <img src={data?.gambar} className="w-full h-full sm:w-full sm:h-56 object-cover p-0 m-0" alt="" />
                </div>
                <div>
                    <div className="grid grid-cols-[150px_2px_1fr] items-center w-full gap-2">
                        <p className='text-md font-medium'>Nama</p> : 
                        <p className='text-md font-light'>{ data?.nama }</p>
                    </div>
                    <div className="grid grid-cols-[150px_2px_1fr] items-center w-full gap-2">
                        <p className='text-md font-medium'>Untuk Hama</p> : 
                        <p className='text-md font-light'>{ data?.hama }</p>
                    </div>
                    <div className="grid grid-cols-[150px_2px_1fr] items-center w-full gap-2">
                        <p className='text-md font-medium'>Type</p> : 
                        <p className='text-md font-light'>{ data?.type }</p>
                    </div>
                    <div className="grid grid-cols-[150px_2px_1fr] items-center w-full gap-2">
                        <p className='text-md font-medium'>Kandungan Bahan</p> : 
                        <p className='text-md font-light'>{ data?.kandungan_bahan }</p>
                    </div>
                    <div className="grid grid-cols-[150px_2px_1fr] items-center w-full gap-2">
                        <p className='text-md font-medium'>Metode Penggunaan</p> : 
                        <p className='text-md font-light'>{ data?.metode_penggunaan }</p>
                    </div>
                    <div className="grid grid-cols-[150px_2px_1fr] items-center w-full gap-2">
                        <p className='text-md font-medium'>Dosis</p> : 
                        <p className='text-md font-light'>{ data?.dosis }</p>
                    </div>
                    <div className="grid grid-cols-[150px_2px_1fr] items-center w-full gap-2">
                        <p className='text-md font-medium'>Kadaluarsa</p> : 
                        <p className='text-md font-light'>{ formatDate(data?.kadaluarsa) }</p>
                    </div>
                </div>
            </div>
        </div>
    }

    return <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 ">
                Pestisida
            </h2>
        }>

    <Head title={ title } />

    <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {(visible)&& (
            <div className="mb-4 bg-green-100 text-green-700 p-3 rounded flex justify-between items-center">
            <span>{flash.message}</span>
                <button
                onClick={() => setVisible(false)}
                className="text-green-700 hover:text-green-900 text-xl font-bold focus:outline-none"
                >
                &times;
                </button>
            </div>
        )}
        { users.role == "admin" && <div className="flex justify-end w-full gap-2 items-center">
            <div className="mt-5">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-4 px-6 rounded"
                    >
                    Tambah
                </button>
            </div>
        </div> }
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
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
                <TableComponent td={tableBody(datas)} th={["gambar","Nama","hama","Dosis","Kadaluarsa",users.role == "admin" && "Action"]} />
            </div>
        </div>
        <Modal onClose={() => setIsOpen(false)} show={isOpen} setDataForm={setData} setId={setId}>
            <FormPage dataForm={data} isOpen={isOpen} setDataForm={setData} setId={setId} setIsOpen={setIsOpen} id={id}/>
        </Modal>
        <Modal onClose={() => setIsOpenDelete(false)} show={isOpenDelete} setDataForm={setData} setId={setId} setType={setType}>
            <DeletePage type={type} data={data} nama={nama} setId={setId} setNama={setNama} setIsOpen={setIsOpenDelete} id={id}  setType={setType}/>
        </Modal>
        <Modal onClose={() => setIsOpenDetail(false)} show={isOpenDetail} setDataForm={setData} setId={setId} >
            <Detail />
        </Modal>
    </div>
</AuthenticatedLayout>
}

export default IndexPage
