import 'dart:convert';

class User {
  final String name;
  final String email;
  final String password;

  User({ 
    required this.name, 
    required this.email, 
    required this.password, 
  });

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'login': email,
      'password': password,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      name: map['name'] ?? '',
      email: map['login'] ?? '',
      password: map['password'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) => User.fromMap(json.decode(source));

  User copyWith({
    String? name,
    String? email,
    String? password,
    String? token,
  }) {
    return User(
      name: name ?? this.name,
      email: email ?? this.email,
      password: password ?? this.password,
    );
  }
}