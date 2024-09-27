import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, ActivityIndicator, StyleSheet, Image, View } from 'react-native';

const images = {
  "Harry Potter and the Philosopher's Stone": 'https://rocco.com.br/app/uploads/2024/04/9786555324013.jpg',
  "Harry Potter and the Chamber of Secrets": 'https://rocco.com.br/app/uploads/2024/04/9786555324020.jpg',
  "Harry Potter and the Prisoner of Azkaban": 'https://rocco.com.br/app/uploads/2024/04/9786555324037.jpg',
  "Harry Potter and the Goblet of Fire": 'https://rocco.com.br/app/uploads/2024/04/9786555324044.jpg',
  "Harry Potter and the Order of the Phoenix": 'https://rocco.com.br/app/uploads/2024/04/9786555324051.jpg',
  "Harry Potter and the Half-Blood Prince": 'https://m.media-amazon.com/images/I/81SZC96OGOL._UF894,1000_QL80_.jpg',
  "Harry Potter and the Deathly Hallows": 'https://m.media-amazon.com/images/I/91hp-VvwgHL._AC_UF1000,1000_QL80_.jpg',
};

const bookDetails = {
  "Harry Potter and the Philosopher's Stone": { price: "R$ 39,90", category: "Fantasia", rating: 4.8, synopsis: "Harry descobre que é um bruxo e vai para Hogwarts." },
  "Harry Potter and the Chamber of Secrets": { price: "R$ 39,90", category: "Fantasia", rating: 4.7, synopsis: "Harry enfrenta novos perigos em sua segunda ano." },
  "Harry Potter and the Prisoner of Azkaban": { price: "R$ 39,90", category: "Fantasia", rating: 4.6, synopsis: "Harry descobre mais sobre seu passado." },
  "Harry Potter and the Goblet of Fire": { price: "R$ 39,90", category: "Fantasia", rating: 4.8, synopsis: "Harry participa do Torneio Tribruxo." },
  "Harry Potter and the Order of the Phoenix": { price: "R$ 39,90", category: "Fantasia", rating: 4.5, synopsis: "Harry enfrenta a volta de Voldemort." },
  "Harry Potter and the Half-Blood Prince": { price: "R$ 39,90", category: "Fantasia", rating: 4.7, synopsis: "Harry aprende mais sobre os Horcruxes." },
  "Harry Potter and the Deathly Hallows": { price: "R$ 39,90", category: "Fantasia", rating: 4.9, synopsis: "A batalha final entre Harry e Voldemort." },
};

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://potterhead-api.vercel.app/api/books');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Livraria do Harry Potter</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Image
              source={{ uri: images[item.title] || 'URL_PADRAO' }} // URL padrão caso não tenha imagem
              style={styles.image}
            />
            <Text style={styles.price}>{bookDetails[item.title]?.price || 'Preço não disponível'}</Text>
            <Text style={styles.category}>{bookDetails[item.title]?.category || 'Categoria não disponível'}</Text>
            <Text style={styles.rating}>Avaliação: {bookDetails[item.title]?.rating || 'Não avaliado'}</Text>
            <Text style={styles.synopsis}>{bookDetails[item.title]?.synopsis || 'Sinopse não disponível'}</Text>
          </View>
        )}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#4682B4',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
    margin: 10,
    alignItems: 'center',
    height: 850,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  image: {
    width: 500, // Diminui a largura da imagem
    height: 700, // Ajuste a altura conforme necessário
    borderRadius: 10,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    color: '#ff9800',
    marginVertical: 2,
  },
  synopsis: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default App;
