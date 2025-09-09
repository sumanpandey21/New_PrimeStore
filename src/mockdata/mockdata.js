import mainBannerImage1 from "@/assets/image1.jpg"
import mainBannerImage2 from "@/assets/image2.jpg"
import mainBannerImage3 from "@/assets/image3.jpg"
import mainBannerImage4 from "@/assets/image4.jpg"
import mainBannerImage5 from "@/assets/image5.jpg"
import productImage1 from "@/assets/productImage1.png"
import productImage2 from "@/assets/productImage2.png"
import productImage3 from "@/assets/productImage3.png"
import productImage4 from "@/assets/productImage4.png"
import productImage5 from "@/assets/productImage5.png"
import productImage6 from "@/assets/productImage6.png"


const categoriesMockData = [

    {
        id: 1,
        name: "Woman's Fashion",

    },

    {
        id: 2,
        name: "Men's Fashion",
    },

    {
        id: 3,
        name: "Electronics",
    },

    {
        id: 4,
        name: "Medicine",
    },

    {
        id: 5,
        name: "Sports and Outdoor",
    },

    {
        id: 6,
        name: "Baby's & Toys",
    },

    {
        id: 7,
        name: "Groceries & Pets"
    },
    {
        id: 8,
        name: "Health & Beauty"

    },

    {
        id: 9,
        name: "Automotive & Tools"
    },

]

export default categoriesMockData;




const MainBannerMockData = [
    {
        id: 1,
        pid: 1,
        image: mainBannerImage1,
        name: "Headphone"
    },
    {
        id: 2,
        pid: 2,
        image: mainBannerImage2,
        name: "Earphone"
    },
    {
        id: 3,
        pid: 3,
        image: mainBannerImage3,
        name: "Shoes"
    },
    {
        id: 4,
        pid: 4,
        image: mainBannerImage4,
        name: "Mouse"
    },
    // {
    //     id: 5,
    //     pid: 5,
    //     image: mainBannerImage5,
    //     name: "Clothes"
    // },

]


export { MainBannerMockData };


