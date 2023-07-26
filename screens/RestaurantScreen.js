import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { urlFor } from '../sanity';
import { ArrowLeftIcon, StarIcon, ChevronRightIcon, MapPinIcon } from "react-native-heroicons/solid"
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline"
import tw from 'twrnc';
import Dishrow from '../components/Dishrow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

const RestaurantScreen = () => {
    const route = useRoute();
    const { id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat } = route.params;
    const navigation = useNavigation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setRestaurant({ id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat }));
    }, [dispatch]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <>
            <BasketIcon />
            <ScrollView>
                <View style={tw`relative`}>
                    <Image
                        source={{
                            uri: urlFor(imgUrl).url(),
                        }}
                        style={tw`w-full h-56 bg-gray-300 p-4`}
                    />
                    <TouchableOpacity onPress={navigation.goBack} style={tw`absolute top-8 left-5 p-2 bg-gray-100 rounded-full`}>
                        <ArrowLeftIcon size={20} color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                <View style={tw`bg-white`}>
                    <View style={tw`px-4 pt-4`}>
                        <Text style={tw`text-3xl font-bold`}>{title}</Text>
                        <View style={tw`flex-row my-1`}>
                            <View style={tw`flex-row items-center`}>
                                <StarIcon color="green" opacity={0.5} size={22} />
                                <Text style={tw`text-xs text-gray-500 ml-1`} >
                                    <Text style={tw`text-green-500`} >{rating}</Text> • {genre}
                                </Text>
                            </View>
                            <View style={tw`flex-row items-center ml-2`}>
                                <MapPinIcon color="gray" opacity={0.4} size={22} />
                                <Text style={tw`text-xs text-gray-500 ml-1`}>Nearby • {address}</Text>
                            </View>
                        </View>
                        <Text style={tw`text-gray-500 mt-2 pb-4`}>{short_description}</Text>
                    </View>
                    <TouchableOpacity style={tw`flex-row items-center mx-4 py-4 border-t border-gray-300`}>
                        <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
                        <Text style={tw`pl-2 flex-1 text-base font-bold ml-2`}>
                            Have a food allergy?
                        </Text>
                        <ChevronRightIcon color={"#00CCBB"} style={tw`ml-2`} />
                    </TouchableOpacity>
                </View>
                <View style={tw`pb-36`}>
                    <Text style={tw`px-4 pt-6 mb-3 font-bold text-xl`}>
                        Menu
                    </Text>
                    {dishes.map(dish => (
                        <Dishrow
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            description={dish.short_description}
                            price={dish.price}
                            image={dish.image}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}

export default RestaurantScreen