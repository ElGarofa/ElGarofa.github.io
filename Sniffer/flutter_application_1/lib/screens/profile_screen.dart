import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title: Text("My Profile"),
      ),

      body: ListView(

        padding: EdgeInsets.all(20),

        children: [

          CircleAvatar(
            radius: 70,
            backgroundImage: NetworkImage(
              "https://i.imgur.com/BoN9kdC.png",
            ),
          ),

          SizedBox(height: 20),

          Center(

            child: Text(
              "Your Name",
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),

          ),

          SizedBox(height: 20),

          Card(

            child: Padding(

              padding: EdgeInsets.all(16),

              child: Text(
                "Bio:\nI am a wolf therian who loves forests.",
              ),

            ),

          ),

          SizedBox(height: 20),

          ElevatedButton(

            onPressed: () {},

            child: Text("Edit Profile"),

          ),

        ],

      ),

    );

  }

}