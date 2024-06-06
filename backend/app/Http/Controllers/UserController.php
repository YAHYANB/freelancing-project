<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index(Request $request)
    {
        try {
            $user = $request->user();
            $user = User::with([
                'skills',
                'languages',
                'boughtPayments',
                'soldPayments',
                'boughtOrders.buyer',
                'boughtOrders.seller',
                'soldOrders.buyer',
                'soldOrders.seller',
                'reviews',
                'gigs',
                'payouts'
            ])->findOrFail($user->id);

            return response()->json($user);
        } catch (\Exception $err) {
            return response()->json(['error' => 'error occured while fetching user', $err->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.

     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $rules = [
            'description' => ['max:300'],
            'displayName' => ['max:15'],
            'bio' => ['max:100'],
            'url' => ['nullable', 'url'],
            'fname' => ['max:30', 'min:3'],
            'lname' => ['max:30', 'min:3'],
            'email' => ['unique:users', 'email', 'max:200'],
            'password' => ['min:8'],
            'country' => []
        ];

        if ($request->hasFile('profileImg')) {
            $rules['profileImg'] = ['image', 'mimes:jpeg,png,jpg,gif'];
        }
        
        $validator = Validator::make($request->all(), $rules);



        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $request->user();
        $dataToUpdate = [];

        if ($request->hasFile('profileImg')) {
            $profileImg = uniqid() . '.' . $request->profileImg->extension();
            $request->profileImg->move(public_path('images/profile/'), $profileImg);
            $dataToUpdate['profileImg'] = $profileImg;
        }

        if ($request->has('description')) {
            $dataToUpdate['description'] = $request->description;
        }

        if ($request->has('displayName')) {
            $dataToUpdate['displayName'] = $request->displayName;
        }

        if ($request->has('bio')) {
            $dataToUpdate['bio'] = $request->bio;
        }

        if ($request->has('url')) {
            $dataToUpdate['url'] = $request->url;
        }
        if ($request->has('fname')) {
            $dataToUpdate['fname'] = $request->fname;
        }

        if ($request->has('lname')) {
            $dataToUpdate['lname'] = $request->lname;
        }

        if ($request->has('email')) {
            $dataToUpdate['email'] = $request->email;
        }

        if ($request->has('country')) {
            $dataToUpdate['country'] = $request->country;
        }

        if ($request->has('oldPwd')) {
            if (!Hash::check($request->oldPwd, $user->password)) {
                return response()->json(['message' => 'your password is wrong', 'status' => 401]);
            }
            $dataToUpdate['password'] = $request->password;
        }

        $user->update($dataToUpdate);
        return response()->json(['user' => $user, 'status' => 200]);
    }


    public function verify(Request $request, User $user)
    {
        $user = $request->user();
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'your password is wrong', 'status' => 401]);
        }
        return response()->json(['message' => 'next']);
    }

    public function destroy(Request $request)
    {
        $user = $request->user();
        $user->profileImg = null;
        $user->save();

        return response()->json(['message' => 'Profile picture deleted successfully']);
    }
}