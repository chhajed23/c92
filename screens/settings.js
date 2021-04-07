import * as React from 'react'
import  {View} from 'react-native';
import MyHeader from "../components/myHeader";
export default class Setting extends React.Component{
    render(){
        return(
            <View>
                   <MyHeader title="Settings" navigation={this.props.navigation} />  
            </View>
        )
    }
}