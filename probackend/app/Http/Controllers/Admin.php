<?php

namespace App\Http\Controllers;

use App\Models\post;
use App\Models\users;
use Illuminate\Http\Request;
class Admin extends Controller
{
    //

    public function listUsers()
    {
        return users::all();
    }


    public function downloadUsers()
    {
        $headers = [
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Content-type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename=users.csv',
            'Expires'             => '0',
            'Pragma'              => 'public'
        ];

        $list = users::all()->toArray();

        # add headers for each column in the CSV download
        array_unshift($list, array_keys($list[0]));

        $callback = function () use ($list) {
            $FH = fopen('php://output', 'w');
            foreach ($list as $row) {
                fputcsv($FH, $row);
            }
            fclose($FH);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function downloadPosts()
    {
        $headers = [
            // 'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Content-type'        => 'text/csv',
            // 'Content-Disposition' => 'attachment; filename=posts.csv',
            // 'Expires'             => '0',
            // 'Pragma'              => 'public'
        ];

        $list = post::all()->toArray();

        # add headers for each column in the CSV download
        array_unshift($list, array_keys($list[0]));

        $callback = function () use ($list) {
            $FH = fopen('php://output', 'w');
            foreach ($list as $row) {
                fputcsv($FH, $row);
            }
            fclose($FH);
        };

        return response()->stream($callback, 200, $headers);
    }
    public function listAllPost()
    {
        return array_reverse(post::all()->toArray());
    }

    public function deactivateUserAccount()
    {
        $user_id = request("id");
        return users::where("id", $user_id)->update(["activate" => false]);
    }

    public function activateUserAccount()
    {
        $user_id = request("id");
        return users::where("id", $user_id)->update(["activate" => true]);
    }


    public function deactivatePost()
    {
        $user_id = request("id");
        return post::where("id", $user_id)->update(["active" => false]);
    }

    public function activatePost()
    {
        $user_id = request("id");
        return post::where("id", $user_id)->update(["active" => true]);
    }

    public function importFromExcel(Request $request) {
        try {
            $file = $request->file("uploaded");
            $filecontents = file_get_contents($file);
            $csvProcess = array_map("str_getcsv", file($file));
            for($i = 1; $i < count($csvProcess); $i++) {
                post::create([
                  "user_id"=>$csvProcess[$i][1],
                  "name"=>$csvProcess[$i][2],
                  "text"=>$csvProcess[$i][3],
                  "media"=>$csvProcess[$i][4],  
                  "likes"=>$csvProcess[$i][5],
                  "active"=>$csvProcess[$i][6],
                  "filetype"=>$csvProcess[$i][7],
                ]);
            }
            return ["message"=>"Successfully Added All The Values"];
        } catch (Exception $e) {
            return ["message"=>"Something went wrong"];
        }
  
    }


    public function importFromExcelUsers(Request $request) {
        try {
            $file = $request->file("userscsv");
            $csvProcess = array_map("str_getcsv", file($file));
            for($i = 1; $i<count($csvProcess);$i++) {
                
            }
            return ["message"=>'Successfully Added all the Users'];
        } catch (Exception $e) {
            return ["message"=>"Something went wrong"];
        }
    }

}
