import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import BasketballImage from "./assets/products/basketball1.jpeg";
import AvatarImage from "./assets/icons/avatar.png";
import { API_URL } from './config/constants.js';
import axios from 'axios';
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import "dayjs/locale/ko";
dayjs.extend(relativeTime);
dayjs.locale('ko');

export default function App() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${API_URL}/products`).then((result) => {
      console.log(result);
      setProducts(result.data.products);
    }).catch((error) => {
      console.error(error);
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headline}>판매 상품들</Text>
        <View style={styles.productList}>
          {
            products.map((product, index) => {
              return (

                <View style={styles.productCard}>
                  <View style={styles.productBlur} />
                  <View>
                    <Image source={{
                      uri: `${API_URL}/${product.imageUrl}`,
                    }} style={styles.productImage} resizeMode={'contain'}></Image>
                  </View>
                  <View style={styles.productContents}>
                    <Text style={styles.productName} >{product.name}</Text>
                    <Text style={styles.productPrice} >{product.price}</Text>
                    <View style={styles.productFooter}>
                      <View style={styles.productSeller}>
                        <Image source={AvatarImage} style={styles.productAvatar} />
                        <Text style={styles.productSellerName}>{product.seller}</Text>
                      </View>
                      <Text style={styles.productDate}>{dayjs(product.createdAt).fromNow()}</Text>
                    </View>
                  </View>
                </View>


              )
            })
          }
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32,
    paddingLeft: 12,
  },
  productCard: {
    width: 320,
    borderColor: 'rgb(210, 210, 210)',
    borderWidth: 3,
    borderRadius: 16,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: 210
  },
  productContents: {
    padding: 10,
  },
  productSeller: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productAvatar: {
    width: 30,
    height: 30
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  productName: {
    fontSize: 20,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  productSellerName: {
    fontSize: 16,
  },
  productDate: {
    fontSize: 16,
    color: 'red',
  },
  productList: {
    alignItems: 'center',
  },
  headline: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 20,
    color: 'rgb(100,100,100)',
  },

  productBlur: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "#ffffffaa",
    zIndex: 999,
  },

});
