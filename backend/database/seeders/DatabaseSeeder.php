<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\MenuItem;
use App\Models\Drink;
use App\Models\Testimonial;
use App\Models\BlogPost;
use App\Models\GalleryImage;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Truncate tables that have no natural unique key (safe to re-seed) ──
        MenuItem::truncate();
        Drink::truncate();
        Testimonial::truncate();
        GalleryImage::truncate();

        // ── Admin User ────────────────────────────────────────────
        User::updateOrCreate(
            ['email' => 'admin@tesfabunna.com'],
            [
                'name'     => 'TesfaBunna Admin',
                'password' => Hash::make('Admin@12345'),
                'role'     => 'admin',
            ]
        );
        // ── Menu Items ────────────────────────────────────────────
        $menuItems = [
            // Appetizers
            ['category' => 'appetizers', 'name' => 'Sambusa',               'popular' => true,  'price' => 120, 'calories' => 280, 'description' => 'Crispy fried pastry pockets filled with spiced minced beef or lentils, served with green chili sauce.',              'image' => 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80'],
            ['category' => 'appetizers', 'name' => 'Kategna',                'popular' => false, 'price' => 90,  'calories' => 210, 'description' => 'Toasted injera brushed with spiced niter kibbeh and berbere, cut into strips.',                                      'image' => 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80'],
            ['category' => 'appetizers', 'name' => 'Timatim Fitfit',         'popular' => false, 'price' => 85,  'calories' => 110, 'description' => 'Diced tomatoes, onion, jalapeño and herbs tossed with crumbled injera and olive oil.',                              'image' => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80'],
            // Breakfast
            ['category' => 'breakfast',  'name' => 'Injera Firfir',          'popular' => true,  'price' => 130, 'calories' => 420, 'description' => 'Torn injera sautéed with niter kibbeh and berbere spice. A beloved morning staple.',                                  'image' => 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80'],
            ['category' => 'breakfast',  'name' => 'Full Ethiopian Breakfast','popular' => true,  'price' => 280, 'calories' => 720, 'description' => 'Injera firfir, scrambled eggs with green pepper, ayib (cottage cheese) and fresh juice.',                            'image' => 'https://images.unsplash.com/photo-1533089860892-a9b969df67a3?w=500&q=80'],
            ['category' => 'breakfast',  'name' => 'Genfo',                   'popular' => false, 'price' => 100, 'calories' => 380, 'description' => 'Thick barley porridge served with niter kibbeh and berbere in the center.',                                           'image' => 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=500&q=80'],
            // Lunch
            ['category' => 'lunch',      'name' => 'Doro Wat',               'popular' => true,  'price' => 350, 'calories' => 580, 'description' => "Ethiopia's national dish — chicken drumsticks slow-cooked in rich berbere and spiced butter, served with a boiled egg on injera.", 'image' => 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80'],
            ['category' => 'lunch',      'name' => 'Beyaynetu',              'popular' => true,  'price' => 300, 'calories' => 490, 'description' => 'Colorful platter of assorted vegetarian stews on injera: shiro, misir, gomen, tikil gomen, fosolia and more.',           'image' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80'],
            ['category' => 'lunch',      'name' => 'Shiro Wat',              'popular' => false, 'price' => 180, 'calories' => 340, 'description' => 'Slow-simmered chickpea flour stew seasoned with berbere and niter kibbeh. Smooth, hearty and comforting.',              'image' => 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80'],
            ['category' => 'lunch',      'name' => 'Misir Wat',              'popular' => false, 'price' => 190, 'calories' => 370, 'description' => 'Split red lentils simmered long and slow in a rich berbere sauce with garlic and ginger.',                              'image' => 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&q=80'],
            // Dinner
            ['category' => 'dinner',     'name' => 'Kitfo',                  'popular' => true,  'price' => 480, 'calories' => 650, 'description' => 'Premium lean beef minced and seasoned with mitmita and niter kibbeh. Served leb-leb with ayib and gomen.',               'image' => 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80'],
            ['category' => 'dinner',     'name' => 'Tibs Mixed',             'popular' => true,  'price' => 420, 'calories' => 560, 'description' => 'Tender beef and lamb cubes sautéed with onion, tomato, rosemary and jalapeño in spiced butter.',                       'image' => 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&q=80'],
            ['category' => 'dinner',     'name' => 'Alicha Wat',             'popular' => false, 'price' => 390, 'calories' => 520, 'description' => 'Mild turmeric-based lamb stew with onion, garlic, ginger and green peppers — gentle and fragrant.',                     'image' => 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&q=80'],
            // Burgers
            ['category' => 'burgers',    'name' => 'TesfaBunna Signature Burger', 'popular' => true, 'price' => 290, 'calories' => 760, 'description' => 'Double beef patty seasoned with mitmita, caramelized onion, berbere aioli in a toasted brioche bun.',              'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80'],
            ['category' => 'burgers',    'name' => 'Crispy Chicken Burger',  'popular' => false, 'price' => 260, 'calories' => 680, 'description' => 'Fried chicken breast with coleslaw, pickles and honey mustard sauce.',                                                  'image' => 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80'],
            // Pizza
            ['category' => 'pizza',      'name' => 'Tibs Pizza',             'popular' => true,  'price' => 340, 'calories' => 850, 'description' => 'Thin crust topped with berbere-spiced tibs beef, red onion, jalapeño and mozzarella.',                                  'image' => 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80'],
            ['category' => 'pizza',      'name' => 'Classic Margherita',     'popular' => false, 'price' => 260, 'calories' => 720, 'description' => 'San Marzano tomato, fresh mozzarella, basil and extra virgin olive oil.',                                               'image' => 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80'],
            // Pasta
            ['category' => 'pasta',      'name' => 'Spicy Berbere Pasta',    'popular' => false, 'price' => 230, 'calories' => 590, 'description' => 'Penne tossed in a rich tomato berbere sauce with garlic, olive oil and parmesan.',                                      'image' => 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&q=80'],
            // Desserts
            ['category' => 'desserts',   'name' => 'Honey Cake',             'popular' => true,  'price' => 130, 'calories' => 390, 'description' => 'Moist sponge cake glazed with Ethiopian honey and served with a cardamom cream.',                                        'image' => 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80'],
            ['category' => 'desserts',   'name' => 'Chocolate Lava Cake',    'popular' => true,  'price' => 190, 'calories' => 520, 'description' => 'Warm dark chocolate fondant with a flowing center, served with vanilla ice cream.',                                      'image' => 'https://images.unsplash.com/photo-1606313564200-e75d8a5de2f1?w=500&q=80'],
            // Vegetarian
            ['category' => 'vegetarian', 'name' => 'Beyaynetu Full Veggie',  'popular' => true,  'price' => 300, 'calories' => 490, 'description' => 'Grand fasting platter: shiro, misir, gomen, tikil gomen, azifa, fosolia and tomato salad on injera.',                   'image' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80'],
            ['category' => 'vegetarian', "name" => "Ye'abesha Gomen",        'popular' => false, 'price' => 160, 'calories' => 220, 'description' => 'Ethiopian collard greens slowly braised with garlic, ginger, onion and niter kibbeh.',                                   'image' => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80'],
            ['category' => 'vegetarian', 'name' => 'Tikil Gomen',            'popular' => false, 'price' => 150, 'calories' => 200, 'description' => 'Spiced cabbage and carrot stew — mild, fragrant, and satisfying.',                                                      'image' => 'https://images.unsplash.com/photo-1555243896-c709bfa0b564?w=500&q=80'],
            // Kids
            ['category' => 'kids',       'name' => 'Mini Burger & Fries',    'popular' => false, 'price' => 160, 'calories' => 480, 'description' => 'Small beef burger with sweet potato fries and ketchup.',                                                                'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80'],
            ['category' => 'kids',       'name' => 'Macaroni Tomato Sauce',  'popular' => false, 'price' => 120, 'calories' => 380, 'description' => 'Soft macaroni in a mild homemade tomato sauce with a sprinkle of cheese.',                                             'image' => 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&q=80'],
        ];

        foreach ($menuItems as $i => $item) {
            MenuItem::create(array_merge($item, ['sort_order' => $i, 'available' => true]));
        }

        // ── Drinks ───────────────────────────────────────────────
        $drinks = [
            ['category' => 'cocktails', 'name' => 'Tej Sunrise',            'price' => 220, 'description' => 'Ethiopian honey wine (tej), orange juice and grenadine. Sweet and golden.',                          'image' => 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80'],
            ['category' => 'cocktails', 'name' => 'Addis Mule',             'price' => 240, 'description' => 'Vodka, ginger beer, fresh lime and Ethiopian berbere rim.',                                           'image' => 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&q=80'],
            ['category' => 'cocktails', 'name' => 'Blue Nile',              'price' => 230, 'description' => 'Gin, blue curaçao, tonic water, mint leaves and a lime twist.',                                       'image' => 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500&q=80'],
            ['category' => 'mocktails', 'name' => 'Mango Tej Fizz',         'price' => 150, 'description' => 'Fresh mango, ginger, honey, lime juice and sparkling water.',                                         'image' => 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80'],
            ['category' => 'mocktails', 'name' => 'Passion Cooler',         'price' => 140, 'description' => 'Passion fruit, pineapple, coconut cream and crushed ice.',                                            'image' => 'https://images.unsplash.com/photo-1473396413399-6717ef7c4093?w=500&q=80'],
            ['category' => 'beer',      'name' => 'St. George Draft',       'price' => 120, 'description' => "Ethiopia's flagship lager — crisp, refreshing and locally brewed.",                                   'image' => 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500&q=80'],
            ['category' => 'beer',      'name' => 'Dashen Bottle',          'price' => 110, 'description' => 'Smooth Ethiopian amber lager from the highlands.',                                                     'image' => 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=500&q=80'],
            ['category' => 'beer',      'name' => 'Habesha Beer',           'price' => 115, 'description' => 'Light, clean lager with a distinctive Ethiopian barley taste.',                                        'image' => 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&q=80'],
            ['category' => 'wine',      'name' => 'Awash Red Wine',         'price' => 180, 'description' => 'Full-bodied Ethiopian red — notes of dark fruit and warm spice.',                                     'image' => 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&q=80'],
            ['category' => 'wine',      'name' => 'Awash White Wine',       'price' => 175, 'description' => 'Light and dry Ethiopian white with floral aromas.',                                                    'image' => 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=500&q=80'],
            ['category' => 'whiskey',   'name' => 'Johnnie Walker Black',   'price' => 280, 'description' => '12-year aged blended Scotch whisky, smooth with a smoky finish.',                                     'image' => 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=500&q=80'],
            ['category' => 'vodka',     'name' => 'Grey Goose',             'price' => 290, 'description' => 'French premium vodka, clean and smooth.',                                                             'image' => 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=80'],
            ['category' => 'gin',       'name' => "Hendrick's Gin",         'price' => 300, 'description' => 'Scottish gin infused with cucumber and rose petals.',                                                  'image' => 'https://images.unsplash.com/photo-1606143745113-21d4d1c5e7e3?w=500&q=80'],
            ['category' => 'tequila',   'name' => 'Don Julio Blanco',       'price' => 310, 'description' => 'Premium silver tequila — bright agave and citrus notes.',                                             'image' => 'https://images.unsplash.com/photo-1601887573500-0edce1f665c5?w=500&q=80'],
            ['category' => 'rum',       'name' => 'Havana Club 7',          'price' => 250, 'description' => 'Aged Cuban rum — rich, complex and perfectly balanced.',                                              'image' => 'https://images.unsplash.com/photo-1598963869854-5c5d9f7de3ab?w=500&q=80'],
            ['category' => 'soft',      'name' => 'Soft Drinks',            'price' => 60,  'description' => 'Coca-Cola, Fanta, Sprite, Tonic Water, Ambo sparkling water.',                                        'image' => 'https://images.unsplash.com/photo-1543253687-c931c8e01820?w=500&q=80'],
            ['category' => 'coffee',    'name' => 'Jebena Coffee Ceremony', 'price' => 200, 'description' => 'Traditional 3-round Ethiopian coffee service — roasted, ground and brewed in a clay jebena with popcorn.', 'image' => 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80'],
            ['category' => 'coffee',    'name' => 'Ethiopian Macchiato',    'price' => 65,  'description' => 'Addis-style espresso with a touch of steamed milk — rich and intense.',                               'image' => 'https://images.unsplash.com/photo-1485808191679-5f86510df71f?w=500&q=80'],
            ['category' => 'coffee',    'name' => 'Buna (Black Coffee)',    'price' => 55,  'description' => 'Freshly roasted Yirgacheffe beans brewed strong and served with sugar.',                              'image' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80'],
            ['category' => 'juice',     'name' => 'Layered Juice Special',  'price' => 130, 'description' => 'The famous Addis layered juice — avocado, mango, papaya and guava stacked in a glass.',              'image' => 'https://images.unsplash.com/photo-1473158912295-9ed202edb993?w=500&q=80'],
            ['category' => 'juice',     'name' => 'Fresh Orange Juice',     'price' => 90,  'description' => 'Hand-squeezed Valencia oranges, served immediately.',                                                  'image' => 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&q=80'],
            ['category' => 'juice',     'name' => 'Avocado Juice',          'price' => 110, 'description' => 'Blended fresh avocado with milk and a drizzle of honey.',                                             'image' => 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80'],
        ];

        foreach ($drinks as $i => $drink) {
            Drink::create(array_merge($drink, ['sort_order' => $i, 'available' => true]));
        }

        // ── Testimonials ─────────────────────────────────────────
        $testimonials = [
            ['name' => 'Selam Tadesse',  'rating' => 5, 'approved' => true, 'avatar' => 'https://i.pravatar.cc/80?img=1',  'review' => 'Absolutely amazing! The Kitfo was perfectly prepared and the Beyaynetu platter was the best I\'ve had in Addis. Warm, authentic atmosphere.'],
            ['name' => 'Michael Johnson','rating' => 5, 'approved' => true, 'avatar' => 'https://i.pravatar.cc/80?img=3',  'review' => 'Best Ethiopian restaurant I\'ve visited. The Doro Wat was outstanding — that egg soaked in berbere sauce is unreal!'],
            ['name' => 'Tigist Haile',   'rating' => 5, 'approved' => true, 'avatar' => 'https://i.pravatar.cc/80?img=5',  'review' => 'TesfaBunna is our family\'s go-to spot. The coffee ceremony on weekends is a beautiful experience.'],
            ['name' => 'Ahmed Hassan',   'rating' => 4, 'approved' => true, 'avatar' => 'https://i.pravatar.cc/80?img=8',  'review' => 'Great ambiance, very attentive staff. The Tibs was tender and the Tej Sunrise cocktail was delicious.'],
            ['name' => 'Sara Williams',  'rating' => 5, 'approved' => true, 'avatar' => 'https://i.pravatar.cc/80?img=9',  'review' => 'The injera is the best I\'ve had. The Shiro Wat and Misir together are a dream. Staff made us feel like family.'],
            ['name' => 'Yonas Bekele',   'rating' => 5, 'approved' => true, 'avatar' => 'https://i.pravatar.cc/80?img=12', 'review' => 'The Jebena coffee ceremony alone is worth the trip. Watching them roast the beans at the table is unforgettable.'],
        ];

        foreach ($testimonials as $t) {
            Testimonial::create($t);
        }

        // ── Blog Posts ───────────────────────────────────────────
        $posts = [
            ['title' => 'New Summer Menu: Ethiopian Fusion',        'slug' => 'new-summer-menu',           'category' => 'Menu Update',    'author' => 'Chef Abebe',        'published' => true, 'published_at' => '2025-06-15', 'image' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', 'excerpt' => "We're excited to launch our summer menu — traditional favorites reimagined with seasonal local ingredients and bold new flavors."],
            ['title' => "The Art of Kitfo: Chef Abebe's Story",     'slug' => 'art-of-kitfo',              'category' => "Chef's Corner",  'author' => 'Chef Abebe',        'published' => true, 'published_at' => '2025-06-01', 'image' => 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', 'excerpt' => 'Our head chef shares the story behind perfecting kitfo — sourcing premium beef, the right mitmita blend, and why leb-leb matters.'],
            ['title' => 'Ethiopian Wine Tasting Night',              'slug' => 'wine-tasting-night',        'category' => 'Events',         'author' => 'TesfaBunna Team',   'published' => true, 'published_at' => '2025-05-20', 'image' => 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', 'excerpt' => "We explored Awash Winery's full range alongside traditional Ethiopian dishes. Here's what paired best."],
            ['title' => 'Celebrate Enkutatash With Us',              'slug' => 'enkutatash-celebration',    'category' => 'Events',         'author' => 'TesfaBunna Team',   'published' => true, 'published_at' => '2025-05-05', 'image' => 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&q=80', 'excerpt' => 'Ethiopian New Year is our favorite celebration. Join us for traditional dishes, teff honey cake, live music and a night to remember.'],
        ];

        foreach ($posts as $post) {
            BlogPost::updateOrCreate(['slug' => $post['slug']], $post);
        }

        // ── Gallery Images ───────────────────────────────────────
        $gallery = [
            ['category' => 'interior', 'src' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', 'alt' => 'Restaurant main dining area'],
            ['category' => 'interior', 'src' => 'https://images.unsplash.com/photo-1552566626-52f8b828329e?w=600&q=80',    'alt' => 'Cozy private dining section'],
            ['category' => 'outdoor',  'src' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',    'alt' => 'Outdoor terrace seating'],
            ['category' => 'food',     'src' => 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', 'alt' => 'Traditional Ethiopian spread'],
            ['category' => 'food',     'src' => 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80', 'alt' => 'Doro Wat plating'],
            ['category' => 'food',     'src' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',    'alt' => 'Beyaynetu fasting platter'],
            ['category' => 'drinks',   'src' => 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80', 'alt' => 'Signature cocktails'],
            ['category' => 'bar',      'src' => 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80', 'alt' => 'Our full bar'],
            ['category' => 'music',    'src' => 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80', 'alt' => 'Live music night'],
            ['category' => 'staff',    'src' => 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&q=80', 'alt' => 'Our team'],
            ['category' => 'interior', 'src' => 'https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=600&q=80', 'alt' => 'Bar seating area'],
            ['category' => 'outdoor',  'src' => 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', 'alt' => 'Garden dining'],
        ];

        foreach ($gallery as $i => $img) {
            GalleryImage::create(array_merge($img, ['sort_order' => $i, 'active' => true]));
        }
    }
}
