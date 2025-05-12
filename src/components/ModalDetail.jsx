import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

const ModalDetail = ({ visible, car, onClose }) => {
  if (!car) return null;
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white p-6 rounded-lg w-11/12">
          <Text className="text-center text-2xl font-bold mt-4">{car.name}</Text>
          <Text className="text-center mt-2">{car.model}</Text>
          <Text className="text-center mt-2">{car.description || 'Sem descrição disponível'}</Text>
          <TouchableOpacity
            onPress={onClose}
            className="bg-red-500 px-4 py-2 rounded-lg mt-4 self-center"
          >
            <Text className="text-white">Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDetail;