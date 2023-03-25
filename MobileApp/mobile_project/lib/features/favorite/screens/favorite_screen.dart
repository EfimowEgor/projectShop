import 'package:flutter/material.dart';
import 'package:mobile_project/common/widgets/custom_button.dart';
import 'package:mobile_project/constants/global_variables.dart';
import 'package:mobile_project/features/cart/widgets/cart_product.dart';
import 'package:mobile_project/models/product.dart';

class FavoriteScreen extends StatefulWidget {
  static const String routeName = '/favorite';
  const FavoriteScreen({super.key});

  @override
  State<FavoriteScreen> createState() => _FavoriteScreenState();
}

class _FavoriteScreenState extends State<FavoriteScreen> {
  @override
  Widget build(BuildContext context) {
{
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
      body: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: CustomButton(
                text: 'Избранное',
                
                onTap: () => {},
              ),
            ),
            const SizedBox(height: 15),
            Container(
              color: Colors.black12.withOpacity(0.08),
              height: 1,
            ),
            const SizedBox(height: 5),
            ListView.builder(
              itemCount: 1,
              shrinkWrap: true,
              itemBuilder: (context, index) {
                return CartProduct(
                  product: new Product(
                      id: 41,
                      price: 200,
                      width: 20,
                      height: 600,
                      quantity: 500,
                      ksr: '17.24.11.110.01.6.02.01-0017',
                      image: '87f50bbf-a7b3-4fec-9c95-41ad633a9252.jpg',
                      sellerid: 2,
                      categoryid: 1,
                      typeid: 1),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
  }
}