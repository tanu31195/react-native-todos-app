import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/redux/features/taskSlice';
import uuid from 'react-native-uuid';

const CreateTaskScreen = () => {
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
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
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
      <TouchableOpacity
        className={`p-2 rounded mb-4 ${status === 'to do' ? 'bg-blue-200' : 'bg-gray-200'}`}
        onPress={() => setStatus('to do')}
      >
        <Text>To Do</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`p-2 rounded mb-4 ${status === 'in progress' ? 'bg-blue-200' : 'bg-gray-200'}`}
        onPress={() => setStatus('in progress')}
      >
        <Text>In Progress</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`p-2 rounded ${status === 'done' ? 'bg-blue-200' : 'bg-gray-200'}`}
        onPress={() => setStatus('done')}
      >
        <Text>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-blue-500 p-3 rounded mt-4"
        onPress={handleSaveTask}
      >
        <Text className="text-white text-center">Save Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateTaskScreen;