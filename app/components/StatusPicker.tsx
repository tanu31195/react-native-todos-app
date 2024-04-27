import React from 'react';
import { Picker } from '@react-native-picker/picker';

const StatusPicker = ({ selectedValue, onValueChange }) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={{ marginBottom: 20 }}
    >
      {['to do', 'in progress', 'done'].map((status) => (
        <Picker.Item
          key={status}
          label={status.charAt(0).toUpperCase() + status.slice(1)}
          value={status}
        />
      ))}
    </Picker>
  );
};

export default StatusPicker;