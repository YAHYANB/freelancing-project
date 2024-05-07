<?php

namespace App\Http\Controllers;

use App\Models\Gig;
use App\Models\GigFeatures;
use App\Models\GigImages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class GigController extends Controller
{
    public function index()
    {
        try {
            $gigs = Gig::with(['images', 'features','user','reviews'])->get();
            return response()->json(['gigs' => $gigs, 'status' => 200]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage(), 'status' => 404]);
        }
    }
    public function store(Request $request)
    {
        // return response()->json(['response' => $request->all()]);

        DB::beginTransaction();
        try {
            $validate = Validator::make($request->all(), [
                'user_id' => ['required'],
                'title' => ['required', 'max:200'],
                'category' => ['required'],
                'coverImage' => ['required', 'image'],
                'description' => ['required'],
                'serviceTitle' => ['required'],
                'shortDescription' => ['required'],
                'deliveryTime' => ['required'],
                'revisionNumber' => ['required'],
                'price' => ['required'],
                'images.*' => ['required', 'image', 'mimes:jpeg,png,jpg,gif'],
                'images' => ['required', 'array', 'min:4', 'max:8'],
                'features' => ['required', 'array', 'max:4', 'min:1']
            ]);

            if ($validate->fails()) {
                return response()->json(['error' => $validate->errors(), 'status' => 401]);
            }
            if ($request->has('coverImage')) {
                $coverImageName = uniqid() . '.' . $request->coverImage->extension();
                $request->coverImage->move(public_path('images/gigs/coverImages'), $coverImageName);
            }
            $gig = Gig::create([
                'user_id' => $request->user_id,
                'title' => $request->title,
                'category' => $request->category,
                'coverImage' => $coverImageName,
                'description' => $request->description,
                'serviceTitle' => $request->serviceTitle,
                'shortDescription' => $request->shortDescription,
                'deliveryTime' => $request->deliveryTime,
                'revisionNumber' => $request->revisionNumber,
                'price' => $request->price
            ]);
            if ($request->has('images')) {
                foreach ($request->images as $image) {
                    $imageName = uniqid() . '.' . $image->extension();
                    $image->move(public_path('images/gigs/images'), $imageName);
                    GigImages::create([
                        'gig_id' => $gig->id,
                        'image' => $imageName
                    ]);
                }
            }
            if ($request->has('features')) {
                foreach ($request->features as $feature) {
                    GigFeatures::create([
                        'gig_id' => $gig->id,
                        'feature' => $feature
                    ]);
                }
            }
            DB::commit();
            return response()->json(['message' => 'The announce was created successfully', 'status' => 201]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Failed to create the gig.', 'details' => $e->getMessage(), 'status' => 500]);
        }
    }
    public function update(Request $request, $id)
    {
        // return response()->json(['response' => $request->all(), 'id'=> $id]);

        DB::beginTransaction();
        try {
            $gig = Gig::find($id);
            if (!$gig) {
                return response()->json(['error' => 'Gig not found.', 'status' => 404]);
            }

            $rules = [
                'user_id' => ['required'],
                'title' => ['required', 'max:200'],
                'category' => ['required'],
                'description' => ['required'],
                'serviceTitle' => ['required'],
                'shortDescription' => ['required'],
                'deliveryTime' => ['required'],
                'revisionNumber' => ['required'],
                'price' => ['required'],
                'images.*' => 'image|mimes:jpeg,png,jpg,gif',
                'images' => 'array|min:4|max:8',
                'features' => ['required', 'array', 'max:4', 'min:1']
            ];
            if ($request->hasFile('coverImage')) {
                $rules['coverImage'] = ['image'];
            }
            $validate = Validator::make($request->all(), $rules);


            if ($validate->fails()) {
                return response()->json(['error' => $validate->errors(), 'status' => 401]);
            }
            if ($request->hasFile('coverImage')) {
                $rules['coverImage'] = ['nullable', 'image'];
                $coverImageName = uniqid() . '.' . $request->coverImage->extension();
                $request->coverImage->move(public_path('images/gigs/coverImages'), $coverImageName);
                // Delete old cover image if exists
                // if ($gig->coverImage) {
                //     unlink(public_path('images/gigs/coverImages/' . $gig->coverImage));
                // }
                $gig->coverImage = $coverImageName;
            }

            $gig->user_id = $request->user_id;
            $gig->title = $request->title;
            $gig->category = $request->category;
            $gig->description = $request->description;
            $gig->serviceTitle = $request->serviceTitle;
            $gig->deliveryTime = $request->deliveryTime;
            $gig->revisionNumber = $request->revisionNumber;
            $gig->shortDescription = $request->shortDescription;
            $gig->price = $request->price;
            $gig->save();

            if ($request->has('images')) {
                // foreach ($gig->images as $image) {
                //     unlink(public_path('images/gigs/images/' . $image));
                // }
                GigImages::where('gig_id', $id)->delete();
                foreach ($request->images as $image) {
                    $imageName = uniqid() . '.' . $image->extension();
                    $image->move(public_path('images.gigs.images'), $imageName);

                    GigImages::create([
                        'gig_id' => $id,
                        'image' => $imageName
                    ]);
                }
            }
            if ($request->has('features')) {
                GigFeatures::where('gig_id', $id)->delete();
                foreach ($request->features as $feature) {
                    GigFeatures::create([
                        'gig_id' => $id,
                        'feature' => $feature
                    ]);
                }
            }

            DB::commit();
            return response()->json(['message' => 'The announce was updated successfully', 'status' => 200]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Failed to create the gig.', 'details' => $e->getMessage(), 'status' => 500]);
        }
    }
    public function show($id)
    {
        try {
            $gig = Gig::where('id', $id)->with(['images', 'features','user','reviews'])->first();

            if (!$gig) {
                return response()->json(['error' => 'Gig not found.', 'status' => 404]);
            }

            return response()->json(['gig' => $gig, 'status' => 200]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage(), 'status' => 404]);
        }
    }
    public function destroy($id)
    {
        $gig = Gig::where('id', $id)->first();

        if (!$gig) {
            return response()->json(['error' => 'Gig not found.', 'status' => 404]);
        }

        $gig->delete();
        return response()->json(['message' => 'Gig deleted successfilly', 'status' => 200]);
    }
}
