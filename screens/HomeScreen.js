import { View, Text, Image, SafeAreaView, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import {
    UserIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    AdjustmentsVerticalIcon
} from "react-native-heroicons/outline"
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from "../sanity";

const HomeScreen = () => {
    const navigation = useNavigation();

    const [featuredCategories, setFeaturedCategories] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type=="featured"]
            {
                ...,
                restaurants[]->{
                ...,
                dishes[]->
              }
            }`
        ).then(data => {
            setFeaturedCategories(data);
        });
    }, []);


    return (
        <SafeAreaView style={tw`bg-white pt-5`}>
            {/* Header */}
            <View style={tw`flex flex-row items-center pb-3 mx-4 justify-between`}>
                <View style={tw`flex-row items-center`}>
                    <Image source={require('../assets/delivery_icon.png')}
                        style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full mr-2`} />
                    <View>
                        <Text style={tw`font-bold text-gray-400 text-xs`}>Deliver Now!</Text>
                        <Text style={tw`font-bold text-xl`}>
                            Current Location
                            <ChevronDownIcon size={20} color="#00CCBB" />
                        </Text>
                    </View>
                </View>
                <UserIcon size={35} color="#00CCBB" />
            </View>

            {/* Search  */}
            <View style={tw`flex flex-row items-center mx-4 pb-2`}>
                <View style={tw`flex-row bg-gray-200 p-3 flex-1`}>
                    <MagnifyingGlassIcon size={20} color="gray" style={tw`mr-2`} />
                    <TextInput style={additionalStyles.textInput} placeholder='Restaurants and cuisines' placeholderTextColor="gray" keyboardType='default' />
                </View>
                <AdjustmentsVerticalIcon size={24} color="#00CCBB" style={tw`border border-red-400 ml-2`} />
            </View>

            {/* Body  */}
            <ScrollView style={tw`bg-gray-100`}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}>
                {/* Categories  */}
                <Categories />

                {featuredCategories?.map(category => (
                    <FeaturedRow
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const additionalStyles = StyleSheet.create({
    textInput: {
        width: '100%',
        // outlineWidth: 0,
    },
})