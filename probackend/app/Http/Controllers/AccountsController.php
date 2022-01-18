<?php

namespace App\Http\Controllers;

use App\Models\education;
use App\Models\post;
use App\Models\work;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\users;
class AccountsController extends Controller
{
    //

    public function getProfile(Request $request)
    {
        $data =  DB::table("users")
            ->select("*")->join("accounts", "users.id", "=", "accounts.user_id")
            ->where("users.id", $request->get("user_id"))->first();
        $data->education_history = education::where("user_id", $data->user_id)->get();
        $data->work_history = work::where("user_id", $data->user_id)->get();
        // $data->work_history = $data->work_history + $data->education_history;
        return $data;
        
    }


    public function addWorkHistory(Request $request) {
        $validator = Validator::make($request->all(), [
            "user_id"=>"required",
            "company_name"=>"required",
            "position"=>"required",
            "start_date"=>"required",
            // "end_date"=>"required",
        ]);

        if (count($validator->errors())==0) {
            work::create(["user_id"=>request("user_id"),
            "company_name"=>request("company_name"),
            "position"=>request("position"),
            "start_date"=>request("start_date"),
            "end_date"=>request("end_date")]);
            return true;
        } else {
            return $validator->errors();
        }

    }


    public function addEducationHistory(Request $request) {
        $validator = Validator::make($request->all(), [
            "user_id"=>"required",
            "college_name"=>"required",
            "degree"=>"required",
            "specialization"=>"required",
            "start_date"=>"required",
            "end_date"=>"required",
            // "end_date"=>"required",
        ]);

        if(count($validator->errors())==0) {
            education::create(
                [
                    "user_id"=>request("user_id"),
                    "college_name"=>request("college_name"),
                    "degree"=>request("degree"),
                    "specialization"=>request("specialization"),
                    "start_date"=>request("start_date"),
                    "end_date"=>request("end_date"),
                ]
                );
                return true;
        } else {
            return $validator->errors();
        }
    }



    public function deleteWorkExperience() {
        $id = request("id");
        return work::where("id", $id)->delete();
    }

    public function deleteEducationHistory() {
        $id = request("id");
        return education::where("id", $id)->delete();
    }



    public function deletePost(Request $request) {
        $id_of_post = $request->post("id");

        return post::where("id", $id_of_post)->delete();
    }

    public function checkWhetherUserIsActive(Request $request) {
        return ["result"=>users::where("id", $request->get("id"))->first()->activate];
    }

    public function getValidatedData($id) {
        return response()->json(["message"=>$id]);
    }



        


}
