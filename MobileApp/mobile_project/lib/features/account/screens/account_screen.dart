import 'package:flutter/material.dart';
import 'package:mobile_project/constants/global_variables.dart';
import 'package:mobile_project/features/account/widgets/top_buttons.dart';

class AccountScreen extends StatelessWidget {
  const AccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(50),
        child: AppBar(
          flexibleSpace: Container(
              decoration: const BoxDecoration(
            gradient: GlobalVariables.appBarGradient,
          )),
          title: Row(children: [
            Container(
              padding: const EdgeInsets.only(left: 15, right: 15),
              child: Row(
                children: const [
                  Padding(
                    padding: EdgeInsets.only(right: 15),
                    child: Icon(Icons.notifications_outlined),
                  ),
                  Padding(
                    padding: EdgeInsets.only(right: 0),
                    child: Icon(Icons.search),
                  ),
                ],
              ),
            ),
          ]),
        ),
      ),
      body: Column(
        children: const [
          SizedBox(height: 10,),
          TopButtons(),
        ],
      )
    );
  }
}
