import 'package:flutter/material.dart';
import 'package:mobile_project/common/widgets/bottom_bar.dart';
import 'package:mobile_project/constants/global_variables.dart';
import 'package:mobile_project/features/auth/screens/auth_screen.dart';
import 'package:mobile_project/features/auth/services/auth_service.dart';
import 'package:mobile_project/router.dart';

getContains() async {
  bool val = await AuthService.storage.containsKey(key: 'token');
  return val;
}
void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final AuthService authService = AuthService();
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Project',
      theme: ThemeData(
        scaffoldBackgroundColor: GlobalVariables.backgroundColor,
        colorScheme: const ColorScheme.light(
          primary: GlobalVariables.secondaryColor,
        ),
        appBarTheme: const AppBarTheme(
            elevation: 0,
            iconTheme: IconThemeData(
              color: Colors.black,
            )),
      ),
      onGenerateRoute: (settings) => generateRoute(settings),
      home: FutureBuilder(
            future: getContains(),
            builder: (context, snapshot) {
              if (snapshot.data == true) {
                // print(snapshot.data);
                return BottomBar();
              } else {
                return AuthScreen();
              }
            }),
    );
  }
}
