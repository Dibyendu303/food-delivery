import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { urlFor } from '../sanity';

const CategoryCard = ({ imgUrl, title }) => {
    return (
        <TouchableOpacity style={tw`relative mr-2`}>
            <Image
                source={{
                    uri: urlFor(imgUrl).width(200).url(),
                }}
                style={tw`h-20 w-20 rounded`}
            />
            <Text style={tw`absolute bottom-1 left-1 text-white font-bold`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CategoryCard