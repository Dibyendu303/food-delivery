import { ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import CategoryCard from './CategoryCard'
import sanityClient from "../sanity"

const Categories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        sanityClient.fetch(
            `*[_type=="category"]
            {
                ...,
                image {
                  asset -> {
                    url
                  }
                }
            }`).then(data => {
                setCategories(data);
            });
    }, []);
    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {categories?.map(category => (
                <CategoryCard key={category._id} imgUrl={category.image} title={category.name} />
            ))}
        </ScrollView>
    )
}

export default Categories