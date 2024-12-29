import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { router, useForm } from '@inertiajs/react'


const FormPage = ({ setIsOpen, isOpen,id,dataForm, setDataForm, setId}) => {
    const { data, setData, post, processing, errors, reset,setError } = useForm({
        nama: dataForm ? dataForm.nama : "",
        kode: dataForm ? dataForm.kode : "",
        remember: false,
    });
    const submit = (e) => {
        e.preventDefault();
        (id) ? router.put(route('prodi.update',id), data,{

            onSuccess: () => {
                setDataForm(null)
                setId(null)
                setIsOpen(false)
            },
            onError: (err) => setError(err)
        }) : post(route('prodi.store'), {
            onSuccess: () => {
                setDataForm(null)
                setId(null)
                setIsOpen(false)
            }
        });
    };
    if(!isOpen) return <></>
    return <div className="bg-white rounded-lg shadow-lg z-50 w-full p-6">
        <div className="mb-4 text-lg font-medium text-slate-600">
            Form { dataForm ? `Edit` : `Tambah`} Prodi
        </div>
        <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="kode" value="Kode Prodi" />

                    <TextInput
                        id="kode"
                        type="text"
                        name="kode"
                        value={data.kode}
                        className="mt-1 block w-full"
                        autoComplete="kode"
                        isFocused={true}
                        onChange={(e) => setData('kode', e.target.value)}
                    />

                    <InputError message={errors.kode} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="nama" value="Nama Prodi" />

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

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        { dataForm ? `Update` : `Simpan` }
                    </PrimaryButton>
                </div>
            </form>
    </div>
}


export default FormPage