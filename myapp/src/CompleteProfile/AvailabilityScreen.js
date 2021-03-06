import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../AuthProvider";
import { COLORS, SIZES, FONTS, icons } from "../constants";
import axios from "axios";

const AvailabilityScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  console.log(user);
  const [selectedDay, setSelectedDay] = useState(null);
  const [hours, setHours] = useState([]);

  const [days, setDays] = useState([
    {
      name: "Sun",
      id: 1,
      isSelected: false,
      hours: [],
    },
    {
      name: "Mon",
      id: 2,
      isSelected: false,
      hours: [],
    },
    {
      name: "Tue",
      id: 3,
      isSelected: false,
      hours: [],
    },
    {
      name: "Wed",
      id: 4,
      isSelected: false,
      hours: [],
    },
    {
      name: "Thu",
      id: 5,
      isSelected: false,
      hours: [],
    },
    {
      name: "Fri",
      id: 6,
      isSelected: false,
      hours: [],
    },
    {
      name: "Sat",
      id: 7,
      isSelected: false,
      hours: [],
    },
  ]);

  useEffect(() => {
    // get timeslots
    axios
      .get(`api/timeslots/sunday?user_id=${user.id}`)
      .then((response) => {
        days[0] = { ...days[0], hours: response.data };
        console.log("days", days[0]);
        setDays(days);
      })
      .catch((error) => {
        console.log("error", error);
      });

    axios
      .get(`api/timeslots/monday?user_id=${user.id}`)
      .then((response) => {
        days[1] = { ...days[1], hours: response.data };
        // console.log(response.data);
        setDays(days);
      })
      .catch((error) => {
        console.log("error", error);
      });
    axios
      .get(`api/timeslots/tuesday?user_id=${user.id}`)
      .then((response) => {
        days[2] = { ...days[2], hours: response.data };
        // console.log("days", days[2]);
        setDays(days);
      })
      .catch((error) => {
        console.log("error", error);
      });
    axios
      .get(`api/timeslots/wednesday?user_id=${user.id}`)
      .then((response) => {
        days[3] = { ...days[3], hours: response.data };
        // console.log("days", days[3]);
        setDays(days);
      })
      .catch((error) => {
        console.log("error", error);
      });
    axios
      .get(`api/timeslots/thursday?user_id=${user.id}`)
      .then((response) => {
        days[4] = { ...days[4], hours: response.data };
        // console.log("days", days[4]);
        setDays(days);
      })
      .catch((error) => {
        console.log("error", error);
      });
    axios
      .get(`api/timeslots/friday?user_id=${user.id}`)
      .then((response) => {
        days[5] = { ...days[5], hours: response.data };
        // console.log("days", days[5]);
        setDays(days);
      })
      .catch((error) => {
        console.log("error", error);
      });
    axios
      .get(`api/timeslots/saturday?user_id=${user.id}`)
      .then((response) => {
        days[6] = { ...days[6], hours: response.data };
        // console.log("days", days[6]);
        setDays(days);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const renderHours = () => {
    return (
      <View style={{ marginBottom: 300 }}>
        {selectedDay ? (
          <FlatList
            horizontal={false}
            data={selectedDay.hours}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={{
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding,
            }}
            renderItem={({ item }) => {
              return (
                <View style={styles.content}>
                  <TouchableOpacity
                    style={{
                      elevation: 10,
                      ...styles.wrapper_content,
                      backgroundColor: item.isSelected
                        ? COLORS.yellow
                        : COLORS.white,
                      borderColor: item.isSelected
                        ? COLORS.primary
                        : COLORS.yellow,
                    }}
                    onPress={() => {
                      onHourPress(item);
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          ...styles.text,
                          color: COLORS.black,
                        }}
                      >
                        {item.hours.hour}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : null}
      </View>
    );
  };

  const onHourPress = (item, index) => {
    setSelectedDay(item);
    const newData = selectedDay.hours.map((e) => {
      if (e.id === item.id) {
        return {
          ...e,
          isSelected: !e.isSelected,
        };
      }
      return {
        ...e,
        isSelected: e.isSelected,
      };
    });
    setSelectedDay({ ...selectedDay, hours: newData });

    axios
      .post("/api/timeslots/hours/update", {
        user_id: user.id,
        days_id: item.days_id,
        hours_id: item.hours_id,
        isSelected: !item.isSelected,
      })
      .then((response) => {
        console.log("success?", response.data);
      });

    axios
      .get(`/api/timeslots/hours?days_id=${item.days_id}&&user_id=${user.id}`)
      .then((response) => {
        days[item.days_id - 1] = {
          ...days[item.days_id - 1],
          hours: response.data,
        };
        setSelectedDay(days[item.days_id - 1]);
      });
  };

  const onDaySelected = (item) => {
    setSelectedDay(item);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <FlatList
          horizontal={true}
          data={days}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{
            paddingVertical: SIZES.padding,
          }}
          renderItem={({ item }) => {
            return (
              <View style={styles.content}>
                <TouchableOpacity
                  style={{
                    ...styles.days,
                    elevation: 5,
                    backgroundColor:
                      selectedDay?.id === item.id
                        ? COLORS.lightblue
                        : COLORS.white,
                    borderColor:
                      selectedDay?.id === item.id
                        ? COLORS.primary
                        : COLORS.yellow,
                  }}
                  onPress={() => {
                    //   onDayPress(item);
                    onDaySelected(item);
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <View>
        <FlatList
          contentContainerStyle={styles.hours}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHours()}
        />
      </View>
    </View>
  );
};

export default AvailabilityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },

  wrapper_content: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 15,
  },
  header: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    justifyContent: "space-between",
    paddingBottom: 8,
    paddingLeft: 5,
  },
  days: {
    top: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    borderColor: "#ffd200",
    borderWidth: 2,
  },
  hours: {
    top: 30,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 25,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 20,
    color: "orange",
    fontWeight: "800",
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
