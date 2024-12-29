<?php

namespace App\Http\Controllers\Mhs;

use App\Http\Controllers\Controller;
use App\Models\Backend\Mhs;
use App\Models\Backend\Posts;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
class MhsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) : Response
    {
        $data = Mhs::orderBy("id","DESC")->get();
        $users = Auth::getUser();
        return Inertia::render("Hama/Index",[
            "title" =>  "Hama",
            "d" => $data,
            "users" => $users
        ]);
    }

    public function search(Request $request) 
    {
        
        $mhs = Mhs::where("nama","like", "%". $request->input("search") . "%")->orderBy("id","DESC")->get();
        return response()->json($mhs);
    }

    public function getProdi(Request $request) {
        $prodi = Posts::all();
        return response()->json($prodi);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) : Response
    {

        return inertia::render("",[
            "title" => "Posts Create"
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) : RedirectResponse
    {
        $request->validate([
            "nama" => "required|string|max:255|unique:App\Models\Backend\mhs,nama",
            "gejala" => "required|string",
            "gambar" => "exclude_if:gambar,null|image|mimes:jpg,png,jpeg,jfif|max:2048",
            "pencegahan" => "required",
            // "image" => "exclude_if:image,null|image|mimes:jpg,png,jpeg,jfif|max:2048"
        ]);

        if($request->hasFile("gambar")) {
            $file = $request->file('gambar');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = Storage::disk('image')->putFileAs('image', $file, $fileName);
        }else{
            $filePath = "image/default.jpg";
        }

        Mhs::create([
            "nama" => $request->nama,
            "gejala" => $request->gejala,
            "gambar" => $filePath,
            "pencegahan" => $request->pencegahan
        ]);
        return Redirect::route('hama')->with('message', "Data berhasil disimpan");
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // dd($request->nama);
        $request->validate([
            "nama" => ['required',
                'string',
                'max:255',
                Rule::unique('hama', 'nama')->ignore($id)],
            "gambar" => ['nullable',"image",
                "mimes:jpg,png,jpeg,jfif",
                "max:2048"],
            "gejala" => ['required'],
            "pencegahan" => ["required"]
            // "image" => ['nullable',"image",
            //     "mimes:jpg,png,jpeg,jfif",
            //     "max:2048"],
        ]);
        $posts = Mhs::findOrFail($id);

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
            "jenis" => $request->jenis,
            "gejala" => $request->gejala,
            "pencegahan" => $request->pencegahan,
            "gambar" => $filePath
        ]);
        
        return Redirect::route('hama')->with('message', "Data berhasil di update");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Mhs::findOrFail($id);
        if(Storage::disk("image")->exists($post->gambar) && $post->gambar != "image/default.jpg") Storage::disk("image")->delete($post->gambar);
        $post->delete();
        return Redirect::route('hama')->with('message', "Data berhasil dihapus");
    }
}
