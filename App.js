import React, {useState} from "react";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Switch, Button } from "react-native";  

let CARTESTATIC =
[
  {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUCKHcIC75IVfRdot5tR0PpatTNoUFe1G56w&usqp=CAU',
    name: 'Crêpe pour grossir',
    price: '25€',
    description: 'Crêpe bien grasse pour prendre un max de poids comme tibo inshape en sah tu connais.',
    isChecked: true,
  },
  {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxvg3t61GjN-xaX-MxhD0-rybx7Ynulk66hA&usqp=CAU',
    name: 'Fraise tagada charnel',
    price: '10€',
    description: 'Fraise tagada accompagnée par une demoiselle très très très charmante.',
    isChecked: true,
  },
  {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREk8Uc9j03HROiFpzf3toFakh_AXtzvAxmbA&usqp=CAU',
    name: 'Mix de légumes et de gras',
    price: '14€',
    description: 'Pour ceux indécis qui font attendre le serveur dans les restaurants.',
    isChecked: false,
  },
  {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZItHCKKqFplaYo0uOOy7GfRnw-bIFJeMWaw&usqp=CAU',
    name: 'Biflette espagnol Alderiatienne',
    price: '45€',
    description: 'Plat concotais par un joueur de LoL après 45 losechain en ranked nommé alderiate. Ce plat represente son état mental.',
    isChecked: false,
  },
  {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlzDzMGIKHtbPXDax4OiShvEv824Bm0aW8A&usqp=CAU',
    name: 'Pâtes crues',
    price: '2€',
    description: `Plat pour les gens qui possède la pauvre énérgie alias l'énérgie de pauvre.`,
    isChecked: false,
  },
  {
    imageUrl: 'https://www.materiel-horeca.com/guide/wp-content/uploads/2021/07/bocaux-vide1.jpeg',
    name: 'Plat Vegan (bocal nutritif)',
    price: '19€',
    description: `Avec ce plat vous serez sur de garder la voie du veganisme dans votre estomac`,
    isChecked: false,
  },
]



export default function App() {

  let totalPrice = 0;

  let [menu, setMenu] = useState(CARTESTATIC);
  let [search, setSearch] = useState(``);
  let [currentDish, setCurrentDish] = useState();
  let [currentScreen, setCurrentScreen] = useState('menu');

  let selectedMenu = menu.filter(function (plat) {
    return plat.isChecked;
  });

  let filteredMenu = menu.filter(function (plat) {
    return plat.name
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
  });

  if (currentScreen == 'cart') {
    return (
      <ScrollView>
        <View style={styles.header}>
        <Text style={styles.titles}>DeliveCrous</Text>
        <TouchableOpacity
          onPress={function () {
            setCurrentScreen('menu');
          }}>
          <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>
        </View>
        <View style={styles.body}>
        <View style={styles.child}>
          <Text style={styles.cartesDescription}>Plat dans le panier : </Text>
          <View>
            {selectedMenu.length > 0 ? (
              selectedMenu.map(function (plat) {
                totalPrice = parseInt(totalPrice) + parseInt(plat.price);
                return (
                  <>
                    <Text style={styles.cartesDescription}>{plat.name} - {plat.price}</Text>
                    <TouchableOpacity
                      onPress={function () {
                        let newMenu = menu.map(function (c) {
                          // Si c'est le plat concérné
                          if (plat.name == c.name) {
                            c.isChecked = !c.isChecked; // J'inverse son statut
                            return c;
                          }
                          // Je retourne le plat tel qu'il est
                          return c;
                        });
            
                        setMenu(newMenu);
                      }}
                    >
                      <Ionicons name="md-trash-sharp" size={24} color="black" />
                    </TouchableOpacity>
                    </>
                );
              })
            ) : (
              <Text style={[styles.cartesDescription, { fontSize: 12, color: 'grey' }]}>
                Aucun plat selectionné
              </Text>
            )}
          </View>
          <Text>Le prix total de la commande est de {totalPrice}€</Text>
          <Button
            onPress={function () {setCurrentScreen('commandeValider');}}
            title="Valider commande"
            color="#841584"
          />

        </View>
        </View>
      </ScrollView>
    );
  } else if (currentScreen == 'dish_details') {
    return (
      <ScrollView>
        <View style={styles.header}>
        <Text style={styles.titles}>DeliveCrous</Text>
        <TouchableOpacity
          onPress={function () {
            setCurrentScreen('menu');
          }}>
          <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>
        </View>
        <View style={styles.body}>
        <View style={styles.child}>
        <CarteSwitch
          imageUrl={currentDish.imageUrl}
          name={currentDish.name}
          description={currentDish.description}
          price={currentDish.price}
          isChecked={currentDish.isChecked}
          onSwitch={function () {
            let newMenu = menu.map(function (c) {
              // Si c'est le champion concérné par le switch
              if (currentDish.name == c.name) {
                c.isChecked = !c.isChecked; // J'inverse son statut
                return c;
              }
              // Je retourne le champion tel qu'il est
              return c;
            });

            setMenu(newMenu);
          }}
        />
        </View>
        </View>
      </ScrollView>
    );
  } else if (currentScreen == 'commandeValider') {
    return (
      <ScrollView>
        <View style={styles.header}>
        <Text style={styles.titles}>DeliveCrous</Text>
        <TouchableOpacity
          onPress={function () {
            setCurrentScreen('menu');
          }}>
          <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>
        </View>
        <View style={styles.body}>
        <View style={styles.child}>
          <Text style={{fontWeight: "bold", fontSize:24}}>Commande validée </Text>
        <AntDesign style={{marginTop: 5}} name="checkcircle" size={24} color="green" />
        </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.titles}>DeliveCrous</Text>
        <TouchableOpacity onPress={function () {
            setCurrentScreen('cart');
          }}>
          <View style={{flexDirection: "row"}}>
            <AntDesign name="shoppingcart" size={30} color="white"/>
            <Text style={{color: 'white', fontSize: 24}}> {selectedMenu.length} </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.child}>
          {menu.map (function (plat) {
            return (
              <Carte
                onOpen={function () {
                  setCurrentDish(plat);
                  setCurrentScreen('dish_details');
                }}
              imageUrl={plat.imageUrl}
              name={plat.name}
            />
            )
          })}
      </View>
      </View>
      </SafeAreaView>
    
  );
}


