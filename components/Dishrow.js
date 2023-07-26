import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc';
import Currency from 'react-currency-formatter';
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid"
import { useSelector, useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice';

const Dishrow = ({ id, name, description, price, image }) => {
    const [isPressed, setIsPressed] = useState(false);
    const items = useSelector((state) => selectBasketItemsWithId(state, id));
    const dispatch = useDispatch();
    const addItemToBasket = () => {
        dispatch(addToBasket({ id, name, description, price, image }));
    }
    const removeItemFromBasket = () => {
        if (!items.length > 0)
            return;
        dispatch(removeFromBasket({ id }));
    }

    return (
        <View style={tw`bg-white`}>
            <View style={tw`border-b border-gray-200 mx-4 py-4`}>
                <TouchableOpacity onPress={() => setIsPressed(!isPressed)}>
                    <View style={tw`flex-row`}>
                        <View style={tw`flex-1 pr-2`}>
                            <Text style={tw`text-lg mb-1`}>{name}</Text>
                            <Text style={tw`text-gray-400`}>{description}</Text>
                            <Text style={tw`text-gray-400 mt-2`}>
                                <Currency
                                    quantity={price}
                                    currency="INR"
                                />
                            </Text>
                        </View>
                        <View>
                            <Image style={tw`h-20 w-20 bg-gray-300 p-4 border border-gray-100`}
                                source={{
                                    uri: image ? urlFor(image).url() : 'https://i.ibb.co/S3yF0ym/food-icon.png',
                                }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>

                {isPressed && (
                    <View>
                        <View style={tw`mt-4 flex-row items-center`}>
                            <TouchableOpacity
                                disabled={!items.length}
                                onPress={removeItemFromBasket}>
                                <MinusCircleIcon color={items.length > 0 ? "#00CCBB" : "gray"} size={40} />
                            </TouchableOpacity>

                            <Text style={tw`mx-2`}>{items.length}</Text>

                            <TouchableOpacity onPress={addItemToBasket}>
                                <PlusCircleIcon color="#00CCBB" size={40} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}

export default Dishrow