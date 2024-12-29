import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { router, useForm } from '@inertiajs/react'
import axios from 'axios'
import { useEffect, useState } from 'react'


const FormPage = ({ setIsOpen, isOpen,id,dataForm, setDataForm, setId}) => {
    const [ prodi, setProdi ] = useState([])
    const { data, setData, post, processing, errors, reset,setError } = useForm({
        nama: dataForm ? dataForm.nama : "",
        gejala: dataForm ? dataForm.gejala : "",
        pencegahan: dataForm ? dataForm.pencegahan : "",
        gambar:  "",
        imageUrl:  dataForm ? dataForm.gambar : "http://127.0.0.1:8000/image/default.jpg",
    });

    const submit = async (e) => {
        e.preventDefault();
        console.log(data);
        
        (id) ? router.post(route('hama.update',id),{   _method: 'put', ...data },{
            onSuccess: () => {
                setDataForm(null)
                setId(null)
                setIsOpen(false)
            },
            onError: (err) => setError(err)
        }) : post(route('hama.store'), {
            forceFormData: true,
            onSuccess: () => {
                setDataForm(null)
                setId(null)
                setIsOpen(false)
            }
        })
    }

    const handleChangeFile = (e,i) => {
        e.preventDefault()
        const files = e.target.files[0]

        const reader = new FileReader
        if(files?.size > 5*1000*1000){
            console.log(
                "error file terlalu besar"
            );
            
            setData({ ...data,gambar:"",imageUrl: "http://127.0.0.1:8000/image/default.jfif" })
        }else{
            reader.addEventListener("load", () => {
                setData({ ...data, gambar: files, imageUrl: reader.result  })
            })
            if(files) reader.readAsDataURL(files)
        }  
    }
    
    if(!isOpen) return <></>
    return <div className="bg-white rounded-lg shadow-lg z-50 w-full p-6">
        <div className="mb-4 text-lg font-medium text-slate-600">
            Form { dataForm ? `Edit` : `Tambah`} Data Hama
        </div>
        <form onSubmit={submit}> 
                <div className="flex gap-2 mt-4">
                    <div className="w-32">
                        <img src={data.imageUrl} className="w-20 h-20 rounded-sm object-cover p-0 m-0" alt="" />
                    </div>
                    <div className="mt-4 w-full">
                    <InputLabel htmlFor="image" value="Foto" />

                    <TextInput
                        id="gambar"
                        type="file"
                        name="gambar"
                        className="w-full py-1 px-1 rounded-md border-gray-300 border-[1px] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 "
                        autoComplete="gambar"
                        onChange={handleChangeFile}
                    />

                    <InputError message={errors.gambar} className="mt-2" />
                </div>
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="nama" value="Nama" />

                    <TextInput
                        id="nama"
                        type="text"
                        name="nama"
                        value={data.nama}
                        className="mt-1 block w-full"
                        autoComplete="nama"
                        onChange={(e) => setData('nama', e.target.value)}
                    />

                    <InputError message={errors.nama} className="mt-2" />
                </div>

            
                <div className="mt-4">
                    <InputLabel htmlFor="gejala" value="Gejala" />
                    <textarea 
                        value={data.gejala}
                        onChange={(e) => setData('gejala', e.target.value)}
                        name="gejala"
                        id="gejala"
                        className="w-full py-1 px-1 rounded-md border-gray-300 border-[1px] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 "
                    />
                    <InputError message={errors.gejala} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="pencegahan" value="Pencegahan" />
                    <textarea 
                        value={data.pencegahan}
                        onChange={(e) => setData('pencegahan', e.target.value)}
                        name="pencegahan"
                        id="pencegahan"
                        className="w-full py-1 px-1 rounded-md border-gray-300 border-[1px] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 "
                    />
                    <InputError message={errors.pencegahan} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        { dataForm ? `Update` : `Simpan` }
                    </PrimaryButton>
                </div>
            </form>
    </div>
}


export default FormPage