import 'package:flutter/material.dart';

class GlobalVariables {

  static String url = 'http://172.23.34.140:5000/';

  static const category = {
    1 : 'Обои',
  };
  static const type = {
    1 : 'Обои бумажные',
    2 : 'Обои виниловые',
    3 : 'Обои на тканевой основе',
    4 : 'Обои водостойкие',
  };

  // COLORS
  static const appBarGradient = LinearGradient(
    colors: [
      Color.fromARGB(255, 29, 201, 192),
      Color.fromARGB(255, 125, 221, 216),
    ],
    stops: [0.5, 1.0],
  );

  static const secondaryColor = Color.fromRGBO(255, 153, 0, 1);
  static const backgroundColor = Colors.white;
  static const Color greyBackgroundColor = Color(0xffebecee);
  static var selectedNavBarColor = Colors.cyan[800]!;
  static const unselectedNavBarColor = Colors.black87;
}