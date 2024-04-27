import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/redux/features/taskSlice';
import uuid from 'react-native-uuid';

interface Props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const CreateTaskModal: React.FC<Props> = ({ modalVisible, setModalVisible }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('to do');
  const dispatch = useDispatch();

  const handleSaveTask = () => {
    if (!title || !status) {
      Alert.alert('Error', 'Title and status are required');
      return;
    }

    const newTask = {
      id: uuid.v4(),
      title,
      description,
      status,
    };

    dispatch(addTask(newTask));
    Alert.alert('Success', 'Task added successfully');
    setTitle('');
    setDescription('');
    setStatus('to do');
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 justify-center items-center p-4 bg-opacity-50">
        <View className="bg-white rounded-lg p-5 shadow-lg max-w-md w-full">
          <ScrollView>
            <Text className="text-lg font-bold mb-2">Create New Task</Text>
            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              className="border border-gray-300 p-2 rounded mb-4"
            />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              className="border border-gray-300 p-2 rounded mb-4"
              multiline
            />
            <Text className="text-lg font-bold mb-2">Status</Text>
            {['to do', 'in progress', 'done'].map((s) => (
              <TouchableOpacity
                key={s}
                className={`p-2 rounded mb-4 ${status === s ? 'bg-blue-200' : 'bg-gray-200'}`}
                onPress={() => setStatus(s)}
              >
                <Text>{s.charAt(0).toUpperCase() + s.slice(1)}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              className="bg-blue-500 p-3 rounded mt-4"
              onPress={handleSaveTask}
            >
              <Text className="text-white text-center">Save Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-red-500 p-3 rounded mt-2"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-center">Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CreateTaskModal;
