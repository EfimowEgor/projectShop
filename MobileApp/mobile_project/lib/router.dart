import 'package:flutter/material.dart';
import 'package:mobile_project/common/widgets/bottom_bar.dart';
import 'package:mobile_project/features/auth/screens/auth_screen.dart';
import 'package:mobile_project/features/favorite/screens/favorite_screen.dart';
import 'package:mobile_project/features/home/screens/home_screen.dart';
import 'package:mobile_project/features/product_details/screens/product_details_screen.dart';
import 'package:mobile_project/models/product.dart';

Route<dynamic> generateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    case AuthScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const AuthScreen(),
      );
    case HomeScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const HomeScreen(),
      );
    case BottomBar.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const BottomBar(),
      );
    case ProductDetailScreen.routeName:
      var product = routeSettings.arguments as Product;
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => ProductDetailScreen(
          product: product,
        ),
      );
    case FavoriteScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const FavoriteScreen(),
      );
    default:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const Scaffold(
          body: Center(
            child: Text('Screen doesn\'t exist'),
          )
        ),
      );
  }
}
