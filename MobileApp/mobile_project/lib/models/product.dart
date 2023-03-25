import 'dart:convert';

class Product {

  final int id;
  final int price;
  final int width;
  final int height;
  final int quantity;
  final String ksr;
  final String image;
  final int sellerid;
  final int categoryid;
  final int typeid;

  Product({
    required this.id,
    required this.price,
    required this.width,
    required this.height,
    required this.quantity,
    required this.ksr,
    required this.image,
    required this.sellerid,
    required this.categoryid,
    required this.typeid
  });

  Map<String, dynamic> toMap() {
    return {
      'id' : id,
      'price' : price,
      'Height' : height,
      'Width' : width,
      'Quantity': quantity,
      'KSR' : ksr,
      'Image' : image,
      'SellerId' : sellerid,
      'CategoryId' : categoryid,
      'TypeId' : typeid,
    };
  }

  factory Product.fromMap(Map<String, dynamic> map) {
    return Product(
      id: map['id'].toInt() ?? 0,
      price: map['price']?.toInt() ?? 0,
      width: map['Width']?.toInt() ?? 0,
      height: map['Height']?.toInt() ?? 0,
      quantity: map['Quantity']?.toInt() ?? 0,
      ksr: map['KSR'] ?? '',
      image: map['Image'] ?? '',
      categoryid: map['CategoryId']?.toInt() ?? 1,
      typeid: map['TypeId']?.toInt() ?? 0,
      sellerid: map['SellerId']?.toInt() ?? 0
    );
  }

  String toJson() => json.encode(toMap());

  factory Product.fromJson(String source) =>
      Product.fromMap(json.decode(source));
}