<?php

namespace App\Http\Controllers;

use App\Models\Backend\Mhs;
use App\Models\Pestida;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PestidaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = DB::table("pestidas")->join("hama","pestidas.hamaId","=","hama.id")->select("pestidas.*","hama.nama AS hama")->orderBy("id","DESC")->get();
        $users = Auth::getUser();
        return Inertia::render("Pestisida/Index",[
            "title" =>  "Pestisida",
            "d" => $data,
            "users" => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function search(Request $request)
    {
        $data =  DB::table("pestidas")->join("hama","pestidas.hamaId","=","hama.id")->select("pestidas.*","hama.nama AS hama")->where("pestidas.nama","like", "%". $request->input("search") . "%")->orWhere("hama.nama","like", "%". $request->input("search") . "%")->orderBy("id","DESC")->get();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

     /**
     * Show the form for creating a new resource.
     */
    public function getHama()
    {
        $mhs = Mhs::all();
        return response()->json($mhs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $request->validate([
            "nama" => "required|string|max:255",
            "type" => "required|string|max:255",
            "gambar" => "exclude_if:gambar,null|image|mimes:jpg,png,jpeg,jfif|max:2048",
            "hamaId" => "required",
            "kandungan_bahan" => "required|string",
            "metode_penggunaan" => "required|string",
            "dosis" => "required|string",
            "kadaluarsa" => "required"
        ]);
        if($request->hasFile("gambar")) {
            $file = $request->file('gambar');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = Storage::disk('image')->putFileAs('image', $file, $fileName);
        }else{
            $filePath = "image/default.jpg";
        }
        Pestida::create([
            "nama" => $request->nama,
            "type" => $request->type,
            "hamaId" => $request->hamaId,
            "kandungan_bahan" => $request->kandungan_bahan,
            "metode_penggunaan" => $request->metode_penggunaan,
            "dosis" => $request->dosis,
            "kadaluarsa" => $request->kadaluarsa,
            "gambar" => $filePath
        ]);
        return Redirect::route('pestisida')->with('message', "Data berhasil disimpan");
    }

    /**
     * Display the specified resource.
     */
    public function show(Pestida $pestida)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pestida $pestida)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pestida $pestida)
    {
        $request->validate([
            "nama" => "required|string|max:255",
            "type" => "required|string|max:255",
            "gambar" => ['nullable',"image",
                    "mimes:jpg,png,jpeg,jfif",
                    "max:2048"],
            "hamaId" => "required",
            "kandungan_bahan" => "required|string",
            "metode_penggunaan" => "required|string",
            "dosis" => "required|string",
            "kadaluarsa" => "required"
        ]);

        $data = Pestida::findOrFail($request->id);
        if($request->hasFile("gambar")) {
            $file = $request->file('gambar');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = Storage::disk('image')->putFileAs('image', $file, $fileName);
            if(Storage::disk("image")->exists($data->gambar) && $data->gambar != "image/default.jpg") Storage::disk("image")->delete($data->gambar);
        }else{
            $filePath = $data->gambar;
        }
        $data->update([
            "nama" => $request->nama,
            "type" => $request->type,
            "hamaId" => $request->hamaId,
            "kandungan_bahan" => $request->kandungan_bahan,
            "metode_penggunaan" => $request->metode_penggunaan,
            "dosis" => $request->dosis,
            "kadaluarsa" => $request->kadaluarsa,
            "gambar" => $filePath
        ]);
        return Redirect::route('pestisida')->with('message', "Data berhasil diupdate");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pestida $pestida)
    {
        if(Storage::disk("image")->exists($pestida->gambar) && $pestida->gambar != "image/default.jpg") Storage::disk("image")->delete($pestida->gambar);
        $pestida->delete();
        return Redirect::route('pestisida')->with('message', "Data berhasil dihapus");
    }
}
