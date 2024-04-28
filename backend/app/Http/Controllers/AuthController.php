<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function Login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password,  $user->password)) {
            return response()->json(['message' => 'your email or password is wrong', 'status' => 401]);
        }

        $token = $user->createToken($user->fname)->plainTextToken;
        return response()->json(['message' => 'You are logged in successfully', 'token' => $token, 'status' => 200]);
    }

    public function Register(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'fname' => ['required', 'max:30', 'min:3'],
            'lname' => ['required', 'max:30', 'min:3'],
            'email' => ['required', 'email', 'max:200'],
            'password' => ['required', 'min:8'],
            'country' => ['required']
        ]);
        if ($validate->fails()) {
            return response()->json(['error' => $validate->errors(), 'status' => 401]);
        }

        $user = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'email' => $request->email,
            'password' => $request->password,
            'country' => $request->country,
        ]);
        $token = $user->createToken($request->fname)->plainTextToken;
        return response()->json(['message' => 'You are signed up successfully', 'token' => $token, 'user' => $user, 'status' => 200]);
    }
    public function Logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully', 'status' => 200]);
    }
}
