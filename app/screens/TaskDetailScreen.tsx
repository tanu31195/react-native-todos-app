import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updateTask, deleteTask } from "../store/redux/features/taskSlice";
import StatusPicker from "../components/StatusPicker";

const TaskDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { taskId } = route.params;
  const task = useSelector((state) =>
    state.tasks.tasks.find((t) => t.id === taskId)
  );

  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);
  const [status, setStatus] = useState(task?.status);
  console.log("🚀 ~ TaskDetailScreen ~ status:", status);

  if (!task) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text>Task not found.</Text>
      </View>
    );
  }

  const handleUpdateTask = () => {
    if (!title || !status) {
      Alert.alert('Error', 'Title and status are required');
      return;
    }
    dispatch(updateTask({ ...task, title, description, status }));
    Alert.alert(
      "Task Updated",
      "The task details have been updated successfully."
    );
  };

  const handleDeleteTask = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel" },
        {
          text: "Yes",
          onPress: () => {
            dispatch(deleteTask(taskId));
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        className='text-xl font-bold mb-1 border-b pb-1'
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        className='text-gray-700 border-b pb-1 mb-4'
        multiline
      />
      <Text className='text-lg font-bold mb-2'>Status</Text>
      <StatusPicker selectedValue={status} onValueChange={setStatus} />
      <TouchableOpacity
        className='bg-blue-500 p-3 rounded mt-4'
        onPress={handleUpdateTask}
      >
        <Text className='text-white text-center'>Update Task</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className='bg-red-500 p-3 rounded mt-4'
        onPress={handleDeleteTask}
      >
        <Text className='text-white text-center'>Delete Task</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className='bg-gray-500 p-3 rounded mt-4'
        onPress={() => navigation.goBack()}
      >
        <Text className='text-white text-center'>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TaskDetailScreen;
