<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitImageController extends Controller
{
    public function __invoke(Request $request)
    {
        $unit = Unit::find($request->unitId);

        if ($unit && $request->has('image')) {
            $unit->addMediaFromBase64($request->image)
                ->toMediaCollection('images');

            return response()->json([
                'status' => 200,
                'message' => 'Image added',
                'errors' => [],
            ], 200);
        }

        return response()->json([
            'status' => 400,
            'message' => 'Could not add image',
            'errors' => [],
        ], 400);
    }
}
