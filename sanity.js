import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
    projectId: 'qr5pcueh',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-05-03',
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
    return builder.image(source)
}

export default client;