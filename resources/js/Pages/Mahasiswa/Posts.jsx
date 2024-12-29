import { Head, router, usePage } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TableComponent from '@/Components/Table'
import { useEffect, useState } from 'react'
import Modal from '@/Components/Modal'
import FormPage from './Form'
import DeletePage from './Delete'
import TextInput from '@/Components/TextInput'
import { useDebouncedCallback } from 'use-debounce';

const MhsPage = ({title, posts}) => {
    const { flash } = usePage().props
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [visible, setVisible] = useState(false)
    const [id, setId] = useState(null) 
    const [nama,setNama] = useState(null)
    const [data,setData] = useState(null)
    const [ mhs, setMhs ] = useState()
    const [ search, setSearch ] = useState("")

    useEffect(() => {
        setMhs(posts)
    },[ posts ])

    useEffect(() => {
        const getProdi = async () => {
            try {
                const { data } = await axios.post(route("mahasiswa.search"),{ search })
                setMhs(data)
            } catch (error) {
                console.log(error);
                
            }
        }

        getProdi()
    },[ search ])

    useEffect(() => {
        if(flash?.message) setVisible(true)
    },[flash])

    const tableBody = data => {
        return (data && data.length > 0) ? data.map((d) => (
            <tr key={d.id} className="p-0 text-center">
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                {d.nama}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                {d.npm}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                {d.npm}
                </td>
                <td className="px-6 p-0  text-sm font-medium text-gray-900">
                    <img src={d.image} className="w-10 h-10 rounded-full object-cover p-0 m-0" alt="" />
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 ">
                    <div className="flex gap-1 p-1">
                        <button
                        onClick={() => {
                            setId(d.id)
                            setData(d)
                            setIsOpen(true)
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-4 px-4 rounded"
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
                    </div>
                </td>
            </tr>
            )) :  (<tr className="w-full"><td colSpan={5} className="bg-red-700 text-slate-50 p-1 font-medium text-md text-center">Tidak ada data</td></tr>)
    }

    const handleChangeSearch = useDebouncedCallback((e)=>{
        e.preventDefault()
        setSearch(e.target.value)
    },200, { maxWait: 5000 })


    return <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 ">
                Prodi
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
        <div className="flex justify-end w-full gap-2 items-center">
            <div className="mt-5">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-4 px-6 rounded"
                    >
                    Tambah
                </button>
            </div>
        </div>
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="flex justify-end">
                <div className="p-2 text-gray-900 dark:text-gray-100 w-full flex justify-end">
                    <TextInput
                            id="nama"
                            type="text"
                            name="nama"
                            // value={search}
                            className="mt-1 block w-full max-w-md"
                            autoComplete="nama"
                            onChange={handleChangeSearch}
                        />
                    </div>
                </div>
                <TableComponent td={tableBody(mhs)} th={["Nama","Npm","Prodi","Foto","Action"]} />
            </div>
        </div>
        <Modal onClose={() => setIsOpen(false)} show={isOpen} setDataForm={setData} setId={setId}>
            <FormPage dataForm={data} isOpen={isOpen} setDataForm={setData} setId={setId} setIsOpen={setIsOpen} id={id}/>
        </Modal>
        <Modal onClose={() => setIsOpenDelete(false)} show={isOpenDelete} setDataForm={setData} setId={setId}>
            <DeletePage nama={nama} setId={setId} setNama={setNama} setIsOpen={setIsOpenDelete} id={id} />
        </Modal>
    </div>
</AuthenticatedLayout>
}

export default MhsPage
