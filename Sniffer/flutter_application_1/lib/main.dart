import 'package:flutter/material.dart';
import 'navigation.dart';
import 'theme/app_theme.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {

  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {

    return MaterialApp(

      debugShowCheckedModeBanner: false,

      title: 'Therian Dating',

      theme: AppTheme.darkTheme,

      home: Navigation(),

    );
  }
}