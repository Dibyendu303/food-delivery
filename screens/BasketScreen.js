import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import tw from 'twrnc';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const basketTotal = useSelector(selectBasketTotal)
    const items = useSelector(selectBasketItems);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setGroupedItemsInBasket(groupedItems);
        console.log(groupedItems);
    }, [items]);

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <View style={tw`flex-1 bg-gray-100`}>
                <View style={tw`p-5 border-b border-[#00CCBB] bg-white shadow-sm`}>
                    <View>
                        <Text style={tw`text-lg font-bold text-center`}>Basket</Text>
                        <Text style={tw`text-center text-gray-400`}>{restaurant.title}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        style={tw`rounded-full bg-gray-100 absolute top-3 right-5`}
                    >
                        <XCircleIcon height={50} width={50} color="#00CCBB" />
                    </TouchableOpacity>
                </View>
                <View style={tw`flex-row items-center px-4 py-3 bg-white my-5`}>
                    <Image
                        source={{
                            uri: urlFor(restaurant.imgUrl).url(),
                        }}
                        style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
                    />
                    <Text style={tw`flex-1 mx-4`}>Deliver in 30-40 min</Text>
                    <TouchableOpacity>
                        <Text style={tw`text-[#00CCBB]`}>Change</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {Object.entries(groupedItemsInBasket).map(([key, items], index) => (
                        <View key={key} style={tw`flex-row items-center bg-white py-2 px-5 border-gray-200 ${index && 'border-t'}`}>
                            <Text style={tw`text-[#00CCBB] mr-3`}>
                                {items.length} x
                            </Text>
                            <Image
                                source={{
                                    uri: items[0].image ? urlFor(items[0].image).url() : 'https://i.ibb.co/S3yF0ym/food-icon.png',
                                }}
                                style={tw`h-12 w-12 rounded-full mr-3`}
                            />
                            <Text style={tw`flex-1 mr-3`}>{items[0]?.name}</Text>
                            <Text style={tw`text-gray-600 mr-3`}>
                                <Currency
                                    quantity={items[0]?.price}
                                    currency="INR"
                                />
                            </Text>
                            <TouchableOpacity>
                                <Text style={tw`text-[#00CCBB] text-xs`} onPress={() => dispatch(removeFromBasket({ id: key }))}>
                                    Remove
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                <View style={tw`p-5 bg-white mt-5`}>
                    <View style={tw`flex-row justify-between mb-4`}>
                        <Text style={tw`text-gray-400`}>Subtotal</Text>
                        <Text style={tw`text-gray-400`}>
                            <Currency quantity={basketTotal} currency="INR" />
                        </Text>
                    </View>
                    <View style={tw`flex-row justify-between mb-4`}>
                        <Text style={tw`text-gray-400`}>Delivery fee</Text>
                        <Text style={tw`text-gray-400`}>
                            <Currency quantity={50} currency="INR" />
                        </Text>
                    </View>
                    <View style={tw`flex-row justify-between mb-4`}>
                        <Text style={tw`text-gray-400`}>Taxes</Text>
                        <Text style={tw`text-gray-400`}>
                            <Currency quantity={9} currency="INR" />
                        </Text>
                    </View>
                    <View style={tw`flex-row justify-between mb-4`}>
                        <Text style={tw`text-gray-400`}>Order total</Text>
                        <Text style={tw`text-gray-400`}>
                            <Currency quantity={basketTotal + 59} currency="INR" />
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("PreparingOrder")}
                        style={tw`rounded-lg bg-[#00CCBB] p-4`}
                    >
                        <Text style={tw`text-center text-white text-lg font-bold`}>
                            Place Order
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    )
}

export default BasketScreen