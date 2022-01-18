<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string("firstname", 255);
            $table->string("lastname", 255);
            $table->string("country", 255);
            $table->string("email", 255);
            $table->string("mobile", 255);
            $table->string("dob", 255);
            $table->string("password", 255);
            $table->boolean("activate")->default(true);
            $table->string("ip_address", 200);
            $table->string("tagline", 255)->default("Skill India");
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
