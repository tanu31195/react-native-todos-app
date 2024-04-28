import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { STATUSES } from '../../constants';

const StatusPicker = ({ selectedValue, onValueChange }) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={{ marginBottom: 20 }}
    >
      {Object.values(STATUSES).map((status) => (
        <Picker.Item
          key={status.CODE}
          label={status.TEXT}
          value={status.CODE}
        />
      ))}
    </Picker>
  );
};

export default StatusPicker;