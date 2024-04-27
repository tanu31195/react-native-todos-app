import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import {
  NestableDraggableFlatList,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import SwipeableItem, {
  useSwipeableItemParams,
} from "react-native-swipeable-item";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Item } from "../utils";

const OVERSWIPE_DIST = 20;

const StatusTaskList = ({ tasks, status, handleDragEnd, navigation }) => {
  const [isVisible, setIsVisible] = useState(true);
  const itemRefs = useRef(new Map());
  const debouncePress = useRef(null);

  const onPressDelete = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setData((prev) => {
      return prev.filter((item) => item !== params.item);
    });
  };

  const renderItem = ({ item, drag, isActive }) => {
    const tap = Gesture.Tap()
      .maxDuration(100)
      .onStart(() => {
        navigation.navigate("Task Details", { taskId: item?.id });
      })
      .runOnJS(true);

    // const longPress = Gesture.LongPress()
      // .minDuration(200)
      // .onStart((evt) => {
      //   drag();
      // })
      // .runOnJS(true);

    const composed = Gesture.Exclusive(tap);
    return (
      <ScaleDecorator>
        <GestureDetector gesture={composed}>
          <Animated.View>
            <SwipeableItem
              key={item.key}
              item={item}
              ref={(ref) => {
                if (ref && !itemRefs.current.get(item.key)) {
                  itemRefs.current.set(item.key, ref);
                }
              }}
              onChange={({ open }) => {
                if (open) {
                  [...itemRefs.current.entries()].forEach(([key, ref]) => {
                    if (key !== item.key && ref) ref.close();
                  });
                }
              }}
              overSwipe={OVERSWIPE_DIST}
              renderUnderlayLeft={() => (
                <UnderlayLeft drag={drag} onPressDelete={onPressDelete} />
              )}
              renderUnderlayRight={() => <UnderlayRight />}
              snapPointsLeft={[100]}
              snapPointsRight={[60]}
            >
              <TouchableOpacity
                activeOpacity={1}
                onLongPress={drag}
                disabled={isActive}
                // onPress={() =>
                //   navigation.navigate("Task Details", { taskId: item?.id })
                // }
                style={[
                  styles.row,
                  {
                    backgroundColor: item.backgroundColor,
                    height: item.height,
                  },
                ]}
              >
                <Text style={styles.text}>{item.title}</Text>
              </TouchableOpacity>
            </SwipeableItem>
          </Animated.View>
        </GestureDetector>
      </ScaleDecorator>
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <Text style={styles.headerText}>
          {status} {isVisible ? "^" : "V"}
        </Text>
      </TouchableOpacity>
      {isVisible && (
        <NestableDraggableFlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => handleDragEnd(data, status)}
          ListEmptyComponent={<Text>No ${status} tasks</Text>}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default StatusTaskList;

const UnderlayLeft = ({ drag, onPressDelete }) => {
  const { percentOpen } = useSwipeableItemParams();
  const animStyle = useAnimatedStyle(() => ({
    opacity: percentOpen.value,
  }));

  return (
    <Animated.View style={[styles.row, styles.underlayLeft, animStyle]}>
      <TouchableOpacity onPress={onPressDelete}>
        <Text style={styles.text}>[delete]</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

function UnderlayRight() {
  const { close } = useSwipeableItemParams();
  return (
    <Animated.View style={[styles.row, styles.underlayRight]}>
      <TouchableOpacity onPressOut={close}>
        <Text style={styles.text}>CLOSE</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  text: {
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  underlayRight: {
    backgroundColor: "teal",
    justifyContent: "flex-start",
  },
  underlayLeft: {
    backgroundColor: "tomato",
    justifyContent: "flex-end",
  },
});
