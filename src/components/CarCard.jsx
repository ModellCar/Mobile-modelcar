import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CarCard = ({ car, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="bg-gray-800 p-4 rounded-lg mb-4">
      <Text className="text-white text-center mt-2 text-lg">{car.name}</Text>
      <Text className="text-gray-300 text-center">{car.model}</Text>
    </TouchableOpacity>
  );
};

export default CarCard; 