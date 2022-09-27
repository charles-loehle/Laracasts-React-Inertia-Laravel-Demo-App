<?php

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/users', function () {
    $requestExists = Request::input('search') !== null ? true : false;
    //dd($requestExists);
    // begin query by using query
    return Inertia::render('Users/Index', [
        'users' => User::query()
            ->when(Request::input('search'), function ($query, $search) {
              $query->where('name' , 'like', "%{$search}%");
            })
            ->paginate(10)
            ->withQueryString(), // pagination helper 
        
        
        // 'request search' => Request::input('search')
        // 'users' => User::query()
        //     ->paginate(10)
        //     ->through(fn($user) => ['id' => $user->id, 'name' => $user->name])
        ]);
})->middleware(['auth', 'verified'])->name('users');

// show create user form 
Route::get('/users/create', function () {
    return Inertia::render('Users/Create');
})->middleware(['auth', 'verified'])->name('create-user');

// Create new user (password is hashed in Models/User)
Route::post('/users', function () {
  $attributes = Request::validate([
    'name' => 'required',
    'email' => ['required', 'email'],
    'password' => 'required',
  ]);
  User::create($attributes);
  return redirect('/users')->with('message', 'New user created!');
});

Route::get('/settings', function () {
    return Inertia::render('Settings');
})->middleware(['auth', 'verified'])->name('settings');

require __DIR__.'/auth.php';