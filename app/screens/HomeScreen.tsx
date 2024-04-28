import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NestableScrollContainer } from "react-native-draggable-flatlist";
import CreateTaskModal from "../components/ui/CreateTaskModal";
import { reorderTasks } from "../store/redux/features/taskSlice";
import StatusTaskList from "../components/StatusTaskList";
import { STATUSES } from "../constants";
import { Task } from "../types/common";
import { BlurView } from "expo-blur";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const tasks = useSelector((state) => state.tasks.tasks);

  const tasksToDo = tasks.filter(
    (task: Task) => task.status === STATUSES.TO_DO.CODE
  );
  const tasksInProgress = tasks.filter(
    (task: Task) => task.status === STATUSES.IN_PROGRESS.CODE
  );
  const tasksDone = tasks.filter(
    (task: Task) => task.status === STATUSES.DONE.CODE
  );

  const handleDragEnd = (newTasks: Task[], status: string) => {
    dispatch(reorderTasks({ tasks: newTasks, status }));
  };

  return (
    <View className='flex-1 p-4 space-x-1'>
      <NestableScrollContainer>
        <StatusTaskList
          tasks={tasksToDo}
          status={STATUSES.TO_DO.CODE}
          handleDragEnd={handleDragEnd}
          navigation={navigation}
        />
        <StatusTaskList
          tasks={tasksInProgress}
          status={STATUSES.IN_PROGRESS.CODE}
          handleDragEnd={handleDragEnd}
          navigation={navigation}
        />
        <StatusTaskList
          tasks={tasksDone}
          status={STATUSES.DONE.CODE}
          handleDragEnd={handleDragEnd}
          navigation={navigation}
        />
      </NestableScrollContainer>
      <TouchableOpacity
        className='p-5 bg-purple-500 rounded-full absolute bottom-14 right-12'
        onPress={() => setModalVisible(true)}
      >
        <Text className='text-white text-center text-lg font-bold'>+</Text>
      </TouchableOpacity>
      {modalVisible && (
        <BlurView intensity={5} style={{ height: "100%", width: "100%" }}>
          <CreateTaskModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </BlurView>
      )}
    </View>
  );
};

export default HomeScreen;
