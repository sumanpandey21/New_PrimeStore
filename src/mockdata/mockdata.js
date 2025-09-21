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
        products: [
            {
                id: 101,
                name: "Floral Maxi Dress",
                price: 4999,
                item_left: 30,
                rating: 3,
                totalRatings: 120,
                in_stock: true,
                description: "A lightweight, floral-patterned maxi dress perfect for summer outings or casual events, offering comfort and elegance.",
                images: {
                    main: "/maxidress1.png",
                    gallery: [
                        "/maxidress1.png",
                        "/maxidress2.png",
                        "/maxidress3.png",
                    ],
                },
            },
            {
                id: 102,
                name: "Leather Handbag",
                price: 7999,
                item_left: 25,
                rating: 4.8,
                totalRatings: 95,
                in_stock: true,
                description: "A stylish leather handbag with ample storage space, ideal for daily use or special occasions.",
                images: {
                    main: "/handbag1.png",
                    gallery: [
                        "/handbag1.png",
                        "/handbag2.png",
                        "/handbag3.png",
                    ],
                },
            },
            {
                id: 103,
                name: "High-Heel Sandals",
                price: 3999,
                item_left: 40,
                rating: 4.2,
                totalRatings: 80,
                in_stock: true,
                description: "Elegant high-heel sandals with a cushioned sole, perfect for parties or formal gatherings.",
                images: {
                    main: "/sandals1.png",
                    gallery: [
                        "/sandals1.png",
                        "/sandals2.png",
                        "/sandals3.png",
                    ],
                },
            },
        ],
    },
    {
        id: 2,
        name: "Men's Fashion",
        products: [
            {
                id: 104,
                name: "Slim-Fit Blazer",
                price: 12999,
                item_left: 20,
                rating: 4.7,
                totalRatings: 110,
                in_stock: true,
                description: "A tailored slim-fit blazer, ideal for formal occasions or professional settings, made with breathable fabric.",
                images: {
                    main: "/blazer1.png",
                    gallery: [
                        "/blazer1.png",
                        "/blazer2.png",
                        "/blazer3.png",
                    ],
                },
            },
            {
                id: 105,
                name: "Casual Denim Jeans",
                price: 4999,
                item_left: 35,
                rating: 4.4,
                totalRatings: 85,
                in_stock: true,
                description: "Durable and comfortable denim jeans with a relaxed fit, suitable for everyday wear.",
                images: {
                    main: "/jeans1.png",
                    gallery: [
                        "/jeans1.png",
                        "/jeans2.png",
                        "/jeans3.png",
                    ],
                },
            },
            {
                id: 106,
                name: "Leather Sneakers",
                price: 6999,
                item_left: 28,
                rating: 4.6,
                totalRatings: 92,
                in_stock: true,
                description: "Stylish leather sneakers with a cushioned sole, perfect for casual outings or light activities.",
                images: {
                    main: "/sneakers1.png",
                    gallery: [
                        "/sneakers1.png",
                        "/sneakers2.png",
                        "/sneakers3.png",
                    ],
                },
            },
        ],
    },
    {
        id: 3,
        name: "Electronics",
        products: [
            {
                id: 107,
                name: "Canon Eos DSLR camera",
                price: 90000,
                item_left: 15,
                rating: 5,
                totalRatings: 89,
                in_stock: true,
                description: "A high-performance Canon EOS DSLR camera with advanced autofocus and 24.2MP sensor, ideal for professional photography.",
                images: {
                    main: "/dslrcamera1.png",
                    gallery: [
                        "/dslrcamera1.png",
                        "/dslrcamera2.png",
                        "/dslrcamera3.png",
                    ],
                },
            },
            {
                id: 108,
                name: "RGB liquid CPU cooler",
                price: 9999,
                item_left: 20,
                rating: 3.5,
                totalRatings: 65,
                in_stock: true,
                description: "An efficient RGB liquid CPU cooler with customizable lighting, designed to keep your system cool during intense tasks.",
                images: {
                    main: "/cpucooler1.png",
                    gallery: [
                        "/cpucooler1.png",
                        "/cpucooler2.png",
                        "/cpucooler3.png",
                    ],
                },
            },
            {
                id: 109,
                name: "Wireless Bluetooth Earbuds",
                price: 4999,
                item_left: 50,
                rating: 4.3,
                totalRatings: 150,
                in_stock: true,
                description: "Compact wireless Bluetooth earbuds with noise cancellation and up to 20 hours of battery life, perfect for music and calls.",
                images: {
                    main: "/earbuds1.png",
                    gallery: [
                        "/earbuds1.png",
                        "/earbuds2.png",
                        "/earbuds3.png",
                    ],
                },
            },
        ],
    },
    {
        id: 4,
        name: "Stationery",
        products: [
            {
                id: 110,
                name: "Multivitamin Tablets",
                price: 1499,
                item_left: 100,
                rating: 4.5,
                totalRatings: 200,
                in_stock: true,
                description: "Daily multivitamin tablets packed with essential nutrients to support immunity and overall health.",
                images: {
                    main: "/multivitamin1.png",
                    gallery: [
                        "/multivitamin1.png",
                        "/multivitamin2.png",
                        "/multivitamin3.png",
                    ],
                },
            },
            {
                id: 112,
                name: "Pain Relief Gel",
                price: 799,
                item_left: 80,
                rating: 4.2,
                totalRatings: 130,
                in_stock: true,
                description: "Fast-acting pain relief gel for muscle and joint discomfort, suitable for athletes and daily use.",
                images: {
                    main: "/painrelief1.png",
                    gallery: [
                        "/painrelief1.png",
                        "/painrelief2.png",
                        "/painrelief3.png",
                    ],
                },
            },
            {
                id: 113,
                name: "Omega-3 Fish Oil Capsules",
                price: 1999,
                item_left: 60,
                rating: 4.6,
                totalRatings: 175,
                in_stock: true,
                description: "High-potency Omega-3 fish oil capsules to support heart, brain, and joint health.",
                images: {
                    main: "/omega3_1.png",
                    gallery: [
                        "/omega3_1.png",
                        "/omega3_2.png",
                        "/omega3_3.png",
                    ],
                },
            },
        ],
    },
    {
        id: 5,
        name: "Sports and Outdoor",
        products: [
            {
                id: 114,
                name: "Yoga Mat",
                price: 2999,
                item_left: 45,
                rating: 4.4,
                totalRatings: 90,
                in_stock: true,
                description: "A non-slip yoga mat with extra cushioning, perfect for yoga, pilates, or home workouts.",
                images: {
                    main: "/yogamat1.png",
                    gallery: [
                        "/yogamat1.png",
                        "/yogamat2.png",
                        "/yogamat3.png",
                    ],
                },
            },
            {
                id: 115,
                name: "Camping Tent",
                price: 12999,
                item_left: 20,
                rating: 4.7,
                totalRatings: 110,
                in_stock: true,
                description: "A durable, waterproof camping tent for 4 people, ideal for outdoor adventures.",
                images: {
                    main: "/tent1.png",
                    gallery: [
                        "/tent1.png",
                        "/tent2.png",
                        "/tent3.png",
                    ],
                },
            },
            {
                id: 116,
                name: "Fitness Tracker",
                price: 5999,
                item_left: 35,
                rating: 4.3,
                totalRatings: 140,
                in_stock: true,
                description: "A smart fitness tracker with heart rate monitoring, step counting, and sleep tracking features.",
                images: {
                    main: "/tracker1.png",
                    gallery: [
                        "/tracker1.png",
                        "/tracker2.png",
                        "/tracker3.png",
                    ],
                },
            },
        ],
    },
    {
        id: 6,
        name: "Baby's & Toys",
        products: [
            {
                id: 117,
                name: "Plush Teddy Bear",
                price: 1999,
                item_left: 50,
                rating: 4.8,
                totalRatings: 160,
                in_stock: true,
                description: "A soft, cuddly teddy bear perfect for kids, made with hypoallergenic materials.",
                images: {
                    main: "/teddybear1.png",
                    gallery: [
                        "/teddybear1.png",
                        "/teddybear2.png",
                        "/teddybear3.png",
                    ],
                },
            },
            {
                id: 118,
                name: "Baby Stroller",
                price: 14999,
                item_left: 15,
                rating: 4.6,
                totalRatings: 95,
                in_stock: true,
                description: "A lightweight, foldable baby stroller with adjustable handles and a comfortable seat.",
                images: {
                    main: "/stroller1.png",
                    gallery: [
                        "/stroller1.png",
                        "/stroller2.png",
                        "/stroller3.png",
                    ],
                },
            },
            {
                id: 119,
                name: "Building Block Set",
                price: 2499,
                item_left: 60,
                rating: 4.5,
                totalRatings: 130,
                in_stock: true,
                description: "A colorful building block set to spark creativity and improve motor skills in children.",
                images: {
                    main: "/blocks1.png",
                    gallery: [
                        "/blocks1.png",
                        "/blocks2.png",
                        "/blocks3.png",
                    ],
                },
            },
        ],
    },
    {
        id: 7,
        name: "Groceries & Pets",
        products: [
            {
                id: 120,
                name: "Organic Rice 5kg",
                price: 999,
                item_left: 100,
                rating: 4.3,
                totalRatings: 200,
                in_stock: true,
                description: "Premium quality organic rice, perfect for daily cooking and healthy meals.",
                images: {
                    main: "/rice1.png",
                    gallery: [
                        "/rice1.png",
                        "/rice2.png",
                        "/rice3.png",
                    ],
                },
            },
            {
                id: 121,
                name: "Pet Dog Food 10kg",
                price: 3999,
                item_left: 40,
                rating: 4.5,
                totalRatings: 150,
                in_stock: true,
                description: "Nutritious dog food packed with vitamins and minerals for your pet's health and energy.",
                images: {
                    main: "/dogfood1.png",
                    gallery: [
                        "/dogfood1.png",
                        "/dogfood2.png",
                        "/dogfood3.png",
                    ],
                },
            },
            {
                id: 122,
                name: "Olive Oil 1L",
                price: 1499,
                item_left: 70,
                rating: 4.7,
                totalRatings: 180,
                in_stock: true,
                description: "Extra virgin olive oil, ideal for cooking, salads, and healthy recipes.",
                images: {
                    main: "/oliveoil1.png",
                    gallery: [
                        "/oliveoil1.png",
                        "/oliveoil2.png",
                        "/oliveoil3.png",
                    ],
                },
            },
        ],
    },
    {
        id: 8,
        name: "Health & Beauty",
        products: [
            {
                id: 123,
                name: "Moisturizing Face Cream",
                price: 1999,
                item_left: 60,
                rating: 4.6,
                totalRatings: 140,
                in_stock: true,
                description: "A hydrating face cream with natural ingredients, suitable for all skin types.",
                images: {
                    main: "/facecream1.png",
                    gallery: [
                        "/facecream1.png",
                        "/facecream2.png",
                        "/facecream3.png",
                    ],
                },
            },
            {
                id: 124,
                name: "Hair Growth Shampoo",
                price: 1499,
                item_left: 50,
                rating: 4.4,
                totalRatings: 120,
                in_stock: true,
                description: "A nourishing shampoo designed to promote hair growth and reduce hair fall.",
                images: {
                    main: "/shampoo1.png",
                    gallery: [
                        "/shampoo1.png",
                        "/shampoo2.png",
                        "/shampoo3.png",
                    ],
                },
            },
            {
                id: 125,
                name: "Sunscreen SPF 50",
                price: 1299,
                item_left: 70,
                rating: 4.5,
                totalRatings: 160,
                in_stock: true,
                description: "A broad-spectrum SPF 50 sunscreen for daily protection against harmful UV rays.",
                images: {
                    main: "/sunscreen1.png",
                    gallery: [
                        "/sunscreen1.png",
                        "/sunscreen2.png",
                        "/sunscreen3.png",
                    ],
                },
            },
        ],
    },
    {
        id: 9,
        name: "Automotive & Tools",
        products: [
            {
                id: 126,
                name: "Cordless Power Drill",
                price: 7999,
                item_left: 30,
                rating: 4.6,
                totalRatings: 100,
                in_stock: true,
                description: "A powerful cordless drill with multiple speed settings, ideal for home and professional use.",
                images: {
                    main: "/drill1.png",
                    gallery: [
                        "/drill1.png",
                        "/drill2.png",
                        "/drill3.png",
                    ],
                },
            },
            {
                id: 127,
                name: "Car Vacuum Cleaner",
                price: 3499,
                item_left: 40,
                rating: 4.3,
                totalRatings: 85,
                in_stock: true,
                description: "A compact car vacuum cleaner with strong suction for quick and easy cleaning.",
                images: {
                    main: "/vacuum1.png",
                    gallery: [
                        "/vacuum1.png",
                        "/vacuum2.png",
                        "/vacuum3.png",
                    ],
                },
            },
            {
                id: 128,
                name: "Toolbox Set",
                price: 5999,
                item_left: 25,
                rating: 4.5,
                totalRatings: 90,
                in_stock: true,
                description: "A comprehensive toolbox set with essential tools for automotive and home repairs.",
                images: {
                    main: "/toolbox1.png",
                    gallery: [
                        "/toolbox1.png",
                        "/toolbox2.png",
                        "/toolbox3.png",
                    ],
                },
            },
        ],
    },
];

