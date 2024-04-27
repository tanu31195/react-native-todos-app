import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NestableDraggableFlatList } from "react-native-draggable-flatlist";

const StatusTaskList = ({ tasks, status, handleDragEnd, navigation }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <Text className='text-lg font-bold mb-2'>{status} {isVisible? "^" : "V"}</Text>
      </TouchableOpacity>
      {isVisible && (
        <NestableDraggableFlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => handleDragEnd(data, status)}
          renderItem={({ item, drag, isActive }) => (
            <TouchableOpacity
              onLongPress={drag}
              disabled={isActive}
              className={`p-2 bg-gray-100 rounded mb-2 ${
                isActive ? "bg-blue-300" : ""
              }`}
              onPress={() =>
                navigation.navigate("Task Details", { taskId: item?.id })
              }
            >
              <Text className='text-base font-semibold'>{item?.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default StatusTaskList;
