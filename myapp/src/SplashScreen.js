import {
  TapGestureHandler,
  RotationGestureHandler,
  State,
} from "react-native-gesture-handler";
import React, { Component, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Svg, { Image, Circle, ClipPath, inlineStyles } from "react-native-svg";
import Animated, { Easing } from "react-native-reanimated";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "./AuthProvider";
import * as Animatable from "react-native-animatable";
import { useTheme } from "@react-navigation/native";
import { COLORS, SIZES, FONTS, icons } from "./constants";

const { width, height } = Dimensions.get("screen");
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position,
  ]);
}

class MyApp extends Component {
  static contextType = AuthContext;

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      check_textInputChange: false,
      secureTextEntry: true,
      isValidUser: true,
      isValidPassword: true,
    };

    this.buttonOpacity = new Value(1);
    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            ),
          ]),
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            ),
          ]),
      },
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 110, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP,
    });
  }

  textInputChange = (value) => {
    if (value.trim().length >= 4) {
      this.setState({
        ...this.state,
        email: value,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      this.setState({
        ...this.state,
        email: value,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  handlePasswordChange = (value) => {
    if (value.trim().length >= 8) {
      this.setState({
        ...this.state,
        password: value,
        isValidPassword: true,
      });
    } else {
      this.setState({
        ...this.state,
        password: value,
        isValidPassword: false,
      });
    }
  };

  updateSecureTextEntry = () => {
    this.setState({
      ...this.state,
      secureTextEntry: !this.state.secureTextEntry,
    });
  };

  handleValidUser = (value) => {
    if (value.length >= 4) {
      this.setState({
        ...this.state,
        isValidUser: true,
      });
    } else {
      this.setState({
        ...this.state,
        isValidUser: false,
      });
    }
  };

  render() {
    const { login, error } = this.context;

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }],
          }}
        >
          <Svg height={height + 50} width={width + 50}>
            {/* <ClipPath id="image"> */}
            <Circle
              id="image"
              r={height + 50}
              cx={width / 2}
              // fill={COLORS.yellow2}
            />
            {/* </ClipPath> */}
            <Image
              href={require("../assets/images/dark.jpg")}
              width={width}
              height={height + 50}
              preserveAspectRatio="xMidYMid slice"
              ClipPath="url(#image)"
            />
            {/* <Circle r={height + 50} cx={width / 2} /> */}
          </Svg>
        </Animated.View>
        <View style={styles.header}>
          <Text
            style={{
              textTransform: "uppercase",
              fontSize: 20,
              color: COLORS.white,
              textShadowColor: COLORS.primary,
              alignSelf: "center",
              fontWeight: "bold",
            }}
          >
            Stay connected with
          </Text>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 60,
                lineHeight: 58,
                fontWeight: "bold",
                color: COLORS.pink,
                textTransform: "uppercase",
              }}
            >
              <Text style={{ color: COLORS.primary, left: 20 }}>con</Text>
              wave!
            </Text>
          </View>
          <Text style={styles.ttt}>Sign in with account</Text>
        </View>
        <View style={styles.footer}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }],
              }}
            >
              <View>
                <TouchableOpacity>
                  <LinearGradient
                    colors={[COLORS.black, COLORS.black]}
                    style={{
                      ...styles.button,
                      // borderWidth: 3,
                      // borderColor: COLORS.beige,
                    }}
                  >
                    <Text style={{ ...styles.text, color: COLORS.white }}>
                      SIGN IN
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }],
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("TypeScreen")}
              >
                {/* d02860 */}
                <LinearGradient
                  colors={[COLORS.primary, COLORS.yellow2]}
                  style={styles.button}
                >
                  <Text style={styles.text}>CREATE AN ACCOUNT</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <Animated.View
            style={{
              zIndex: this.textInputZindex,
              opacity: this.textInputOpacity,
              transform: [{ translateY: this.textInputY }],
              ...StyleSheet.absoluteFill,
              ...styles.signin,
            }}
          >
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text
                  style={{
                    fontSize: 15,
                    transform: [{ rotate: concat(this.rotateCross, "deg") }],
                  }}
                >
                  <FontAwesome name="times" color={"#d02860"} size={30} />
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            {this.context.error && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{this.context.error}</Text>
              </Animatable.View>
            )}
            <View style={styles.action}>
              <FontAwesome
                name="envelope"
                size={20}
                style={styles.icon}
                color="grey"
              />
              <TextInput
                placeholder="email"
                placeholderTextColor={COLORS.lightgray}
                style={styles.textInput}
                autoCapitalize="none"
                textContentType="emailAddress"
                onChangeText={(value) => this.textInputChange(value)}
                onEndEditing={(e) => this.handleValidUser(e.nativeEvent.text)}
              />
              {this.state.check_textInputChange ? (
                <Animatable.View
                  style={{ ...styles.icon, marginRight: 15 }}
                  animation="bounceIn"
                >
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>

            <View style={styles.action}>
              <FontAwesome
                name="lock"
                size={25}
                style={styles.icon}
                color="grey"
              />
              <TextInput
                placeholder="password"
                placeholderTextColor={COLORS.lightgray}
                secureTextEntry={this.state.secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(value) => this.handlePasswordChange(value)}
              />
              <TouchableOpacity
                style={{ ...styles.icon, marginRight: 15 }}
                onPress={this.updateSecureTextEntry}
              >
                {this.state.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {/* {this.state.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Password must be 8 characters long.
                </Text>
              </Animatable.View>
            )} */}
            <TouchableOpacity>
              <Text style={styles.forgotpassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <Animated.View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.context.login(this.state.email, this.state.password);
                  }}
                >
                  <LinearGradient
                    colors={["#ff01ff", "#ffba00"]}
                    style={styles.button}
                  >
                    <Text style={styles.text}>SIGN IN</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

export default MyApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#DC8200",
    backgroundColor: COLORS.white,
    justifyContent: "flex-end",
  },
  header: {
    marginVertical: 100,
    // alignItems: "center",
  },
  footer: {
    height: height / 3,
    justifyContent: "center",
  },
  button: {
    height: 70,
    marginHorizontal: 10,
    borderRadius: SIZES.radius,
    // borderTopRightRadius: SIZES.radius * 4,
    // borderBottomLeftRadius: SIZES.radius * 4,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  ttt: {
    color: "gray",
    fontSize: 17,
    marginTop: 5,
    marginHorizontal: 50,
    // marginLeft: 20,
    // marginRight: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },

  signin: {
    height: height / 3,
    top: null,
    justifyContent: "center",
  },
  action: {
    flexDirection: "row",
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: "#d02860",
    paddingLeft: 10,
  },
  icon: {
    flexDirection: "row",
    marginTop: 14,
    paddingLeft: 10,
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: "#FDFDFD",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -65,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 2,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "grey",
  },
  errorMsg: {
    color: "#d80000",
    marginLeft: 30,
  },
  forgotpassword: {
    color: "#474747",
    marginLeft: 30,
    fontSize: 12,
    marginBottom: 10,
  },
});
// 05375a
