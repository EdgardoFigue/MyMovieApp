import { StyleSheet } from 'react-native'
import { scale, moderateScale, verticalScale} from 'react-native-size-matters';
import { Platform } from 'react-native';

/*#007799 color azul
#b3e837 color verde*/

const styles = StyleSheet.create({
    /*For Login Screen*/
    safeArea: {
        flex: 1,
        backgroundColor: '#82bac6',
        marginTop:  Platform.OS === 'ios' ? verticalScale(0) : verticalScale(0)
    },
    loginformcontainer: {
        flex: 1,
        backgroundColor: 'white'
        //padding: scale(0),
      },
      logo: {
        width: scale(150),
        height: verticalScale(140),
        resizeMode : 'stretch',
        alignItems: 'center',
        marginTop: scale(90),
        marginLeft: scale(110),
        backgroundColor: 'rgba(0,0,0,0)',
      },
      inputView:{
        marginRight: scale(40),
        marginLeft: scale(55),
        marginTop: scale(20),
        //paddingTop: scale(10),
       // paddingBottom: scale(10),
        //borderWidth: 1,
        width: scale(245),
        //textAlign:'center',
        //color: '#FFFFFF'
      },
      input2:{
        //marginRight: scale(40),
        marginLeft: scale(0),
        marginTop: scale(0),
        paddingTop: scale(15),
        paddingBottom: scale(10),
        borderWidth: 1,
        height: verticalScale(50),
        width: scale(245),
        textAlign:'center',
        color: 'black'
      },
      registerScreenButton:{
        marginRight: scale(40),
        marginLeft: scale(55),
        marginTop: scale(100),
        paddingTop: scale(10),
        paddingBottom: scale(10),
        backgroundColor:'#0a7595',
        width: scale(245),
        height: Platform.OS === 'ios' ? verticalScale(40) : verticalScale(50),
      },
      loginText:{
        color:'#FFFFFF',
        textAlign:'center',
        fontSize: scale(16),
        paddingLeft : scale(10),
        paddingRight : scale(10),
        justifyContent: 'center',
    },
    loginFieldsText:{
      color:'#82bac6',
      textAlign:'left',
      fontSize: scale(15),
      paddingLeft : scale(0),
      paddingRight : scale(10),
      justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#e8e7e3',
  },
  cardView: {
    backgroundColor: "white",
    margin: 10,
    elevation: 5
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    backgroundColor: "#02ADAD",
    width: 80,
    borderRadius: 10
  },
  buttonText: { color: "white", margin: 5, alignSelf: "center" },
  lineView: { height: 2, marginTop: 10, backgroundColor: "#EDEDED" },
  movieList: { marginLeft: 10, marginRight: 10, backgroundColor: "white", elevation: 10 },
  imageMainMenu: { width: 100, height: 180, marginLeft: 5, marginRight: 20 },
  rowView: { flexDirection: "row", marginTop: 10 },
  movieCard: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "white",
    elevation: 10
  },
  imageMovieDetail: { width: 180, height: 220, marginLeft: 5, margin: 20 }
});

export default styles;