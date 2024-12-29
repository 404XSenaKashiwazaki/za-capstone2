<?php

namespace App\Http\Controllers;

use App\Models\Backend\Posts;
use App\Models\DataPasar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DataPasarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = DB::table("data_pasars")->join("tanaman","data_pasars.tanamanId","=","tanaman.id")->select("data_pasars.*","tanaman.nama AS tanaman","tanaman.gambar")->orderBy("id","DESC")->get();
        $users = Auth::getUser();
        return Inertia::render("Market/Index",[
            "title" =>  "Data Pasar",
            "d" => $data,
            "users" => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function getTanaman()
    {
        $data = Posts::all();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function search(Request $request)
    {
        $data = DB::table("data_pasars")->join("tanaman","data_pasars.tanamanId","=","tanaman.id")->select("data_pasars.*","tanaman.nama AS tanaman","tanaman.gambar")->where("data_pasars.permintaan_pasar","like", "%". $request->input("search") . "%")->orWhere("tanaman.nama","like", "%". $request->input("search") . "%")->orderBy("id","DESC")->get();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $data = DataPasar::where("nama","like", "%". $request->input("search") . "%")->orderBy("id","DESC")->get();
        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "permintaan_pasar" => "required|string|max:255",
            "harga" => "required|string|max:255",
            "tanamanId" => "required"
        ]);

        DataPasar::create($request->all());
        return Redirect::route('market')->with('message', "Data berhasil disimpan");
    }

    /**
     * Display the specified resource.
     */
    public function show(DataPasar $dataPasar)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DataPasar $dataPasar)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DataPasar $dataPasar)
    {
        $request->validate([
            "permintaan_pasar" => "required|string|max:255",
            "harga" => "required|string|max:255",
            "tanamanId" => "required"
        ]);

        $data = DataPasar::findOrFail($request->id);
        $data->update($request->all());
        return Redirect::route('market')->with('message', "Data berhasil diupdate");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DataPasar $dataPasar)
    {
        $dataPasar->delete();
        return Redirect::route('market')->with('message', "Data berhasil dihapus");
    }
}
