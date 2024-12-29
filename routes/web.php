<?php

use App\Http\Controllers\ProfileController;
use App\Http\Middleware\RoleMiddleware;
use App\Models\Backend\Posts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::post('/dashboard-search', function (Request $request) {
    $data = DB::table("data_pasars")->join("tanaman","data_pasars.tanamanId","=","tanaman.id")->select("data_pasars.*","tanaman.*")->where("data_pasars.permintaan_pasar","like", "%". $request->input("search") . "%")->orWhere("tanaman.nama","like", "%". $request->input("search") . "%")->orderBy("data_pasars.id","DESC")->get();
    return response()->json($data);
})->middleware(['auth', 'verified'])->name('dashboard.search');

Route::get('/', function (Request $request) {
    $data = DB::table("data_pasars")->join("tanaman","data_pasars.tanamanId","=","tanaman.id")->select("data_pasars.*","tanaman.*")->where("data_pasars.permintaan_pasar","like", "%". $request->input("search") . "%")->orWhere("tanaman.nama","like", "%". $request->input("search") . "%")->orderBy("data_pasars.id","DESC")->get();
    $users = Auth::getUser();
    $tanaman = DB::table("tanaman")->count();
    $hama = DB::table("hama")->count();
    $pestisida = DB::table("pestidas")->count();
    $market = DB::table("data_pasars")->count();
    return Inertia::render('Dashboard',[
        "title" => "Dashboard",
        "d" => $data, 
        "users" => $users,
        "tanaman" => $tanaman,
        "hama" => $hama,
        "pestisida" => $pestisida,
        "market" => $market
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', function (Request $request) {
    $users = Auth::getUser();
    $data = DB::table("data_pasars")->join("tanaman","data_pasars.tanamanId","=","tanaman.id")->select("data_pasars.*","tanaman.*")->where("data_pasars.permintaan_pasar","like", "%". $request->input("search") . "%")->orWhere("tanaman.nama","like", "%". $request->input("search") . "%")->orderBy("data_pasars.id","DESC")->get();
    $tanaman = DB::table("tanaman")->count();
    $hama = DB::table("hama")->count();
    $pestisida = DB::table("pestidas")->count();
    $market = DB::table("data_pasars")->count();
    return Inertia::render('Dashboard',[
        "title" => "Dashboard",
        "d" => $data, 
        "users" => $users,
        "tanaman" => $tanaman,
        "hama" => $hama,
        "pestisida" => $pestisida,
        "market" => $market
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/posts.php';
require __DIR__."/mhs.php";
require __DIR__."/market.php";
require __DIR__."/tanaman.php";