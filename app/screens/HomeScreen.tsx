import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  NestableScrollContainer,
  NestableDraggableFlatList,
} from "react-native-draggable-flatlist";
import CreateTaskModal from "../components/CreateTaskModal";
import { reorderTasks } from "../store/redux/features/taskSlice";
import NestedDraggableListScreen from "../components/NestedDraggableListScreen";
import SwipeableScreen from "../components/SwipeableScreen";
import StatusTaskList from "../components/StatusTaskList";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const tasks = useSelector((state) => state.tasks.tasks);

  // Filter tasks into three separate arrays based on their status
  const tasksToDo = tasks.filter((task) => task.status === "to do");
  const tasksInProgress = tasks.filter((task) => task.status === "in progress");
  const tasksDone = tasks.filter((task) => task.status === "done");

  const handleDragEnd = (newTasks, status) => {
    // Dispatch to update the order of tasks
    dispatch(reorderTasks({ tasks: newTasks, status }));
  };

  return (
    // <NestedDraggableListScreen />
    // <SwipeableScreen />
    <View className='flex-1 p-4 space-x-1'>
      <NestableScrollContainer>
        <StatusTaskList
          tasks={tasksToDo}
          status='to do'
          handleDragEnd={handleDragEnd}
          navigation={navigation}
        />
        <StatusTaskList
          tasks={tasksInProgress}
          status='in progress'
          handleDragEnd={handleDragEnd}
          navigation={navigation}
        />
        <StatusTaskList
          tasks={tasksDone}
          status='done'
          handleDragEnd={handleDragEnd}
          navigation={navigation}
        />
      </NestableScrollContainer>
      <TouchableOpacity
        className='p-5 bg-purple-500 rounded-full absolute bottom-8 right-8'
        onPress={() => setModalVisible(true)}
      >
        <Text className='text-white text-center text-lg font-bold'>+</Text>
      </TouchableOpacity>
      {modalVisible && (
        <CreateTaskModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
};

export default HomeScreen;
