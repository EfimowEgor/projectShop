import 'package:flutter/material.dart';
import 'package:mobile_project/features/account/widgets/accout_button.dart';
import 'package:mobile_project/features/auth/screens/auth_screen.dart';
import 'package:mobile_project/features/auth/services/auth_service.dart';
import 'package:mobile_project/features/favorite/screens/favorite_screen.dart';

class TopButtons extends StatelessWidget {
  const TopButtons({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            AccountButton(
              text: 'Заказы',
              onTap: () {},
            ),
            AccountButton(
              text: 'Список желаний',
              onTap: () {
                Navigator.pushNamed(
                  context,
                  FavoriteScreen.routeName,
                );
              },
            ),
          ],
        ),
        const SizedBox(height: 30),
        Row(
          children: [
            AccountButton(
              text: 'Log Out',
              onTap: () async {
                await AuthService.storage.delete(key: 'token');
                Navigator.pushNamedAndRemoveUntil(
                  context,
                  AuthScreen.routeName,
                  (route) => false,
                );
              },
            ),
          ],
        ),
      ],
    );
  }
}
