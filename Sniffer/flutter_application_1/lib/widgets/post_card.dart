import 'package:flutter/material.dart';
import '../models/post.dart';

class PostCard extends StatefulWidget {

  final Post post;

  const PostCard(this.post, {super.key});

  @override
  _PostCardState createState() => _PostCardState();
}

class _PostCardState extends State<PostCard> {

  bool liked=false;

  @override
  Widget build(BuildContext context) {

    return Card(

      margin: EdgeInsets.all(10),

      child: Padding(

        padding: EdgeInsets.all(12),

        child: Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: [

            Text(
              widget.post.user,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
            ),

            SizedBox(height:8),

            Text(widget.post.text),

            SizedBox(height:10),

            Row(

              children: [

                IconButton(

                  icon: Icon(
                    liked?
                    Icons.favorite:
                    Icons.favorite_border,

                    color: liked?
                    Colors.red:
                    Colors.grey,
                  ),

                  onPressed: (){
                    setState(() {

                      liked=!liked;

                      if(liked) {
                        widget.post.likes++;
                      } else {
                        widget.post.likes--;
                      }

                    });
                  },
                ),

                Text("${widget.post.likes}"),

              ],
            ),

            Divider(),

            Column(

              children:

              widget.post.comments.map((c){

                return Align(

                  alignment: Alignment.centerLeft,

                  child: Padding(

                    padding: EdgeInsets.all(4),

                    child: Text("• $c"),

                  ),
                );

              }).toList(),
            )

          ],
        ),
      ),
    );
  }
}