function Carte(props) {
  return (
    <View style={styles.cartesContainer}>
      
      <Image
        style={styles.cartesImages}
        source={{uri: props.imageUrl}}
      />
      <View style={styles.cartesDescription}>
      <TouchableOpacity onPress={props.onOpen}>
      <Text style={[styles.cartesText, { fontSize: 20, fontWeight: 'bold' }]}>{props.name}</Text>
      <Text style={styles.cartesText}>{props.description}</Text>
      <Text styles={styles.cartesText}>{props.price}</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
}

function CarteSwitch(props) {
  return (
    <View style={styles.cartesContainerSwitch}>
      
      <Image
        style={styles.cartesImages}
        source={{uri: props.imageUrl}}
      />
      <View style={styles.cartesDescription}>
      <Text style={[styles.cartesText, { fontSize: 20, fontWeight: 'bold' }]}>{props.name}</Text>
      <Text style={styles.cartesText}>{props.description}</Text>
      <Text styles={styles.cartesText}>{props.price}</Text>
      <Switch 
        value={props.isChecked}
        onValueChange={props.onSwitch}
      />
      </View>
      
    </View>
  );
}

let styles = StyleSheet.create({
  header: {
    backgroundColor: '#05052D',
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: 'center',
    padding: 30
  },
  body: {
    backgroundColor: '#FAFAD2',
    alignItems: 'center',
    height:'100%'
  },
  child: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 60,
    backgroundColor: '#FAFAD2',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  titles: {
    fontSize: 36,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  cartesContainer: {
    backgroundColor: 'white',
    margin: 10,
    width: '40%',
    height: '20%',
    borderRadius: 1,
    borderColor: '#31334a',
    borderWidth: 0.1,
    marginVertical: 2,
  },
  cartesContainerSwitch: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    width: '40%',
    height: '70%',
    borderRadius: 1,
    borderColor: '#31334a',
    borderWidth: 0.1,
    marginVertical: 2,
    marginBottom: '150%'
  },
  cartesImages: {
    height: '50%',
    width: '100%',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  cartesDescription: {
    padding: 2,
  },
  cartesText: {
    marginTop: 4,
    fontSize: 16,
    color: 'black',
  },
});