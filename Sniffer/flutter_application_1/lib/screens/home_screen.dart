import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title: Text("Discover"),
      ),

      body: Padding(
        padding: EdgeInsets.all(16),

        child: Card(

          child: Column(

            mainAxisAlignment: MainAxisAlignment.center,

            children: [

              CircleAvatar(
                radius: 70,
                backgroundImage: NetworkImage(
                  "https://i.imgur.com/BoN9kdC.png",
                ),
              ),

              SizedBox(height: 20),

              Text(
                "ShadowWolf",
                style: TextStyle(
                  fontSize: 26,
                  fontWeight: FontWeight.bold,
                ),
              ),

              SizedBox(height: 10),

              Text(
                "Grey Wolf Therian",
                style: TextStyle(
                  color: Colors.grey,
                ),
              ),

              SizedBox(height: 30),

              Row(

                mainAxisAlignment: MainAxisAlignment.spaceEvenly,

                children: [

                  FloatingActionButton(
                    heroTag: "no",
                    backgroundColor: Colors.red,
                    onPressed: () {},
                    child: Icon(Icons.close),
                  ),

                  FloatingActionButton(
                    heroTag: "yes",
                    backgroundColor: Colors.green,
                    onPressed: () {},
                    child: Icon(Icons.favorite),
                  ),

                ],

              )

            ],

          ),

        ),

      ),

    );

  }

}