const productMockData = [
    {
        id: 1,
        image: "/playstation_side_image3.png",
        images: {
            main: "/images/playstation_main_image.png",
            gallery: [
                "/playstation_side_image1.png",
                "/playstation_side_image2.png",
                "/playstation_side_image3.png",
                "/playstation_side_image4.png",
            ],
        },
        name: "HAVIT HV-G92 Gamepad",
        price: 1200,
        item_left: 15,
        rating: 5,
        totalRatings: 89,
        discount: 40,
        in_stock: true,
        description:
            "PlayStation 5 controller skin made of high-quality vinyl with air channel adhesive for easy bubble-free installation and mess-free removal. Pressure-sensitive and durable.",
    },
    {
        id: 2,
        image: productImage2,
        name: "AK-900 Wired Keyboard",
        price: 2500,
        rating: 4,
        totalRatings: 75,
        discount: 35,
        in_stock: true,
        description: "Ergonomic wired keyboard with mechanical switches for tactile feedback. Features customizable RGB lighting, durable keycaps, and a compact design for efficient typing and gaming.",
    },
    {
        id: 3,
        image: productImage3,
        name: "IPS LCD Gaming Monitor",
        price: 200000,
        rating: 5,
        totalRatings: 150,
        discount: 30,
        in_stock: true,
        description: "27-inch IPS LCD gaming monitor with 144Hz refresh rate and 1ms response time. Offers vibrant colors, wide viewing angles, and adaptive sync for smooth gameplay.",
    },
    {
        id: 4,
        image: productImage4,
        name: "S-Series Comfort Chair",
        price: 400,
        rating: 4.5,
        totalRatings: 99,
        discount: 25,
        in_stock: true,
        description: "Adjustable ergonomic chair with lumbar support and breathable mesh fabric. Designed for long-lasting comfort during work or gaming sessions, with reclining and height adjustment features.",
    },
    {
        id: 5,
        image: productImage5,
        name: "ASUS FHD Gaming Laptop",
        price: 96000,
        rating: 5,
        totalRatings: 325,
        discount: 20,
        in_stock: true,
        description: "High-performance gaming laptop with a 15.6-inch FHD display, powerful NVIDIA graphics, and Intel Core processor. Includes fast SSD storage and advanced cooling for uninterrupted gaming.",
    },
    {
        id: 6,
        image: productImage6,
        name: "Quilted Satin Jacket",
        price: 750,
        rating: 4.5,
        totalRatings: 55,
        discount: 15,
        in_stock: true,
        description: "Stylish quilted satin jacket with a lightweight design. Features a smooth, glossy finish, comfortable fit, and versatile style suitable for casual or semi-formal occasions.",
    },
    {
        id: 7,
        image: productImage1,
        name: "HAVIT HV-G92 Gamepad",
        price: 1200,
        rating: 5,
        totalRatings: 89,
        discount: 40,
        in_stock: true,
        description: "PlayStation 5 controller skin made of high-quality vinyl with air channel adhesive for easy bubble-free installation and mess-free removal. Pressure-sensitive and durable.",
    },
    {
        id: 8,
        image: productImage2,
        name: "AK-900 Wired Keyboard",
        price: 2500,
        rating: 4,
        totalRatings: 75,
        discount: 35,
        in_stock: true,
        description: "Ergonomic wired keyboard with mechanical switches for tactile feedback. Features customizable RGB lighting, durable keycaps, and a compact design for efficient typing and gaming.",
    },
    {
        id: 9,
        image: productImage3,
        name: "IPS LCD Gaming Monitor",
        price: 30000,
        rating: 5,
        totalRatings: 150,
        discount: 30,
        in_stock: true,
        description: "27-inch IPS LCD gaming monitor with 144Hz refresh rate and 1ms response time. Offers vibrant colors, wide viewing angles, and adaptive sync for smooth gameplay.",
    },
    {
        id: 10,
        image: productImage4,
        name: "S-Series Comfort Chair",
        price: 400,
        rating: 4.5,
        totalRatings: 99,
        discount: 25,
        in_stock: true,
        description: "Adjustable ergonomic chair with lumbar support and breathable mesh fabric. Designed for long-lasting comfort during work or gaming sessions, with reclining and height adjustment features.",
    },
    {
        id: 11,
        image: productImage5,
        name: "ASUS FHD Gaming Laptop",
        price: 96000,
        rating: 5,
        totalRatings: 325,
        discount: 20,
        in_stock: true,
        description: "High-performance gaming laptop with a 15.6-inch FHD display, powerful NVIDIA graphics, and Intel Core processor. Includes fast SSD storage and advanced cooling for uninterrupted gaming.",
    },
    {
        id: 12,
        image: productImage6,
        name: "Quilted Satin Jacket",
        price: 750,
        rating: 4.5,
        totalRatings: 55,
        discount: 15,
        in_stock: true,
        description: "Stylish quilted satin jacket with a lightweight design. Features a smooth, glossy finish, comfortable fit, and versatile style suitable for casual or semi-formal occasions.",
    },
];

export { productMockData };


export const dateMockData = "2025-09-10T18:15:00.000Z";



const searchCategoryMockData = [
    {
        id: 1,
        image: productImage1,
        name: "Electronics",
    },
    {
        id: 2,
        image: productImage2,
        name: "Clothes",
    },
    {
        id: 3,
        image: productImage3,
        name: "Foods",
    },
    {
        id: 4,
        image: productImage4,
        name: "Sports",
    },
    {
        id: 5,
        image: productImage5,
        name: "Phone Accessories",
    },
    {
        id: 6,
        image: productImage6,
        name: "Kids",
    },
    {
        id: 7,
        image: productImage1,
        name: "Clothes",
    },
    {
        id: 8,
        image: productImage2,
        name: "Foods",
    }
]

export { searchCategoryMockData };


const mainImageMockData = [
    {
        id: 1,
        pid: 1,
        // image: mainBannerImage2,
        image: mainBannerImage1,
        name: "Music Player",
    },
]


export { mainImageMockData };


const newArrivalCardMockData = [
    {
        id: 1,
        image: productImage1,
        name: "HAVIT HV-G92 Gamepad",
    },
    {
        id: 2,
        image: productImage2,
        name: "AK-900 Wired Keyboard",
    },
    {
        id: 3,
        image: productImage3,
        name: "IPS LCD Gaming Monitor",
    },
    {
        id: 4,
        image: productImage4,
        name: "S-Series Comfort Chair ",
    },
]


export { newArrivalCardMockData };

