// Mock data — authentic Ethiopian menu for TesfaBunna
// dietary: 'veg' = vegetarian, 'vegan' = vegan, 'gf' = gluten-free, 'spicy' = spicy, 'nuts' = contains nuts

export const menuItems = [
  // ── Appetizers ────────────────────────────────────────────────
  { id: 1,  category: 'appetizers', popular: true,  dietary: ['spicy'],          name: 'Sambusa',                      price: 120, calories: 280, description: 'Crispy fried pastry pockets filled with spiced minced beef or lentils, served with green chili sauce.',         image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80' },
  { id: 2,  category: 'appetizers', popular: false, dietary: ['veg'],            name: 'Kategna',                      price: 90,  calories: 210, description: 'Toasted injera brushed with spiced niter kibbeh and berbere, cut into strips.',                                   image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80' },
  { id: 3,  category: 'appetizers', popular: false, dietary: ['veg','vegan','gf','spicy'], name: 'Timatim Fitfit',    price: 85,  calories: 110, description: 'Diced tomatoes, onion, jalapeño and herbs tossed with crumbled injera and olive oil.',                            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80' },
  // ── Breakfast ─────────────────────────────────────────────────
  { id: 4,  category: 'breakfast',  popular: true,  dietary: ['veg','spicy'],    name: 'Injera Firfir',                price: 130, calories: 420, description: 'Torn injera sautéed with niter kibbeh and berbere spice. A beloved morning staple.',                              image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80' },
  { id: 5,  category: 'breakfast',  popular: true,  dietary: [],                 name: 'Full Ethiopian Breakfast',     price: 280, calories: 720, description: 'Injera firfir, scrambled eggs with green pepper, ayib (cottage cheese) and fresh juice.',                        image: '/75362536_104202174373763_3801534570835214336_n.jpg' },
  { id: 6,  category: 'breakfast',  popular: false, dietary: ['veg'],            name: 'Genfo (Porridge)',             price: 100, calories: 380, description: 'Thick barley porridge served with niter kibbeh and berbere in the center.',                                        image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=500&q=80' },
  // ── Lunch ─────────────────────────────────────────────────────
  { id: 7,  category: 'lunch',      popular: true,  dietary: ['spicy','gf'],     name: 'Doro Wat',                     price: 350, calories: 580, description: "Ethiopia's national dish — chicken drumsticks slow-cooked in rich berbere and spiced butter with a boiled egg on injera.", image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80' },
  { id: 8,  category: 'lunch',      popular: true,  dietary: ['veg','vegan','gf','spicy'], name: 'Beyaynetu',           price: 300, calories: 490, description: 'A colorful platter of assorted vegetarian stews on injera: shiro, misir, gomen, tikil gomen, fosolia and more.', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80' },
  { id: 9,  category: 'lunch',      popular: false, dietary: ['veg','vegan','gf','spicy'], name: 'Shiro Wat',          price: 180, calories: 340, description: 'Slow-simmered chickpea flour stew seasoned with berbere and niter kibbeh. Smooth, hearty and comforting.',       image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80' },
  { id: 10, category: 'lunch',      popular: false, dietary: ['veg','vegan','gf','spicy'], name: 'Misir Wat',          price: 190, calories: 370, description: 'Split red lentils simmered long and slow in a rich berbere sauce with garlic and ginger.',                        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&q=80' },
  // ── Dinner ────────────────────────────────────────────────────
  { id: 11, category: 'dinner',     popular: true,  dietary: ['gf'],             name: 'Kitfo',                        price: 480, calories: 650, description: 'Premium lean beef minced and seasoned with mitmita and niter kibbeh. Served leb-leb with ayib and gomen.',        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80' },
  { id: 12, category: 'dinner',     popular: true,  dietary: ['spicy','gf'],     name: 'Tibs (Mixed)',                 price: 420, calories: 560, description: 'Tender beef and lamb cubes sautéed with onion, tomato, rosemary and jalapeño in spiced butter.',                  image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&q=80' },
  { id: 13, category: 'dinner',     popular: false, dietary: ['gf'],             name: 'Gored Gored',                  price: 460, calories: 610, description: 'Cubed raw beef marinated in awaze and niter kibbeh. A bold dish for the adventurous.',                            image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=500&q=80' },
  { id: 14, category: 'dinner',     popular: false, dietary: ['gf'],             name: 'Alicha Wat (Lamb)',            price: 390, calories: 520, description: 'Mild turmeric-based lamb stew with onion, garlic, ginger and green peppers — gentle and fragrant.',               image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&q=80' },
  // ── Burgers ───────────────────────────────────────────────────
  { id: 15, category: 'burgers',    popular: true,  dietary: ['spicy'],          name: 'TesfaBunna Signature Burger',  price: 290, calories: 760, description: 'Double beef patty seasoned with mitmita, caramelized onion, berbere aioli, lettuce and tomato in a toasted brioche bun.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80' },
  { id: 16, category: 'burgers',    popular: false, dietary: [],                 name: 'Crispy Chicken Burger',        price: 260, calories: 680, description: 'Fried chicken breast with coleslaw, pickles and honey mustard sauce.',                                              image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80' },
  // ── Pizza ─────────────────────────────────────────────────────
  { id: 17, category: 'pizza',      popular: true,  dietary: ['spicy'],          name: 'Tibs Pizza',                   price: 340, calories: 850, description: 'Thin crust topped with berbere-spiced tibs beef, red onion, jalapeño and mozzarella.',                             image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80' },
  { id: 18, category: 'pizza',      popular: false, dietary: ['veg'],            name: 'Classic Margherita',           price: 260, calories: 720, description: 'San Marzano tomato, fresh mozzarella, basil and extra virgin olive oil.',                                          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80' },
  // ── Pasta ─────────────────────────────────────────────────────
  { id: 19, category: 'pasta',      popular: false, dietary: ['veg','spicy'],    name: 'Spicy Berbere Pasta',          price: 230, calories: 590, description: 'Penne tossed in a rich tomato berbere sauce with garlic, olive oil and parmesan.',                                 image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&q=80' },
  // ── Desserts ──────────────────────────────────────────────────
  { id: 20, category: 'desserts',   popular: true,  dietary: ['veg'],            name: 'Honey Cake',                   price: 130, calories: 390, description: 'Moist sponge cake glazed with Ethiopian honey and served with a cardamom cream.',                                   image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80' },
  { id: 21, category: 'desserts',   popular: true,  dietary: ['veg'],            name: 'Chocolate Lava Cake',          price: 190, calories: 520, description: 'Warm dark chocolate fondant with a flowing center, served with vanilla ice cream.',                                 image: '/76901734_103972781063369_6198513861197299712_n.jpg' },
  // ── Vegetarian ────────────────────────────────────────────────
  { id: 22, category: 'vegetarian', popular: true,  dietary: ['veg','vegan','gf'], name: 'Beyaynetu Full Veggie',      price: 300, calories: 490, description: 'Grand fasting platter: shiro, misir, gomen, tikil gomen, azifa, fosolia and tomato salad on injera.',              image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80' },
  { id: 23, category: 'vegetarian', popular: false, dietary: ['veg','vegan','gf'], name: "Ye'abesha Gomen",            price: 160, calories: 220, description: 'Ethiopian collard greens slowly braised with garlic, ginger, onion and niter kibbeh.',                               image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80' },
  { id: 24, category: 'vegetarian', popular: false, dietary: ['veg','vegan','gf'], name: 'Tikil Gomen',                price: 150, calories: 200, description: 'Spiced cabbage and carrot stew — mild, fragrant, and satisfying.',                                                   image: 'https://images.unsplash.com/photo-1555243896-c709bfa0b564?w=500&q=80' },
  { id: 25, category: 'vegetarian', popular: false, dietary: ['veg','vegan','gf'], name: 'Azifa',                      price: 140, calories: 240, description: 'Cold green lentils tossed with mustard, jalapeño, lemon and herbs.',                                                 image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&q=80' },
  // ── Kids ──────────────────────────────────────────────────────
  { id: 26, category: 'kids',       popular: false, dietary: [],                 name: 'Mini Burger & Fries',          price: 160, calories: 480, description: 'Small beef burger with sweet potato fries and ketchup.',                                                           image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80' },
  { id: 27, category: 'kids',       popular: false, dietary: ['veg'],            name: 'Macaroni Tomato Sauce',        price: 120, calories: 380, description: 'Soft macaroni in a mild homemade tomato sauce with a sprinkle of cheese.',                                          image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&q=80' },
]

// signature: true = house-original cocktail
export const drinkItems = [
  // Cocktails
  { id: 1,  category: 'cocktails', signature: true,  name: 'Tej Sunrise',            price: 220, description: 'Ethiopian honey wine, orange juice and grenadine. Sweet and golden.',                          image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80' },
  { id: 2,  category: 'cocktails', signature: true,  name: 'Addis Mule',             price: 240, description: 'Vodka, ginger beer, fresh lime and Ethiopian berbere rim.',                                    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&q=80' },
  { id: 3,  category: 'cocktails', signature: true,  name: 'Blue Nile',              price: 230, description: 'Gin, blue curaçao, tonic water, mint leaves and a lime twist.',                               image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500&q=80' },
  { id: 4,  category: 'cocktails', signature: false, name: 'Awash Spritz',           price: 210, description: 'Awash white wine, elderflower, soda and fresh berries.',                                       image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=500&q=80' },
  // Mocktails
  { id: 5,  category: 'mocktails', signature: false, name: 'Mango Tej Fizz',         price: 150, description: 'Fresh mango, ginger, honey, lime juice and sparkling water.',                                  image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80' },
  { id: 6,  category: 'mocktails', signature: false, name: 'Passion Cooler',         price: 140, description: 'Passion fruit, pineapple, coconut cream and crushed ice.',                                     image: 'https://images.unsplash.com/photo-1473396413399-6717ef7c4093?w=500&q=80' },
  // Beer
  { id: 7,  category: 'beer',      signature: false, name: 'St. George Draft',       price: 120, description: "Ethiopia's flagship lager — crisp, refreshing and locally brewed.",                            image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500&q=80' },
  { id: 8,  category: 'beer',      signature: false, name: 'Dashen Bottle',          price: 110, description: 'Smooth Ethiopian amber lager from the highlands.',                                              image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=500&q=80' },
  { id: 9,  category: 'beer',      signature: false, name: 'Habesha Beer',           price: 115, description: 'Light, clean lager with a distinctive Ethiopian barley taste.',                                 image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&q=80' },
  // Wine
  { id: 10, category: 'wine',      signature: false, name: 'Awash Red Wine',         price: 180, description: 'Full-bodied Ethiopian red — notes of dark fruit and warm spice.',                              image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&q=80' },
  { id: 11, category: 'wine',      signature: false, name: 'Awash White Wine',       price: 175, description: 'Light and dry Ethiopian white with floral aromas.',                                             image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=500&q=80' },
  // Whiskey
  { id: 12, category: 'whiskey',   signature: false, name: 'Johnnie Walker Black',   price: 280, description: '12-year aged blended Scotch whisky, smooth with a smoky finish.',                              image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=500&q=80' },
  { id: 13, category: 'whiskey',   signature: false, name: "Jack Daniel's",          price: 260, description: 'Tennessee whiskey with a mellow, caramel character.',                                          image: 'https://images.unsplash.com/photo-1568644396922-5c3bfae12521?w=500&q=80' },
  // Vodka
  { id: 14, category: 'vodka',     signature: false, name: 'Grey Goose',             price: 290, description: 'French premium vodka, clean and smooth.',                                                       image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=80' },
  // Gin
  { id: 15, category: 'gin',       signature: false, name: "Hendrick's Gin",         price: 300, description: 'Scottish gin infused with cucumber and rose petals.',                                           image: 'https://images.unsplash.com/photo-1606143745113-21d4d1c5e7e3?w=500&q=80' },
  // Tequila
  { id: 16, category: 'tequila',   signature: false, name: 'Don Julio Blanco',       price: 310, description: 'Premium silver tequila — bright agave and citrus notes.',                                       image: 'https://images.unsplash.com/photo-1601887573500-0edce1f665c5?w=500&q=80' },
  // Rum
  { id: 17, category: 'rum',       signature: false, name: 'Havana Club 7',          price: 250, description: 'Aged Cuban rum — rich, complex and perfectly balanced.',                                        image: 'https://images.unsplash.com/photo-1598963869854-5c5d9f7de3ab?w=500&q=80' },
  // Soft
  { id: 18, category: 'soft',      signature: false, name: 'Soft Drinks',            price: 60,  description: 'Coca-Cola, Fanta, Sprite, Tonic Water, Ambo sparkling water.',                                 image: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?w=500&q=80' },
  // Coffee
  { id: 19, category: 'coffee',    signature: true,  name: 'Jebena Coffee Ceremony', price: 200, description: 'Traditional 3-round Ethiopian coffee service in a clay jebena, with popcorn and incense.',     image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80' },
  { id: 20, category: 'coffee',    signature: false, name: 'Ethiopian Macchiato',    price: 65,  description: 'Addis-style espresso with a touch of steamed milk — rich and intense.',                         image: 'https://images.unsplash.com/photo-1485808191679-5f86510df71f?w=500&q=80' },
  { id: 21, category: 'coffee',    signature: false, name: 'Buna (Black Coffee)',    price: 55,  description: 'Freshly roasted Yirgacheffe beans brewed strong and served with sugar.',                        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80' },
  // Juice
  { id: 22, category: 'juice',     signature: true,  name: 'Layered Juice (Special)', price: 130, description: 'The famous Addis layered juice — avocado, mango, papaya and guava stacked in a glass.',     image: 'https://images.unsplash.com/photo-1473158912295-9ed202edb993?w=500&q=80' },
  { id: 23, category: 'juice',     signature: false, name: 'Fresh Orange Juice',     price: 90,  description: 'Hand-squeezed Valencia oranges, served immediately.',                                           image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&q=80' },
  { id: 24, category: 'juice',     signature: false, name: 'Avocado Juice',          price: 110, description: 'Blended fresh avocado with milk and a drizzle of honey.',                                       image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80' },
]

export const testimonials = [
  { id: 1, name: 'Selam T.',    rating: 5, review: "Absolutely amazing! The Kitfo was perfectly prepared and the Beyaynetu platter was the best I've had in Dessie. Warm, authentic atmosphere.",          avatar: 'https://i.pravatar.cc/80?img=1',  date: 'June 2025' },
  { id: 2, name: 'Michael J.',  rating: 5, review: 'Best Ethiopian restaurant I\'ve visited. The Doro Wat was outstanding — that egg soaked in berbere sauce is unreal. Will return every visit!',         avatar: 'https://i.pravatar.cc/80?img=3',  date: 'May 2025' },
  { id: 3, name: 'Tigist H.',   rating: 5, review: 'TesfaBunna is our family\'s go-to spot. The coffee ceremony on weekends is beautiful. The live music makes the evening special every time.',            avatar: 'https://i.pravatar.cc/80?img=5',  date: 'May 2025' },
  { id: 4, name: 'Ahmed H.',    rating: 4, review: 'Great ambiance, very attentive staff. The Tibs was tender and the Tej Sunrise cocktail is creative and delicious. Loved every bite.',                   avatar: 'https://i.pravatar.cc/80?img=8',  date: 'April 2025' },
  { id: 5, name: 'Sara W.',     rating: 5, review: 'The injera is the best I\'ve had — sour, spongy, perfect. The Shiro Wat and Misir together are a dream. Staff made us feel like family.',              avatar: 'https://i.pravatar.cc/80?img=9',  date: 'April 2025' },
  { id: 6, name: 'Yonas B.',    rating: 5, review: 'The Jebena coffee ceremony alone is worth the trip. Watching them roast the beans at the table is an experience you\'ll never forget.',                avatar: 'https://i.pravatar.cc/80?img=12', date: 'March 2025' },
]

export const blogPosts = [
  { id: 1, title: 'New Summer Menu: Ethiopian Fusion',     excerpt: "We're excited to launch our summer menu — traditional favorites reimagined with seasonal local ingredients and bold new flavors.", date: '2025-06-15', category: 'Menu Update',   image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', author: 'Chef Abebe' },
  { id: 2, title: "The Art of Kitfo: Chef Abebe's Story",  excerpt: 'Our head chef shares the story behind perfecting kitfo — sourcing premium beef, the right mitmita blend, and why leb-leb matters.', date: '2025-06-01', category: "Chef's Corner", image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', author: 'Chef Abebe' },
  { id: 3, title: 'Ethiopian Wine Tasting Night',          excerpt: "We explored Awash Winery's full range alongside traditional Ethiopian dishes. Here's what paired best.",                             date: '2025-05-20', category: 'Events',        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', author: 'TesfaBunna Team' },
  { id: 4, title: 'Celebrate Enkutatash With Us',          excerpt: 'Ethiopian New Year is our favorite celebration. Join us for traditional dishes, teff honey cake, live music and a night to remember.', date: '2025-05-05', category: 'Events',      image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&q=80', author: 'TesfaBunna Team' },
]

export const galleryImages = [
  { id: 1,  category: 'interior', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', alt: 'Restaurant main dining area' },
  { id: 2,  category: 'interior', src: '/75412176_112139616913352_2384751527060307968_n.jpg',                     alt: 'Cozy private dining section' },
  { id: 3,  category: 'outdoor',  src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',    alt: 'Outdoor terrace seating' },
  { id: 4,  category: 'food',     src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', alt: 'Traditional Ethiopian spread' },
  { id: 5,  category: 'food',     src: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80', alt: 'Doro Wat plating' },
  { id: 6,  category: 'food',     src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',    alt: 'Beyaynetu fasting platter' },
  { id: 7,  category: 'drinks',   src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80', alt: 'Signature cocktails' },
  { id: 8,  category: 'bar',      src: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80', alt: 'Our full bar' },
  { id: 9,  category: 'music',    src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80', alt: 'Live music night' },
  { id: 10, category: 'staff',    src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&q=80', alt: 'Our team' },
  { id: 11, category: 'interior', src: 'https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=600&q=80', alt: 'Bar seating area' },
  { id: 12, category: 'outdoor',  src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', alt: 'Garden dining' },
]

export const faqItems = [
  { q: 'Do you accept reservations?',                   a: 'Yes! Reserve through our website, by phone, or via WhatsApp. We highly recommend booking ahead for weekends and holidays.' },
  { q: 'Do you have parking?',                          a: 'Yes, we have a private parking lot accommodating up to 40 vehicles — free for all guests.' },
  { q: 'Do you offer delivery?',                        a: 'Yes, we deliver across Dessie through our website and major delivery apps. Delivery hours: 11AM – 10PM daily.' },
  { q: 'Are pets allowed?',                             a: 'Pets are welcome on our outdoor terrace. Please keep them leashed and inform our staff on arrival.' },
  { q: 'Do you have vegetarian and vegan options?',     a: 'Absolutely. Ethiopian cuisine is naturally rich in fasting (vegan) options. Our Beyaynetu platter and full fasting menu are available every day.' },
  { q: 'Is there live music every weekend?',            a: 'Yes! Live traditional and contemporary Ethiopian music every Friday and Saturday from 8PM. Occasional weeknight shows too — follow us on Instagram for updates.' },
  { q: 'Do you accommodate large groups or private events?', a: 'Yes, we have a private dining room for up to 40 guests and full catering services. Contact us for a quote.' },
  { q: 'Is there a dress code?',                        a: 'Smart casual is recommended. We want you to feel comfortable and look the part for a great night out.' },
  { q: 'Is the restaurant wheelchair accessible?',      a: 'Yes — ramp access, accessible restrooms and designated seating are all available.' },
]

export const teamMembers = [
  { id: 1, name: 'Abebe Girma',   role: 'Head Chef',           bio: '15 years of mastering Ethiopian cuisine — from traditional injera fermentation to modern plating. Chef Abebe is the heart of our kitchen.',  image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&q=80' },
  { id: 2, name: 'Meron Tadesse', role: 'Bar Manager',         bio: 'Meron crafts cocktails that tell Ethiopian stories — infusing tej, berbere and local botanicals into every glass.',                           image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80' },
  { id: 3, name: 'Daniel Bekele', role: 'Restaurant Manager',  bio: '10 years in hospitality. Daniel leads with warmth and precision, ensuring every guest leaves with a smile.',                                    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
  { id: 4, name: 'Hiwot Alemu',   role: 'Sous Chef',           bio: 'Hiwot specializes in traditional stews and fasting cuisine. She has represented TesfaBunna at multiple culinary festivals.',                  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80' },
]
