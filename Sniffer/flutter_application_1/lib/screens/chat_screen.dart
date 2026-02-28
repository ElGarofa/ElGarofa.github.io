import 'package:flutter/material.dart';

class ChatScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title: Text("Chats"),
      ),

      body: Center(

        child: Text(
          "No chats yet",
          style: TextStyle(fontSize: 18),
        ),

      ),

    );

  }

}