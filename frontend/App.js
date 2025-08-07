
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, FlatList } from 'react-native';

const API_URL = 'http://localhost:8000';

export default function App() {
  const [features, setFeatures] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const fetchFeatures = async () => {
    const res = await fetch(`${API_URL}/features`);
    const data = await res.json();
    setFeatures(data);
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const submitFeature = async () => {
    await fetch(`${API_URL}/features`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description: desc }),
    });
    setTitle('');
    setDesc('');
    fetchFeatures();
  };

  const upvote = async (id) => {
    await fetch(`${API_URL}/features/${id}/upvote`, { method: 'POST' });
    fetchFeatures();
  };

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Feature Voting App</Text>
      <TextInput placeholder="Feature Title" value={title} onChangeText={setTitle} style={{ borderWidth: 1, marginBottom: 5 }} />
      <TextInput placeholder="Description" value={desc} onChangeText={setDesc} style={{ borderWidth: 1, marginBottom: 5 }} />
      <Button title="Submit Feature" onPress={submitFeature} />

      <FlatList
        data={features}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Votes: {item.votes}</Text>
            <Button title="Upvote" onPress={() => upvote(item.id)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
