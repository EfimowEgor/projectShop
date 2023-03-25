// ignore_for_file: use_build_context_synchronously

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile_project/common/widgets/bottom_bar.dart';
import 'package:mobile_project/constants/error_handling.dart';
import 'package:mobile_project/constants/global_variables.dart';
import 'package:mobile_project/constants/utils.dart';
import 'package:mobile_project/features/home/screens/home_screen.dart';
import 'package:mobile_project/models/user.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthService {
  static final storage = new FlutterSecureStorage();
  void signUpUser({
    required BuildContext context,
    required String email,
    required String password,
    required String name,
  }) async {
    try {
      User user = User(name: name, email: email, password: password);
      http.Response res = await http.post(
        Uri.parse("${GlobalVariables.url}api/user/registration"),
        body: user.toJson(),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      httpErrorHandle(
          response: res,
          context: context,
          onSuccess: () {
            showSnackBar(
                context, 'Аккаунт создан. Используйте его данные, чтобы войти');
          });
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }

  void signInUser({
    required BuildContext context,
    required String email,
    required String password,
  }) async {
    try {
      http.Response res = await http.post(
        Uri.parse("${GlobalVariables.url}api/user/login"),
        body: jsonEncode({
          'login': email,
          'password': password,
        }),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      httpErrorHandle(
          response: res,
          context: context,
          onSuccess: () async {
            await storage.write(key: 'token', value: jsonDecode(res.body)['token'].toString());
            Navigator.pushNamedAndRemoveUntil(
              context,
              BottomBar.routeName,
              (route) => false,
            );
          });
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}
