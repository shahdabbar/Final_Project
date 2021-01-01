import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  Button,
  StatusBar,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import {
  MaterialIcons as MaterialIcon,
  Ionicons as Ionicon,
  MaterialCommunityIcons as Icon,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "react-native-vector-icons";
import CheckBox from "@react-native-community/checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "./AuthProvider";
import DrawerContent from "./DrawerContent";
import { deleteItemAsync } from "expo-secure-store";
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import axios from "axios";
import { webView } from "react-native-webview";
import PaymentView from "./PaymentView";

const PaymentMethodScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);

  const [response, setResponse] = useState();
  const [makePayment, setMakePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState();

  const cartInfo = {
    id: "Seruyt35eggr76476236523t3",
    description: "T Shirt - With react Native Logo",
    amount: 1,
  };

  const onCheckStatus = async (PaymentResponse) => {
    // perform operation to check payment status
  };

  return (
    <View styles={styles.container}>
      <PaymentView />
    </View>
  );

  // const onClick = () => {};

  // return (
  //   <View style={styles.container}>
  //     <View
  //       style={{
  //         flexDirection: "row",
  //         alignItems: "center",
  //         marginBottom: 20,
  //       }}
  //     >
  //       <View>
  //         <MaterialIcon
  //           name="arrow-back-ios"
  //           size={24}
  //           color="gray"
  //           style={{ marginLeft: 20 }}
  //           onPress={() => {
  //             navigation.navigate("BookSession");
  //           }}
  //         />
  //       </View>
  //       <View style={{ left: 20 }}>
  //         <Text style={styles.payment}>Set Your Payment</Text>
  //       </View>
  //     </View>
  //     <View style={styles.action}>
  //       <TextInput
  //         style={{ fontSize: 20 }}
  //         placeholder="Start Typing"
  //         placeholderTextColor="#666"
  //         // onChangeText={(text) => setData({ ...data, rate: text })}
  //         underlineColorAndroid="transparent"
  //       ></TextInput>
  //     </View>
  //     <View>
  //       {/* <Text style={styles.text}>Total: {data.rate} LBP/h</Text> */}
  //     </View>
  //     <View>
  //       <TouchableOpacity style={{ marginTop: 320 }} onPress={() => onClick()}>
  //         <LinearGradient colors={["#ff01ff", "#ffd200"]} style={styles.next}>
  //           <Text style={styles.next_text}>NEXT</Text>
  //         </LinearGradient>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 60,
  },
  payment: {
    fontSize: 27,
    fontWeight: "bold",
    color: COLORS.pink,
  },
  action: {
    flexDirection: "row",
    height: 70,
    borderRadius: 40,
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: "#ffd200",
    paddingLeft: 20,
    backgroundColor: "#FFFFFF",
    elevation: 10,
  },
  text: {
    margin: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
  next: {
    marginTop: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    left: "70%",
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    width: "30%",
    height: 70,
    borderColor: "#ffd200",
    borderWidth: 2,
  },
  next_text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
});
