<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\comments;
class CommentController extends Controller
{
    //

    public function addComment(Request $request) {
        $post_id = $request->post("post_id");
        $name_of_user = $request->post("username");
        $comment = $request->post("comment");
        return comments::create([
            "post_id"=>$post_id,
            "name_of_user"=>$name_of_user,
            "comment"=>$comment,
            "user_profile"=>"http://localhost:9090".$request->post("user_picture"),
        ]);
    }

    public function getAllComments(Request $request) {
        $post_id = $request->get("post_id");
        return array_reverse(comments::where("post_id", $post_id)->get()->toArray());
    }
}
