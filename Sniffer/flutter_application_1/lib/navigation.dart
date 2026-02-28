import 'package:flutter/material.dart';

import 'screens/home_screen.dart';
import 'screens/community_screen.dart';
import 'screens/matches_screen.dart';
import 'screens/chat_screen.dart';
import 'screens/profile_screen.dart';

class Navigation extends StatefulWidget {
  const Navigation({super.key});

  @override
  State<Navigation> createState() => _NavigationState();
}

class _NavigationState extends State<Navigation> {

  int currentIndex = 0;

  final List<Widget> screens = [
    HomeScreen(),
    CommunityScreen(),
    MatchesScreen(),
    ChatScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      body: screens[currentIndex],

      bottomNavigationBar: BottomNavigationBar(

        currentIndex: currentIndex,

        onTap: (index) {

          setState(() {

            currentIndex = index;

          });

        },

        items: const [

          BottomNavigationBarItem(
            icon: Icon(Icons.pets),
            label: "Discover",
          ),

          BottomNavigationBarItem(
            icon: Icon(Icons.public),
            label: "Community",
          ),

          BottomNavigationBarItem(
            icon: Icon(Icons.favorite),
            label: "Matches",
          ),

          BottomNavigationBarItem(
            icon: Icon(Icons.chat),
            label: "Chat",
          ),

          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: "Profile",
          ),

        ],

      ),

    );

  }

}