<?php

use App\Models\post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountsController;
use App\Http\Controllers\Admin;
use App\Models\accounts;
use App\Models\users;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\DB;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get("/control", function() {
    return DB::select("SELECT * FROM `posts` ORDER BY `posts`.`id` DESC");
});


Route::get("", function() {
    return ["message"=>"helo"];
});

Route::post("/registration", function () {


    request()->validate([
        "first_name" => "required",
        "last_name" => "required",
        "country" => "required",
        "email" => "required",
        "mobile" => "required",
        "dob" => "required",
        "password" => "required",
        "confpassword" => "required",
    ]);

    $firstname = request("first_name");
    $lastname = request("last_name");
    $country = request("country");
    $email = request("email");
    $mobile = request("mobile");
    $dob = request("dob");
    $password = request("password");
    $confirmpassword = request("confpassword");



    if ($password == $confirmpassword) {
        if (count(users::where("email", $email)->get()) == 0 && count(users::where("mobile", $mobile)->get()) == 0) {
            $sucess = users::create(
                [
                    "firstname" => $firstname,
                    "lastname" => $lastname,
                    "country" => $country,
                    "email" => $email,
                    "mobile" => $mobile,
                    "dob" => $dob,
                    "password" => Hash::make($password),
                    "remember_token" => Str::random(12),
                    "ip_address"=>request()->ip(),
                ]
            );
            if ($sucess) {
                $id = users::where("email", $email)->first()->id;
                accounts::create(
                    [
                        "user_id" => $id,
                        "photo_path" => "",

                    ]
                );
                return true;
            } else {
                ["message" => "something went wrong"];
            }
        } else {
            return ["message" => "email or mobile already taken"];
        }
    } else {
        return ["message" => "password does not match"];
    }
});


Route::post("/login", function (Request $request) {

    $validation = Validator::make($request->all(), [
        "email"=>"required",
        "password"=>"required",
    ]);


    if(count($validation->errors())==0) {

        $email = request("email");
        $password = request("password");
        if (count(users::where("email", $email)->get())!=0){
            if (users::where("email", $email)->first()->activate) {
                $userHasedPassword = users::select("password")->where("email", $email)->first();
                if (Hash::check($password, $userHasedPassword->password)) {
                    return true;
                } else {
                    return ["message"=>"Invalid Credentials"];
                }
            } else {
                return ["message"=>"Your account is deactivated"];
            }
        } else {
            return ["message"=>"No such account exists"];
        }
     
    
    } else {
        return $validation->errors();
    }



    // if (Hash::check($password, $userHasedPassword)) {
    //     return true;
    // } else {
    //     return false;
    // }
    // if (count(users::where("email", $email)->where("password", $password)->get()) != 0) {
    //     return true;
    // } else {
    //     return ["message"=>"$email $password"];
    // }
});


Route::get("/returnPublicPath", function(Request $request) {
    return public_path();
});

Route::post("/createpost", function (Request $request) {
    $user_id = request("user_id");
    $user_name = request("username");
    $text = request("text");
    $file = $request->file("file");
    $file->move(base_path() . "/uploads", $file->getClientOriginalName());
    $likes = 0;

    $filetype = "";

    if ($file->getClientOriginalExtension() == "png" || $file->getClientOriginalExtension() == "jpg" || $file->getClientOriginalExtension() == "jpeg") {
        $filetype = "image";
    } else if ($file->getClientOriginalExtension() == "webm" || $file->getClientOriginalExtension() == "mp4" || $file->getClientOriginalExtension() == "mpeg" || $file->getClientOriginalExtension() == "mkv") {
        $filetype = "video";
    }

    post::create([
        "user_id" => $user_id,
        "name" => $user_name,
        "text" => $text,
        "media" => "/uploads/" . $file->getClientOriginalName(),
        "likes" => $likes,
        "filetype" => $filetype,
    ]);

    return true;

    //    return base_path();
    //    return move_uploaded_file($name, "/home/imdigitalashish/");
});


Route::post("/uploadProfilePicture", function(Request $request){
    try {
        $file = $request->file("profilePicture");
        $user_id = $request->post("id");

        $file->move(base_path()."/uploads/profilePicture", $file->getClientOriginalName());
        return accounts::where("id", $user_id)->update(["photo_path"=>"/uploads/profilePicture/".$file->getClientOriginalName()]);
    } catch (Exception $e) {
        return ["message"=>$e];
    }
 
});




Route::get('/getUser', function (Request $request) {
    $email = request("email");
    return users::where("email", $email)->first();
});


Route::post('/updateLikes', function (Request $request) {
    $post_id = request("id");
    $like = post::select("likes")->where("id", $post_id)->first();
    $like = $like["likes"] + 1;
    post::where("id", $post_id)->update(["likes" => $like]);
    return true;
});




Route::post("/updateProfile", function () {


    return users::where("id", request("id"))->update([
        "firstname" => request("firstname"),
        "lastname" => request("lastname"),
        "country" => request("country"),
        "email" => request("email"),
        "mobile" => request("mobile"),
        "dob" => request("dob"),
        "tagline"=>request("tagline"),
    ]);
});


Route::get("/listOfPosts", function () {
    return post::where("active", 1)->orderBy("created_at", "desc")->paginate(3);
});

Route::post("/uploadCsv", [Admin::class, "importFromExcel"]);

// ACCOUNTS ACTIONS 

Route::get("/accounts/getprofile", [AccountsController::class, "getProfile"]);
Route::post("/acounts/addWork", [AccountsController::class, "addWorkHistory"]);
Route::post('/accounts/addEducation', [AccountsController::class, "addEducationHistory"]);
Route::post("/accounts/deleteWork", [AccountsController::class, "deleteWorkExperience"]);
Route::post("/accounts/deleteEducation", [AccountsController::class, "deleteEducationHistory"]);
Route::post("/accounts/deletePost", [AccountsController::class, "deletePost"]);
Route::get("/accounts/checkActive", [AccountsController::class, "checkWhetherUserIsActive"]);
Route::get("/accounts/checkData/{id}", [AccountsController::class, "getValidatedData"]);
// ADMIN DASHBOARDS HERE

Route::get("/admin/listUsers", [Admin::class, "listUsers"]);
Route::get("/admin/downloadUsers", [Admin::class, "downloadUsers"]);
Route::get("/admin/listPost", [Admin::class, "listAllPost"]);
Route::post("/admin/deactivate", [Admin::class, "deactivateUserAccount"]);
Route::post("/admin/activate", [Admin::class, "activateUserAccount"]);
Route::post("/admin/deactivatePost", [Admin::class, "deactivatePost"]);
Route::post("/admin/activatePost", [Admin::class, "activatePost"]);
Route::get("/admin/downloadPosts", [Admin::class, "downloadPosts"]);


// COMMENTS

Route::post('/post/addComment', [CommentController::class, "addComment"]);
Route::get('/post/listOfComments', [CommentController::class, "getAllComments"]);