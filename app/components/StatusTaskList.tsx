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
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  markTaskAsDone,
  markTaskAsInProgress,
  markTaskAsToDo,
} from "../store/redux/features/taskSlice";
import { Task } from "../types/common";
import { SCREENS, STATUSES } from "../constants";

const OVERSWIPE_DIST = 20;

type StatusTaskListProps = {
  tasks: Task[];
  status: string;
  handleDragEnd: (data: Task[], status: string) => void;
  navigation: {
    navigate: (route: string, params: { taskId: string }) => void;
  };
};

type RenderItemProps = {
  item: Task;
  drag: () => void;
  isActive: boolean;
};

const StatusTaskList = ({
  tasks,
  status,
  handleDragEnd,
  navigation,
}: StatusTaskListProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();
  const itemRefs = useRef(new Map());

  const onPressLeft = (taskId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    if (status === STATUSES.TO_DO.CODE) dispatch(markTaskAsInProgress(taskId));
    else if (status === STATUSES.IN_PROGRESS.CODE)
      dispatch(markTaskAsDone(taskId));
    else if (status === STATUSES.DONE.CODE) dispatch(markTaskAsToDo(taskId));

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const onPressRight = (taskId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    dispatch(deleteTask(taskId));

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const renderItem = ({ item, drag, isActive }: RenderItemProps) => {
    const tap = Gesture.Tap()
      .maxDuration(100)
      .onStart(() => {
        navigation.navigate(SCREENS.TASK_DETAILS.name, { taskId: item?.id });
      })
      .runOnJS(true);

    const composed = Gesture.Exclusive(tap);
    return (
      <ScaleDecorator>
        <SwipeableItem
          key={item.id}
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
            <UnderlayLeft
              onPressLeft={onPressLeft}
              taskId={item.id}
              status={status}
            />
          )}
          renderUnderlayRight={() => (
            <UnderlayRight onPressRight={onPressRight} taskId={item.id} />
          )}
          snapPointsLeft={[50]}
          snapPointsRight={[50]}
        >
          <GestureDetector gesture={composed}>
            <TouchableOpacity
              activeOpacity={1}
              onLongPress={drag}
              disabled={isActive}
              style={[
                styles.row,
                {
                  borderLeftWidth: 9,
                  borderColor:
                    status === STATUSES.DONE.CODE
                      ? STATUSES.DONE.COLOR
                      : status === STATUSES.TO_DO.CODE
                      ? STATUSES.TO_DO.COLOR
                      : STATUSES.IN_PROGRESS.COLOR,
                },
              ]}
            >
              <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
          </GestureDetector>
        </SwipeableItem>
      </ScaleDecorator>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <View style={styles.headerTextSection}>
          <Text style={styles.headerText}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>

          <Ionicons
            name={isVisible ? "caret-up" : "caret-down"}
            size={24}
            color='#8927f6'
          />
        </View>
      </TouchableOpacity>
      {isVisible && (
        <NestableDraggableFlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => handleDragEnd(data, status)}
          ListEmptyComponent={
            <Text style={styles.listEmptyText}>No {status} tasks</Text>
          }
          renderItem={renderItem}
          onPlaceholderIndexChange={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          }
        />
      )}
    </View>
  );
};

export default StatusTaskList;

type UnderlayLeftProps = {
  onPressLeft: (taskId: string) => void;
  taskId: string;
  status: string;
};

const UnderlayLeft = ({ onPressLeft, taskId, status }: UnderlayLeftProps) => {
  const { percentOpen } = useSwipeableItemParams();
  const animStyle = useAnimatedStyle(() => ({
    opacity: percentOpen.value,
  }));

  return (
    <Animated.View
      style={[
        styles.row,
        styles.underlayLeft,
        animStyle,
        {
          backgroundColor:
            status === STATUSES.DONE.CODE
              ? STATUSES.TO_DO.COLOR
              : status === STATUSES.TO_DO.CODE
              ? STATUSES.IN_PROGRESS.COLOR
              : STATUSES.DONE.COLOR,
        },
      ]}
    >
      <TouchableOpacity onPress={() => onPressLeft(taskId)}>
        <Ionicons
          name={
            status === STATUSES.IN_PROGRESS.CODE
              ? "checkmark-done"
              : status === STATUSES.TO_DO.CODE
              ? "timer-outline"
              : "refresh"
          }
          size={21}
          color='black'
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

type UnderlayRightProps = {
  onPressRight: (taskId: string) => void;
  taskId: string;
};

function UnderlayRight({ onPressRight, taskId }: UnderlayRightProps) {
  return (
    <Animated.View style={[styles.row, styles.underlayRight]}>
      <TouchableOpacity onPress={() => onPressRight(taskId)}>
        <Ionicons name='trash-bin' size={20} color='black' />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 5,
    borderWidth: 1,
  },
  text: {
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
  },
  headerTextSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  listEmptyText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
    backgroundColor: "#ffdddd",
  },
  underlayRight: {
    backgroundColor: "tomato",
    justifyContent: "flex-start",
    width: 100,
  },
  underlayLeft: {
    justifyContent: "flex-end",
  },
});
