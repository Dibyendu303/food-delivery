import { SafeAreaView, View } from 'react-native';
import React, { useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery");
        }, 4000);
    }, [])
    return (
        <SafeAreaView style={tw`bg-[#00CCBB] flex-1 justify-center items-center`}>
            <Animatable.Image
                source={require("../assets/orderLoading.gif")}
                animation="slideInUp"
                iterationCount={1}
                style={tw`h-96 w-96`}
            />
            <Animatable.Text
                animation="slideInUp"
                iterationCount={1}
                style={tw`text-lg my-10 text-white font-bold text-center`}
            >
                Waiting for Restaurant to accept your order!
            </Animatable.Text>
            <Progress.Bar indeterminate={true} width={200} color='white' />
        </SafeAreaView>
    )
}

export default PreparingOrderScreen