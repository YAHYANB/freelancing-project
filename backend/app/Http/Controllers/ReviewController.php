<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $validate = Validator::make($request->all(), [
                'user_id' => ['required'],
                'gig_id' => ['required'],
                'comment' => ['required'],
                'rating' => ['required', 'integer']
            ]);
            if ($validate->fails()) {
                return response()->json(['error' => $validate->errors(), 'status' => 401]);
            }

            Review::create([
                'user_id' => $request->user_id,
                'gig_id' => $request->gig_id,
                'comment' => $request->comment,
                'rating' => $request->rating,
            ]);

            return response()->json(['reviews' => 'add review success', 'status' => 201]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage(), 'status' => 404]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // return response()->json(['reviews' => $request->all()]);
        try{
            $reviews = Review::where('gig_id', $id)->with('user')->get();
            if(!$reviews){
                return response()->json(['error' => 'Not Found Any Reviews', 'status' => 401]);
            }
            return response()->json(['reviews' => $reviews, 'status' => 200]);

        }catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage(), 'status' => 404]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try{
            $review = Review::where('id', $id)->first();
            if(!$review){
                return response()->json(['error' => 'Not Found Any Reviews', 'status' => 401]);
            }
            $review->delete();
            return response()->json(['reviews' => 'review deleted success', 'status' => 200]);

        }catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage(), 'status' => 404]);
        }
    }
}
