import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';

import { 
  useEffect, 
  useState,
} from 'react';

import Api from '../services/Api';

import { ICharacter } from '../types';

function RMCharacter() {

  const [ character, setCharacter ] = useState<ICharacter[]>();
  const [ showModal, setShowModal ] = useState(false)
  const [ characterDetails, setCharacterDetails ] = useState<ICharacter>()
  
  useEffect(() => {
    Api.get('character').then(
      res => {
        setCharacter(res.data.results)
      }
    )
  }, [])

  const getDataCharacter = (id: Number) => {
    const value: ICharacter[] | any = character?.filter( item => item.id === id )
    
    let parsed: any = {}

    value.forEach(function (item: any) {
      for (var i in item) {
        parsed[i] = item[i];
      }
    });
    setCharacterDetails(parsed)
  }

  return(
    <SafeAreaView
      style={{ backgroundColor: '#7B25F0' }}
    >
      <ScrollView>
        <View
          style={styles.container}
        >
          { character?.map(
            (item, index) => (
              <View>
                <Modal
                 // animationType='slide'
                  visible={showModal}
                  onRequestClose={
                    () => setShowModal(!showModal)
                  }
                >
                  <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#23282b'
                  }}>
                     <Text
                        style={styles.textName}
                     >
                      
                      {characterDetails?.name}
                    </Text>

                  <Image 
                  style={{ width: 300, height: 300,marginTop:10,  borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}
                  source={{ uri: characterDetails?.image }}   
                />



                    <Text
                        style={styles.textName}
                     >
                      
                      {"Origin:"}
                    </Text>
                    <Text
                        style={styles.location}
                     >
                      
                      {characterDetails?.origin.name}
                    </Text>
                   
                    <Pressable
                      onPress={ () => setShowModal(!showModal) }
                      style={{ paddingTop: 40 }}
                    >
                      <Text style={styles.textName}>Voltar</Text>
                    </Pressable>
                  </View>
                </Modal>

                <Pressable
                    onPress={ () => {
                      getDataCharacter(item.id)
                      setShowModal(!showModal)
                    } }
                
                  >
                <View 
                style={styles.card}
                key={index}
              >
                <Image 
                  style={{ width: 150, height: 150,  borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}
                  source={{ uri: item.image }}   
                />
                <View
                  style={styles.textBox}
                >
                  <Text
                    style={styles.textName}
                  >
                    {item.name}
                  </Text>
                  <View
                  style={styles.containerText}
                >
                  <Text
                    style={styles.text}
                  >
                    {item.status}
                  </Text>

                  <Text
                    style={styles.text}
                  >
                    {" - "}
                  </Text>
                  <Text
                    style={styles.text}
                  >
                    {item.species}
                  </Text>

                  <Text
                    style={styles.text}
                  >
                    {" - "}
                  </Text>

                  <Text
                    style={styles.text}
                  >
                    {item.gender}
                  </Text>

                  </View>

                  <Text
                    style={styles.location}
                  >
                    {"Location:"}
                  </Text>

                  <Text
                    style={styles.text}
                  >
                    {item.location.name}
                  </Text>
                </View>
                </View>
                </Pressable>
              </View>
            )
          ) }
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingTop: 34,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#23282b',
    width: Dimensions.get('window').width - 18,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 12,
    margin: 12
  },
  textBox: {
    flex: 1,
    paddingHorizontal: 10
  },
  textName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
  },

  location: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },

  text: {
    color: '#fff'
  },
  containerText: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
})

export default RMCharacter