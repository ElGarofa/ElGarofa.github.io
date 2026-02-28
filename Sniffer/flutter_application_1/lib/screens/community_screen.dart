import 'package:flutter/material.dart';

class CommunityScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title: Text("Community"),
      ),

      body: ListView(

        children: [

          Card(
            margin: EdgeInsets.all(10),

            child: Padding(

              padding: EdgeInsets.all(16),

              child: Column(

                crossAxisAlignment: CrossAxisAlignment.start,

                children: [

                  Text(
                    "ShadowWolf",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  SizedBox(height: 10),

                  Text(
                    "Any wolf therians here?",
                  ),

                ],

              ),

            ),

          ),

        ],

      ),

    );

  }

}