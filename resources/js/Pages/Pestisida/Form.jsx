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
        type: dataForm ? dataForm.type : "",
        hamaId: dataForm ? dataForm.hamaId : "",
        image:  "",
        kandungan_bahan : dataForm ? dataForm.kandungan_bahan : "",
        metode_penggunaan : dataForm ? dataForm.metode_penggunaan : "",
        dosis : dataForm ? dataForm.dosis : "",
        kadaluarsa : dataForm ? dataForm.kadaluarsa : "",
        gambar:  "",
        imageUrl:  dataForm ? dataForm.gambar : "http://127.0.0.1:8000/image/default.jpg",
    });

    useEffect(() => {
        const getProdi = async () => {
            try {
                const { data } = await axios.get(route("pestisida.hama"))
                setProdi(data)
            } catch (error) {
                console.log(error);
                
            }
        }

        getProdi()
    },[ isOpen ])

    const submit = async (e) => {
        e.preventDefault();
        console.log(data);
        
        (id) ? router.post(route('pestisida.update',id),{   _method: 'put', ...data },{
            onSuccess: () => {
                setDataForm(null)
                setId(null)
                setIsOpen(false)
            },
            onError: (err) => setError(err)
        }) : post(route('pestisida.store'), {
            forceFormData: true,
            onSuccess: () => {
                setDataForm(null)
                setId(null)
                setIsOpen(false)
            }
        })
    }

    const formatDate = (datetime) => {
        if(!datetime) return ""
        const dateObj = new Date(datetime)
      
        const year = dateObj.getFullYear()
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
        const day = dateObj.getDate().toString().padStart(2, '0')
        return `${year}-${month}-${day}`;
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
            Form { dataForm ? `Edit` : `Tambah`} Data Pestisida
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
                    <InputLabel htmlFor="hamaId" value="Hama" />
                    <select
                        id="hamaId"
                        name="hamaId"
                        value={data.hamaId}
                        className="mt-1 block w-full"
                        autoComplete="Hama"
                        onChange={(e) => setData('hamaId', e.target.value)}
                    >
                        <option value="">-- Pilih Hama --</option>
                        { prodi.length > 0 && prodi.map(e=> <option key={e.id} value={ e.id }>{ e.nama }</option>) }
                    </select>
                    <InputError message={errors.hamaId} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="type" value="Type" />
                    <select
                        id="type"
                        name="type"
                        value={data.type || ""}
                        className="mt-1 block w-full"
                        autoComplete="type"
                        onChange={(e) => setData('type', e.target.value)}
                    >
                        <option value="">-- Pilih Type --</option>
                        <option  value="herbisida">Herbisida</option>
                        <option value="insektisida">Insektisida</option>
                        <option value="fungisida">Fungisida </option>
                        <option value="bakterisida">Bakterisida</option>
                        <option value="lainnya">Lainnya</option>
                    </select>
                    <InputError message={errors.type} className="mt-2" />
                </div>
                
                <div className="mt-4">
                    <InputLabel htmlFor="kandungan_bahan" value="Kandungan Bahan" />
                    <textarea 
                        value={data.kandungan_bahan}
                        onChange={(e) => setData('kandungan_bahan', e.target.value)}
                        name="kandungan_bahan"
                        id="kandungan_bahan"
                        className="w-full py-1 px-1 rounded-md border-gray-300 border-[1px] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 "
                    />
                    <InputError message={errors.kandungan_bahan} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="metode_penggunaan" value="Metode Penggunaan" />
                    <textarea 
                        value={data.metode_penggunaan}
                        onChange={(e) => setData('metode_penggunaan', e.target.value)}
                        name="metode_penggunaan"
                        id="metode_penggunaan"
                        className="w-full py-1 px-1 rounded-md border-gray-300 border-[1px] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 "
                    />
                    <InputError message={errors.metode_penggunaan} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="dosis" value="Dosis" />
                    <textarea 
                        value={data.dosis}
                        onChange={(e) => setData('dosis', e.target.value)}
                        name="dosis"
                        id="dosis"
                        className="w-full py-1 px-1 rounded-md border-gray-300 border-[1px] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 "
                    />
                    <InputError message={errors.dosis} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="kadaluarsa" value="Kadaluarsa" />

                    <TextInput
                        id="kadaluarsa"
                        type="date"
                        name="kadaluarsa"
                        value={formatDate(data.kadaluarsa)}
                        className="mt-1 block w-full"
                        autoComplete="kadaluarsa"
                        onChange={(e) => setData('kadaluarsa', e.target.value)}
                    />

                    <InputError message={errors.nama} className="mt-2" />
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