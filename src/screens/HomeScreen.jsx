import React, { useState, useEffect } from 'react';
import { Text, FlatList, View, ActivityIndicator, TextInput, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import CarCard from '../components/CarCard';
import ModalDetail from '../components/ModalDetail';
import axios from 'axios';

const API_URL = 'https://sdp.lamborghini.com/gateway/mobile/integrations/api'; // Ajuste se necessário

const initialCars = [
  {
    id: '1',
    name: 'Lamborghini Urus',
    model: 'Urus',
    description: 'O SUV superesportivo da Lamborghini.',
    image: 'https://cdn.motor1.com/images/mgl/0x6xA/s1/lamborghini-urus.jpg'
  },
  {
    id: '2',
    name: 'Lamborghini Aventador',
    model: 'Aventador LP 780-4 Ultimae',
    description: 'O último da linhagem Aventador, com motor V12 aspirado.',
    image: 'https://cdn.motor1.com/images/mgl/0ANwB/s1/lamborghini-aventador-lp780-4-ultimae.jpg'
  },
  {
    id: '3',
    name: 'Lamborghini Huracán',
    model: 'Huracán EVO',
    description: 'Superesportivo com motor V10 e tração nas quatro rodas.',
    image: 'https://cdn.motor1.com/images/mgl/8x6xA/s1/lamborghini-huracan-evo.jpg'
  }
];

export default function HomeScreen() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  useEffect(() => {
    setCars(initialCars);
    setLoading(false);
  }, []);

  const handleSearch = async () => {
    if (!search) return;
    setSearching(true);
    try {
      // MOCK: Adiciona um carro fictício
      const newCar = {
        id: Math.random().toString(),
        name: `Lamborghini ${search}`,
        model: 'Modelo API',
        description: `Carro adicionado via busca: ${search}`,
        image: 'https://cdn.motor1.com/images/mgl/0x6xA/s1/lamborghini-urus.jpg'
      };
      setCars(prev => [newCar, ...prev]);
      setSearch('');
    } catch (error) {
      alert('Erro ao buscar carro na API');
    }
    setSearching(false);
  };

  const handleDelete = () => {
    setCars(prev => prev.filter(car => car.id !== carToDelete.id));
    setShowDeleteModal(false);
    setCarToDelete(null);
  };

  const renderCar = ({ item }) => (
    <View className="bg-gray-800 rounded-lg mb-6 p-4 shadow-lg items-center">
      <Image source={{ uri: item.image }} style={{ width: 250, height: 140, borderRadius: 12 }} />
      <Text className="text-white text-xl font-bold mt-4">{item.name}</Text>
      <Text className="text-gray-300 text-base mb-2">{item.model}</Text>
      <View className="flex-row mt-2 space-x-2">
        <TouchableOpacity onPress={() => setSelectedCar(item)} className="bg-yellow-500 px-6 py-2 rounded-full">
          <Text className="text-black font-bold">Detalhes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setCarToDelete(item); setShowDeleteModal(true); }} className="bg-red-500 px-6 py-2 rounded-full">
          <Text className="text-white font-bold">Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-900 px-2 pt-8">
      {/* Header estilizado */}
      <View className="flex-row items-center justify-between mb-6 px-2">
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Lamborghini_logo.svg' }} style={{ width: 40, height: 40 }} />
        <Text className="text-white text-2xl font-bold">ModelCar</Text>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Lamborghini_logo.svg' }} style={{ width: 40, height: 40 }} />
      </View>
      {/* Campo de busca */}
      <View className="flex-row items-center bg-gray-800 rounded-full px-4 py-2 mb-6">
        <TextInput
          className="flex-1 text-white"
          placeholder="Buscar modelo..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
          editable={!searching}
        />
        <TouchableOpacity onPress={handleSearch} disabled={searching} className="ml-2">
          <Text className="text-yellow-400 font-bold">Buscar</Text>
        </TouchableOpacity>
      </View>
      {/* Carrossel de carros */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
        {cars.map(car => (
          <View key={car.id} className="mr-4">
            <Image source={{ uri: car.image }} style={{ width: 180, height: 100, borderRadius: 12 }} />
            <Text className="text-white text-center mt-2">{car.name}</Text>
          </View>
        ))}
      </ScrollView>
      {/* Lista de carros */}
      <FlatList
        data={cars}
        renderItem={renderCar}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text className="text-white text-center">Nenhum carro encontrado.</Text>}
        showsVerticalScrollIndicator={false}
      />
      {/* Modal de confirmação de exclusão */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-60">
          <View className="bg-white p-8 rounded-lg w-11/12 items-center">
            <Text className="text-2xl font-bold mb-4">Deseja deletar esse carro?</Text>
            <View className="flex-row space-x-4 mt-2">
              <TouchableOpacity onPress={handleDelete} className="bg-red-500 px-6 py-2 rounded-full">
                <Text className="text-white font-bold">Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowDeleteModal(false)} className="bg-gray-400 px-6 py-2 rounded-full">
                <Text className="text-white font-bold">Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal de detalhes */}
      <ModalDetail visible={!!selectedCar} car={selectedCar} onClose={() => setSelectedCar(null)} />
    </View>
  );
}