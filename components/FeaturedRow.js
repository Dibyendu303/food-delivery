import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc';
import { ArrowRightIcon } from "react-native-heroicons/outline"
import RestaurantCard from './RestaurantCard';
import sanityClient from "../sanity";

const FeaturedRow = ({ title, description, id }) => {
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        sanityClient.fetch(
            `*[_type=="featured" && _id==$id]
            {
                ...,
                restaurants[]->{
                ...,
                category->,
                dishes[]->,
                image {
                  asset -> {
                    url
                  }
                }
              }
            }[0]`, { id }
        ).then(data => {
            setRestaurants(data?.restaurants);
        });
    }, [id]);

    return (
        <View>
            <View style={tw`mt-4 flex-row items-center justify-between px-4`}>
                <Text style={tw`font-bold text-lg`}>{title}</Text>
                <ArrowRightIcon color="#00CCBB" size={20} />
            </View>
            <Text style={tw`text-xs text-gray-500 px-4`}>{description}</Text>

            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                showsHorizontalScrollIndicator={false}
                style={tw`pt-4`}
            >

                {/* RestaurantCards  */}
                {restaurants?.map(restaurant => (
                    <RestaurantCard
                        key={restaurant._id}
                        id={restaurant._id}
                        title={restaurant.name}
                        short_description={restaurant.short_description}
                        imgUrl={restaurant.image}
                        rating={restaurant.rating}
                        genre={restaurant.category?.name}
                        address={restaurant.address}
                        dishes={restaurant.dishes}
                        long={restaurant.long}
                        lat={restaurant.lat}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default FeaturedRow