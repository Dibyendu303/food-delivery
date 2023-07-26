import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { TouchableOpacity } from 'react-native-web';
import { XMarkIcon } from 'react-native-heroicons/solid';
import * as Progress from 'react-native-progress';
import tw from 'twrnc';

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    return (
        <View style={tw`bg-[#00CCBB] flex-1 relative`}>
            <SafeAreaView style={tw`z-50`}>
                <View style={tw`flex-row justify-between items-center p-5`}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <XMarkIcon color={"white"} size={30} />
                    </TouchableOpacity>
                    <Text style={tw`font-light text-white text-lg`}>Order Help</Text>
                </View>

                <View style={tw`bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md`}>
                    <View style={tw`flex-row justify-between`}>
                        <View>
                            <Text style={tw`text-lg text-gray-400`}>Estimated Arrival</Text>
                            <Text style={tw`text-4xl font-bold`}>30-40 Minutes</Text>
                        </View>
                        <Image style={tw`h-20 w-20`}
                            source={require('../assets/rider_icon.jpg')}
                        />
                    </View>
                    <Progress.Bar indeterminate={true} width={150} color='#00CCBB' />
                    <Text style={tw`mt-3 text-gray-500`}>
                        Your order at {restaurant.title} is being prepared
                    </Text>
                </View>
            </SafeAreaView>
            <View style={tw`flex justify-center items-center`}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.90509922695!2d78.24323361184224!3d17.412608639938817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1689872295508!5m2!1sen!2sin" width="400" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </View>
            <SafeAreaView style={tw`absolute bottom-0 bg-white flex-row items-center h-28 w-full`}>
                <Image style={tw`h-12 w-12 bg-gray-300 p-4 rounded-full ml-5`}
                    source={require('../assets/delivery_rider_icon.jpg')}
                />
                <View style={tw`flex-1 mx-5`}>
                    <Text style={tw`text-lg`}>Dibyendu Dey</Text>
                    <Text style={tw`text-gray-400`}>Your rider</Text>
                </View>
                <Text style={tw`text-[#00CCBB] text-lg mr-5 font-bold`}>Call</Text>
            </SafeAreaView>
        </View>
    )
}

export default DeliveryScreen