import { View, Text, StatusBar, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { Component } from "react";
import Loader from "./../utilities/Loader";
import { callRemoteMethod } from "../utilities/WebServiceHandler";
import Constants from "./../utilities/Constants";
import { renderIf } from "../utilities/CommonMethods";
import Styles from "./Style";
import { customAlert } from "./../utilities/CommonMethods";
import { NavigationScreenProp } from 'react-navigation';
import { Rating  } from 'react-native-ratings';


 type Props = {
  navigation: NavigationScreenProp<any,any>
};

class MainScreen extends Component<Props> {

  constructor(props: Props) {
      super(props);
      console.log("Begin Get Popular Movies")

      var endpoint =
      Constants.URL.BASE_URL + Constants.URL.GET_POPULATE_MOVIES + Constants.URL.API_KEY;
      callRemoteMethod(this, endpoint, {}, "searchCallback", "GET", true);

  } 

  static navigationOptions = {
    headerTitle: Constants.Strings.MAIN_TITLE
  };
  state = {
    movieList: [], // Lista de peliculas despues de busqueda
    isLoading: false, // Cuando el dialogo de carga sera mostrado
    searchText: "", // Texto a buscar
    noData: false // Estado si la busqueda no obtiene resultados
  };

  searchButtonPressed = () => {
    if (this.state.searchText.length) {
      var endpoint =
        Constants.URL.BASE_URL + Constants.URL.SEARCH_QUERY + this.state.searchText + "&" + Constants.URL.API_KEY;
      callRemoteMethod(this, endpoint, {}, "searchCallback", "GET", true);
    } else {
      customAlert(Constants.Strings.MSG);
    }
  };

  searchCallback = response => {
    if (response.results.length) {
      this.setState({ noData: false });
      this.setState({ movieList: response.results });
    } else {
      this.setState({ movieList: [] });
      this.setState({ noData: true });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.isLoading ? <Loader show={true} loading={this.state.isLoading} /> : null}
        <StatusBar backgroundColor={Constants.Colors.Cyan} barStyle="light-content" />
        <View style={{ backgroundColor: Constants.Colors.Grey }}>
          <View style={Styles.cardView}>
            <View style={{ margin: 10 }}>
              <TextInput
                placeholder={Constants.Strings.PLACEHOLDER}
                onChangeText={text => this.setState({ searchText: text })}
                underlineColorAndroid={Constants.Colors.Transparent}
                returnKeyType='search'
                onSubmitEditing = {this.searchButtonPressed}
              />
              <View style={{ height: 1, backgroundColor: Constants.Colors.Grey, margin: 0 }} />
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={() => this.searchButtonPressed()} style={Styles.buttonContainer}>
                <Text style={Styles.buttonText}>{Constants.Strings.SEARCH_BUTTON}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {renderIf(this.state.noData, <Text style={{ textAlign: "center" }}>No data found.</Text>)}
        {renderIf(
          this.state.movieList.length,
          <ScrollView style={Styles.movieList} showsVerticalScrollIndicator={false}>
            <View>
              {this.state.movieList.map(function(obj, i) {
                return (
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("GetMovieDetail", { id: obj.id })}
                    key={i}
                    style={{ margin: 10, marginBottom: 5 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        style={Styles.imageMainMenu}
                        source={{
                          uri:
                            obj.poster_path != null
                              ? Constants.URL.IMAGE_URL + obj.poster_path
                              : Constants.URL.PLACEHOLDER_IMAGE
                        }}
                      />
                      <View style={{ flexDirection: "column" }}>
                        <Text numberOfLines={3} style={{ fontSize: 17 }}>
                          {obj.original_title}
                        </Text>
                        <View style={Styles.rowView}>
                          <Text>{Constants.Strings.RELEASE_DATE}</Text>
                          <Text>{obj.release_date}</Text>
                        </View>
                        <View style={Styles.rowView}>
                          <Text>{Constants.Strings.LANGUAGE}</Text>
                          <Text>{obj.original_language}</Text>
                        </View>
                        <View style={Styles.rowView}>
                          <Text>{Constants.Strings.RATINGS}</Text>
                          <Rating
                              imageSize={20}
                              ratingCount = {5}
                              startingValue={obj.vote_average/2}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={Styles.lineView} />
                  </TouchableOpacity>
                );
              }, this)}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

export default MainScreen;