export { categoriesMockData };




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
        images: {
            main: "/controller3.png",
            gallery: [
                "/controller1.png",
                "/controller2.png",
                "/controller3.png",
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
        images: {
            main: "/keyboard1.png",
            gallery: [
                "/keyboard1.png",
                "/keyboard2.png",
                "/keyboard3.png",
            ],
        },
        name: "AK-900 Wired Keyboard",
        price: 2500,
        item_left: 10,
        rating: 4,
        totalRatings: 75,
        discount: 35,
        in_stock: true,
        description:
            "Ergonomic wired keyboard with mechanical switches for tactile feedback. Features customizable RGB lighting, durable keycaps, and a compact design for efficient typing and gaming.",
    },
    {
        id: 3,
        images: {
            main: "/monitor1.png",
            gallery: [
                "/monitor1.png",
                "/monitor2.png",
                "/monitor3.png",
            ],
        },
        name: "IPS LCD Gaming Monitor",
        price: 200000,
        item_left: 8,
        rating: 5,
        totalRatings: 150,
        discount: 30,
        in_stock: true,
        description:
            "27-inch IPS LCD gaming monitor with 144Hz refresh rate and 1ms response time. Offers vibrant colors, wide viewing angles, and adaptive sync for smooth gameplay.",
    },
    {
        id: 4,
        images: {
            main: "/chair1.png",
            gallery: [
                "/chair1.png",
                "/chair2.png",
                "/chair3.png",
            ],
        },
        name: "S-Series Comfort Chair",
        price: 400,
        item_left: 20,
        rating: 4.5,
        totalRatings: 99,
        discount: 25,
        in_stock: true,
        description:
            "Adjustable ergonomic chair with lumbar support and breathable mesh fabric. Designed for long-lasting comfort during work or gaming sessions, with reclining and height adjustment features.",
    },
    {
        id: 5,
        images: {
            main: "/laptop1.png",
            gallery: [
                "/laptop1.png",
                "/laptop2.png",
                "/laptop3.png",
            ],
        },
        name: "ASUS FHD Gaming Laptop",
        price: 96000,
        item_left: 5,
        rating: 5,
        totalRatings: 325,
        discount: 20,
        in_stock: true,
        description:
            "High-performance gaming laptop with a 15.6-inch FHD display, powerful NVIDIA graphics, and Intel Core processor. Includes fast SSD storage and advanced cooling for uninterrupted gaming.",
    },
    {
        id: 6,
        images: {
            main: "/jacket1.png",
            gallery: [
                "/jacket1.png",
                "/jacket2.png",
                "/jacket3.png",
            ],
        },
        name: "Quilted Satin Jacket",
        price: 750,
        item_left: 30,
        rating: 4.5,
        totalRatings: 55,
        discount: 15,
        in_stock: true,
        description:
            "Stylish quilted satin jacket with a lightweight design. Features a smooth, glossy finish, comfortable fit, and versatile style suitable for casual or semi-formal occasions.",
    },
    {
        id: 7,
        images: {
            main: "/controller3.png",
            gallery: [
                "/controller1.png",
                "/controller2.png",
                "/controller3.png",
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
        id: 8,
        images: {
            main: "/keyboard1.png",
            gallery: [
                "/keyboard1.png",
                "/keyboard2.png",
                "/keyboard3.png",
            ],
        },
        name: "AK-900 Wired Keyboard",
        price: 2500,
        item_left: 10,
        rating: 4,
        totalRatings: 75,
        discount: 35,
        in_stock: true,
        description:
            "Ergonomic wired keyboard with mechanical switches for tactile feedback. Features customizable RGB lighting, durable keycaps, and a compact design for efficient typing and gaming.",
    },
    {
        id: 9,
        images: {
            main: "/monitor1.png",
            gallery: [
                "/monitor1.png",
                "/monitor2.png",
                "/monitor3.png",
            ],
        },
        name: "IPS LCD Gaming Monitor",
        price: 30000,
        item_left: 8,
        rating: 5,
        totalRatings: 150,
        discount: 30,
        in_stock: true,
        description:
            "27-inch IPS LCD gaming monitor with 144Hz refresh rate and 1ms response time. Offers vibrant colors, wide viewing angles, and adaptive sync for smooth gameplay.",
    },
    {
        id: 10,
        images: {
            main: "/chair1.png",
            gallery: [
                "/chair1.png",
                "/chair2.png",
                "/chair3.png",
            ],
        },
        name: "S-Series Comfort Chair",
        price: 400,
        item_left: 20,
        rating: 4.5,
        totalRatings: 99,
        discount: 25,
        in_stock: true,
        description:
            "Adjustable ergonomic chair with lumbar support and breathable mesh fabric. Designed for long-lasting comfort during work or gaming sessions, with reclining and height adjustment features.",
    },
    {
        id: 11,
        images: {
            main: "/laptop1.png",
            gallery: [
                "/laptop1.png",
                "/laptop2.png",
                "/laptop3.png",
            ],
        },
        name: "ASUS FHD Gaming Laptop",
        price: 96000,
        item_left: 5,
        rating: 5,
        totalRatings: 325,
        discount: 20,
        in_stock: true,
        description:
            "High-performance gaming laptop with a 15.6-inch FHD display, powerful NVIDIA graphics, and Intel Core processor. Includes fast SSD storage and advanced cooling for uninterrupted gaming.",
    },
    {
        id: 12,
        images: {
            main: "/jacket1.png",
            gallery: [
                "/jacket1.png",
                "/jacket2.png",
                "/jacket3.png",
            ],
        },
        name: "Quilted Satin Jacket",
        price: 750,
        item_left: 30,
        rating: 4.5,
        totalRatings: 55,
        discount: 15,
        in_stock: true,
        description:
            "Stylish quilted satin jacket with a lightweight design. Features a smooth, glossy finish, comfortable fit, and versatile style suitable for casual or semi-formal occasions.",
    },
    {
        id: 13,
        images: {
            main: "/music-player.png",
            gallery: ["/music-player1.png", "/music-player2.png", "/music-player2.png"],
        },
        name: "Music Player",
        price: 2500,
        item_left: 20,
        rating: 4,
        totalRatings: 32,
        discount: 15,
        in_stock: true,
        description: "High-quality portable music player with long battery life.",
    },
];
export { productMockData };


export const reviewsMockData = [
  {
    productId: 1,
    averageRating: 4.3,
    totalReviews: 128,
    ratingDistribution: { 5: 80, 4: 30, 3: 10, 2: 5, 1: 3 },
    reviews: [
      {
        id: 1,
        userName: "John Doe",
        rating: 5,
        comment: "Excellent product! Great quality and fast delivery.",
        date: "2025-09-15",
        orderStatus: "delivered",
        reviewImages: ["/controller1.png"],
      },
      {
        id: 2,
        userName: "Alice Smith",
        rating: 4,
        comment: "Good product, but packaging could be better.",
        date: "2025-09-10",
        orderStatus: "delivered",
        reviewImages: [],
      }
    ]
  }
]


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
        pid: 13,
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

