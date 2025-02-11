<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Amenities;
use Illuminate\Support\Facades\Validator;



class amenitiesClass extends Controller
{
    public function amenityIndex(){
        $amenities = Amenities::all();

        return response()->json([
            'status'=>200,
            'amenities'=>$amenities
        ]);
    }

    public function editAmenity(Request $request, int $id)
    {

    if ($request) {
        $amenity = Amenities::find($id);

        if ($amenity) {
            $validation_attempt = Validator::make($request->all(), [
                'amenities' => 'string',
                'unit_id' => ''
            ]);

            if ($validation_attempt->fails()) {
                return response()->json([
                    'message' => 'Failed to Validate',
                    'errors' => $validation_attempt->errors()
                ], 400);
            } else {
                $updateAttempt = $amenity->update($request->all());

                if ($updateAttempt) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'Amenity Updated Successfully!'
                    ]);
                } else {
                    return response()->json([
                        'status' => 400,
                        'message' => 'Amenity not updated!'
                    ], 400);
                }
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Amenity not found!'
            ], 404);
        }
    } else {
        return response()->json([
            'status' => 400,
            'message' => 'Unit ID not provided in header!'
        ], 400);
    }
    }
}
