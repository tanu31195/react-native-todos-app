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
import StatusPicker from "../components/ui/StatusPicker";
import { MESSAGES } from "../constants/messages";

const TaskDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { taskId } = route.params;
  const task = useSelector((state) =>
    state.tasks.tasks.find((t) => t.id === taskId)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);
  const [status, setStatus] = useState(task?.status);

  if (!task) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text>{MESSAGES.TASK_NOT_FOUND}</Text>
      </View>
    );
  }

  const handleUpdateTask = () => {
    if (!title || !status) {
      Alert.alert("Error", "Title and status are required");
      return;
    }
    dispatch(updateTask({ ...task, title, description, status }));
    setIsEditing(false);
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

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text className='text-lg font-bold'>{MESSAGES.TITLE}</Text>
      {isEditing ? (
        <TextInput
          value={title}
          onChangeText={setTitle}
          className='text-xl font-bold mb-1 border-b pb-1'
        />
      ) : (
        <Text className='text-xl mb-1'>{title}</Text>
      )}
      <Text className='text-lg font-bold'>{MESSAGES.DESCRIPTION}</Text>
      {isEditing ? (
        <TextInput
          value={description}
          onChangeText={setDescription}
          className='text-gray-700 border-b pb-1 mb-4'
          multiline
        />
      ) : (
        <Text className='text-gray-700 mb-4'>{description}</Text>
      )}
      <Text className='text-lg font-bold mb-2'>{MESSAGES.STATUS}</Text>
      {isEditing ? (
        <StatusPicker selectedValue={status} onValueChange={setStatus} />
      ) : (
        <Text className='mb-4'>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Text>
      )}
      {isEditing ? (
        <TouchableOpacity
          className='bg-blue-500 p-3 rounded mt-4'
          onPress={handleUpdateTask}
        >
          <Text className='text-white text-center'>
            {MESSAGES.SAVE_CHANGES}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className='bg-blue-500 p-3 rounded mt-4'
          onPress={toggleEditMode}
        >
          <Text className='text-white text-center'>{MESSAGES.EDIT_TASK}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        className='bg-red-500 p-3 rounded mt-4'
        onPress={handleDeleteTask}
      >
        <Text className='text-white text-center'>{MESSAGES.DELETE_TASK}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className='bg-gray-500 p-3 rounded mt-4'
        onPress={() => navigation.goBack()}
      >
        <Text className='text-white text-center'>{MESSAGES.BACK}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TaskDetailScreen;
