import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile_project/constants/error_handling.dart';
import 'package:mobile_project/constants/global_variables.dart';
import 'package:mobile_project/constants/utils.dart';
import 'package:mobile_project/models/product.dart';
import 'package:http/http.dart' as http;

class HomeServices {
  Future<List<Product>> fetchAllProducts({
    required BuildContext context,
  }) async {
    List<Product> productList = [];
    try {
      http.Response res = await http.get(
        Uri.parse('${GlobalVariables.url}api/product/productList'), 
        headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        }
      );
      print(res.body);
      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () {;
          for (int i = 0; i < jsonDecode(res.body).length; i++) {
            productList.add(
              Product.fromJson(
                jsonEncode(
                  jsonDecode(res.body)[i],
                ),
              ),
            );
          }
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
    print(productList.length);
    for (var i = 0; i < productList.length; i++) {
      // TO DO
      var currentElement = productList[i];
      print(currentElement);
    }
    return productList;
  }
}