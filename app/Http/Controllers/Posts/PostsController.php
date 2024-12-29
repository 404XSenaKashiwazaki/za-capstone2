<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Models\Backend\Posts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) : Response
    {
        $posts = Posts::orderBy("id","DESC")->get();
        $users = Auth::getUser();
        return Inertia::render("Tanaman/Index", ["title" => "Produk", "d" => $posts,"users" => $users]);
    }

    public function search(Request $request) 
    {
        
        $mhs = Posts::where("nama","like", "%". $request->input("search") . "%")->orderBy("id","DESC")->get();
        return response()->json($mhs);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "nama" => "required|string|max:255|unique:App\Models\Backend\Posts,nama",
            "gambar" => "exclude_if:gambar,null|image|mimes:jpg,png,jpeg,jfif|max:2048",
            "jenis" => "required|string",
            "teknik_penanaman" => "required|string",
            "lingkungan" => "required|string",
            "periode_panen" => "required|string",
        ]);
        if($request->hasFile("gambar")) {
            $file = $request->file('gambar');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = Storage::disk('image')->putFileAs('image', $file, $fileName);
        }else{
            $filePath = "image/default.jpg";
        }
        Posts::create([
            "nama" => $request->nama,
            "gambar" => $filePath,
            "jenis" => $request->jenis,
            "teknik_penanaman" => $request->teknik_penanaman,
            "lingkungan" => $request->lingkungan,
            "periode_panen" => $request->periode_panen,
        ]);
        return Redirect::route('tanaman')->with('message', "Data berhasil disimpan");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request,string $id)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            "nama" => ['required',
                'string',
                'max:255',
                Rule::unique('tanaman', 'nama')->ignore($id)],
            "gambar" => ['nullable',"image",
                    "mimes:jpg,png,jpeg,jfif",
                    "max:2048"],
            "jenis" => ['required',
                'string',
                'max:255'],
            "teknik_penanaman" => ['required',
                'string',
                'max:255'],
            "lingkungan" => ['required',
                'string',
                'max:255'],
            "periode_panen" => ['required',
                'string',
                'max:255'],
        ]);
        $posts = Posts::findOrFail($id);
        if($request->hasFile("gambar")) {
            $file = $request->file('gambar');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = Storage::disk('image')->putFileAs('image', $file, $fileName);
            if(Storage::disk("image")->exists($posts->gambar) && $posts->gambar != "image/default.jpg") Storage::disk("image")->delete($posts->gambar);
        }else{
            $filePath = $posts->gambar;
        }
        $posts->update([
            "nama" => $request->nama,
            "gambar" => $filePath,
            "jenis" => $request->jenis,
            "teknik_penanaman" => $request->teknik_penanaman,
            "lingkungan" => $request->lingkungan,
            "periode_panen" => $request->periode_panen,
        ]);
        
        return Redirect::route('tanaman')->with('message', "Data berhasil di update");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Posts::findOrFail($id);
        if(Storage::disk("image")->exists($post->gambar) && $post->gambar != "image/default.jpg") Storage::disk("image")->delete($post->gambar);
        $post->delete();
        return Redirect::route('tanaman')->with('message', "Data berhasil dihapus");
    }
}
