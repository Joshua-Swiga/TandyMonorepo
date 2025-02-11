<?php

namespace App\Http\Controllers;
use App\Models\CustomUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Unit;
use App\Models\Location;
use App\Models\image;
use App\Models\Amenities;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileCannotBeAdded;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;
use Spatie\MediaLibrary\MediaCollections\Exceptions\InvalidBase64Data;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::all();

        if ($user->count() != 0){
            return response()->json([
                'status'=>200,
                'data'=>$user
            ]);
        }else{
            return response()->json([
                'status'=>400,
                'message'=>'user table empty!'
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $data = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:30',
            'email' => 'required|email|unique:users,email',
            'phone_number' => 'nullable|string',
            'password' => 'required|string|min:8',
            'is_admin' => 'required|boolean',
            'profile_photo' => 'nullable|string',
            'description' => 'nullable|string|min:3',
            'general_property_overview' => 'nullable|string|min:3'
        ]);

        // if ($data->fails()) {
        //     return response()->json([
        //         'status' => 400,
        //         'message' => 'Failed to create user',
        //         'errors' => $data->errors(),
        //     ], 400);
        // }

        $validatedData = $data->validated();

        // Create the user with the validated data
        $created_user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone_number' => $validatedData['phone_number'],
            'password' => $validatedData['password'],
            'is_admin' => filter_var($validatedData['is_admin'], FILTER_VALIDATE_BOOLEAN),
            'description' => $validatedData['description'] ?? null,
            'general_property_overview' => $validatedData['general_property_overview'] ?? null
        ]);

        if (!empty($validatedData['profile_photo'])) {
            $fileName = Str::slug($created_user->name).'-avatar.'.$this->getImageExtensionFromBase64($validatedData['profile_photo']);

            $created_user
                ->addMediaFromBase64($validatedData['profile_photo'])
                ->usingFileName($fileName)
                ->toMediaCollection('avatars');
        }


        if ($created_user) {
            return response()->json([
                'status' => 201,
                'message' => 'User Created',
                'user' => $created_user->load('avatars')
            ], 201);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'User creation failed',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);

        if ($user){
            return response()->json([
                'status'=>200,
                'user'=> $user
            ], 200);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'user not found',
                'errors'=>$user->errors()
            ], 404);
        }

        return response()->json([
            '500'=>'Custom Error message!'
        ]);

    }

    // For displying unit data
    public function profileDetails(Request $request)
    {
        $username = $request->header('username'); // gets the username for query set
        $user = User::where('name', $username)->with('avatars')->first(); // gets the first occurrence of the name sent

        if ($user) {
            // Gets all the units belonging to that user
            $units = Unit::where('user_id', $user->id)->with('images')->get();

            // Initialize arrays for storing related data
            $unitDetails = [];

            // Loop through units to get related rows of foreign keys
            foreach ($units as $unit) {
                $location = Location::where('unit_id', $unit->id)->first();
                $images = $unit->images->all();
                $amenities = Amenities::where('unit_id', $unit->id)->first();

                $unitDetails[] = [
                    'unit' => $unit,
                    'location' => $location,
                    'images' => $images,
                    'amenities' => $amenities
                ];
            }

            return response()->json([
                'status' => 200,
                'user' => $user,
                'units' => $unitDetails
            ]);

        } else {
            return response()->json([
                'status' => 404,
                'message' => 'User not found!'
            ], 404);
        }
    }

    public function signin(Request $request){
        $username = $request->username;
        $password = $request->password;

        $user = User::where('name', $username)->first();

        if ($user && ($password === $user->password)){
            return response()->json([
                'status' => 200,
                'message' => 'Success'
            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'Invalid credentials',
            ]);
        }
    }

          /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
    $user = User::find($id);

    if ($user) {
        $data = Validator::make($request->all(), [

            'name' => 'required|string|min:3|max:30',
            'email' => 'required|email|unique:users,email,' . $id, // email will be unique except for the current user's email
            'phone_number'=>'',
            'password' => 'required|string|min:8',
            'is_admin' => 'required|boolean',
            'profile_photo' =>'',
            'description'=>'string|min:3',
            'general_property_overview'=>'string|min:3'

        ]);

        if ($data->fails()) {
            return response()->json([
                'status' => 400,
                'message' => 'Failed to validate!',
                'errors' => $data->errors()
            ]);
        } else {
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone_number'=>$request->phone_number,
                'password' => $request->password,
                'is_admin' =>  $request->is_admin,
                'profile_photo'=>$request->profile_photo,
                'description'=>$request->description,
                'general_property_overview'=>$request->general_property_overview,
            ]);

            return response()->json([
                'status' => 200,
                'user' => $user
            ]);
        }
    } else {
        return response()->json([
            'status' => 404,
            'message' => 'User not found!'
        ]);
    }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if ($user){
            $user->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Deleted'
            ]);

        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Faild'
            ]);
        }
    }
    protected function getImageExtensionFromBase64($base64String) {
        if (preg_match('/^data:image\/(\w+);base64,/', $base64String, $matches)) {
            return $matches[1];
        }

        return 'jpg';
    }
}
