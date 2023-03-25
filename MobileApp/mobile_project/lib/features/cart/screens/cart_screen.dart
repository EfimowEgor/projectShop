import 'package:mobile_project/common/widgets/custom_button.dart';
import 'package:mobile_project/constants/global_variables.dart';
import 'package:flutter/material.dart';
import 'package:mobile_project/features/cart/widgets/cart_product.dart';
import 'package:mobile_project/models/product.dart';

class CartScreen extends StatefulWidget {
  const CartScreen({Key? key}) : super(key: key);

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
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
      body: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: CustomButton(
                text: 'Ваши продукты',
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
                      id: 43,
                      price: 600,
                      width: 500,
                      height: 12,
                      quantity: 600,
                      ksr: '17.24.11.110.01.6.02.01-0002',
                      image: 'ba27a066-101e-4e36-bc80-04b870373464.jpg',
                      sellerid: 2,
                      categoryid: 1,
                      typeid: 2),
                );
              },
            ),
                        ListView.builder(
              itemCount: 1,
              shrinkWrap: true,
              itemBuilder: (context, index) {
                return CartProduct(
                  product: new Product(
                      id: 42,
                      price: 305,
                      width: 500,
                      height: 10,
                      quantity: 500,
                      ksr: '17.24.11.110.01.6.02.01-0001',
                      image: '7ff024f5-3372-4e4d-8e0f-67ae69502c52.jpg',
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
