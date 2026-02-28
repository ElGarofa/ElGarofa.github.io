import 'package:flutter/material.dart';

class MatchesScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title: Text("Matches"),
      ),

      body: ListView(

        children: [

          ListTile(

            leading: CircleAvatar(
              backgroundImage: NetworkImage(
                "https://i.imgur.com/BoN9kdC.png",
              ),
            ),

            title: Text("LunaFox"),

            subtitle: Text("Fox Therian"),

          ),

          ListTile(

            leading: CircleAvatar(
              backgroundImage: NetworkImage(
                "https://i.imgur.com/BoN9kdC.png",
              ),
            ),

            title: Text("NightCat"),

            subtitle: Text("Cat Therian"),

          ),

        ],

      ),

    );

  }

}