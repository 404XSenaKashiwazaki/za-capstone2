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
        permintaan_pasar: dataForm ? dataForm.permintaan_pasar : "",
        tanamanId: dataForm ? dataForm.tanamanId : "",
        harga: dataForm ? dataForm.harga : "",
    });

    useEffect(() => {
        const getProdi = async () => {
            try {
                const { data } = await axios.get(route("market.tanaman"))
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
        
        (id) ? router.post(route('market.update',id),{   _method: 'put', ...data },{
            onSuccess: () => {
                setDataForm(null)
                setId(null)
                setIsOpen(false)
            },
            onError: (err) => setError(err)
        }) : post(route('market.store'), {
            forceFormData: true,
            onSuccess: () => {
                setDataForm(null)
                setId(null)
                setIsOpen(false)
            }
        })
    }

    
    if(!isOpen) return <></>
    return <div className="bg-white rounded-lg shadow-lg z-50 w-full p-6">
        <div className="mb-4 text-lg font-medium text-slate-600">
            Form { dataForm ? `Edit` : `Tambah`} Data Permintaan Pasar
        </div>
        <form onSubmit={submit}> 
                <div className="mt-4">
                    <InputLabel htmlFor="tanamanId" value="Produk" />
                    <select
                        id="tanamanId"
                        name="tanamanId"
                        value={data.tanamanId}
                        className="mt-1 block w-full"
                        autoComplete="Hama"
                        onChange={(e) => setData('tanamanId', e.target.value)}
                    >
                        <option value="">-- Pilih Produk --</option>
                        { prodi.length > 0 && prodi.map(e=> <option key={e.id} value={ e.id }>{ e.nama }</option>) }
                    </select>
                    <InputError message={errors.tanamanId} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="permintaan_pasar" value="Permintaan Pasar" />

                    <select
                        id="permintaan_pasar"
                        name="permintaan_pasar"
                        value={data.permintaan_pasar}
                        className="mt-1 block w-full"
                        autoComplete="permintaan_pasar"
                        onChange={(e) => setData('permintaan_pasar', e.target.value)}
                    >   
                        
                    <option value="">-- Pilih Permintaan --</option>
                    <option value="Lokal">Lokal</option>
                    <option value="Nasional">Nasional</option>
                    </select>
                    <InputError message={errors.permintaan_pasar} className="mt-2" />
                </div>

            
                <div className="mt-4">
                    <InputLabel htmlFor="harga" value="Harga" />
                    <textarea 
                        value={data.harga}
                        onChange={(e) => setData('harga', e.target.value)}
                        name="harga"
                        id="harga"
                        className="w-full py-1 px-1 rounded-md border-gray-300 border-[1px] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 "
                    />
                    <InputError message={errors.harga} className="mt-2" />
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