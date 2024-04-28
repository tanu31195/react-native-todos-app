import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/redux/features/taskSlice";
import uuid from "react-native-uuid";
import StatusPicker from "./StatusPicker";
import { MESSAGES } from "../../constants/messages";
import { STATUSES } from "../../constants";

type CreateTaskModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const CreateTaskModal = ({
  modalVisible,
  setModalVisible,
}: CreateTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(STATUSES.TO_DO.CODE);
  const dispatch = useDispatch();

  const handleSaveTask = () => {
    if (!title || !status) {
      Alert.alert("Error", "Title and status are required");
      return;
    }

    const newTask = {
      id: uuid.v4(),
      title,
      description,
      status,
    };

    dispatch(addTask(newTask));
    Alert.alert("Success", "Task added successfully");
    setTitle("");
    setDescription("");
    setStatus(STATUSES.TO_DO.CODE);
    setModalVisible(false);
  };

  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className='flex-1 justify-center items-center p-4 bg-opacity-50'>
        <View className='bg-white rounded-lg p-5 shadow-lg max-w-md w-full'>
          <ScrollView>
            <Text className='text-lg font-bold mb-2'>
              {MESSAGES.CREATE_NEW_TASK}
            </Text>
            <TextInput
              placeholder='Title'
              value={title}
              onChangeText={setTitle}
              className='border border-gray-300 p-2 rounded mb-4'
            />
            <TextInput
              placeholder='Description'
              value={description}
              onChangeText={setDescription}
              className='border border-gray-300 p-2 rounded mb-4'
              multiline
            />
            <Text className='text-lg font-bold mb-2'>{MESSAGES.STATUS}</Text>
            <StatusPicker selectedValue={status} onValueChange={setStatus} />
            <TouchableOpacity
              className='bg-blue-500 p-3 rounded mt-4'
              onPress={handleSaveTask}
            >
              <Text className='text-white text-center'>
                {MESSAGES.SAVE_TASK}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='bg-red-500 p-3 rounded mt-2'
              onPress={() => setModalVisible(false)}
            >
              <Text className='text-white text-center'>{MESSAGES.CANCEL}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CreateTaskModal;
