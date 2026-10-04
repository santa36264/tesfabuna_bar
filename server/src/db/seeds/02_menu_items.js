const menuItems = [
  // Appetizers
  { category: 'appetizers', name: 'Sambusa', popular: true, price: 120, calories: 280, description: 'Crispy fried pastry pockets filled with spiced minced beef or lentils, served with green chili sauce.', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80' },
  { category: 'appetizers', name: 'Kategna', popular: false, price: 90, calories: 210, description: 'Toasted injera brushed with spiced niter kibbeh and berbere, cut into strips.', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80' },
  { category: 'appetizers', name: 'Timatim Fitfit', popular: false, price: 85, calories: 110, description: 'Diced tomatoes, onion, jalapeño and herbs tossed with crumbled injera and olive oil.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80' },
  // Breakfast
  { category: 'breakfast', name: 'Injera Firfir', popular: true, price: 130, calories: 420, description: 'Torn injera sautéed with niter kibbeh and berbere spice. A beloved morning staple.', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80' },
  { category: 'breakfast', name: 'Full Ethiopian Breakfast', popular: true, price: 280, calories: 720, description: 'Injera firfir, scrambled eggs with green pepper, ayib (cottage cheese) and fresh juice.', image: 'https://images.unsplash.com/photo-1533089860892-a9b969df67a3?w=500&q=80' },
  { category: 'breakfast', name: 'Genfo', popular: false, price: 100, calories: 380, description: 'Thick barley porridge served with niter kibbeh and berbere in the center.', image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=500&q=80' },
  // Lunch
  { category: 'lunch', name: 'Doro Wat', popular: true, price: 350, calories: 580, description: "Ethiopia's national dish — chicken drumsticks slow-cooked in rich berbere and spiced butter, served with a boiled egg on injera.", image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80' },
  { category: 'lunch', name: 'Beyaynetu', popular: true, price: 300, calories: 490, description: 'Colorful platter of assorted vegetarian stews on injera: shiro, misir, gomen, tikil gomen, fosolia and more.', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80' },
  { category: 'lunch', name: 'Shiro Wat', popular: false, price: 180, calories: 340, description: 'Slow-simmered chickpea flour stew seasoned with berbere and niter kibbeh. Smooth, hearty and comforting.', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80' },
  { category: 'lunch', name: 'Misir Wat', popular: false, price: 190, calories: 370, description: 'Split red lentils simmered long and slow in a rich berbere sauce with garlic and ginger.', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&q=80' },
  // Dinner
  { category: 'dinner', name: 'Kitfo', popular: true, price: 480, calories: 650, description: 'Premium lean beef minced and seasoned with mitmita and niter kibbeh. Served leb-leb with ayib and gomen.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80' },
  { category: 'dinner', name: 'Tibs Mixed', popular: true, price: 420, calories: 560, description: 'Tender beef and lamb cubes sautéed with onion, tomato, rosemary and jalapeño in spiced butter.', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&q=80' },
  { category: 'dinner', name: 'Alicha Wat', popular: false, price: 390, calories: 520, description: 'Mild turmeric-based lamb stew with onion, garlic, ginger and green peppers — gentle and fragrant.', image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&q=80' },
  // Burgers
  { category: 'burgers', name: 'TesfaBunna Signature Burger', popular: true, price: 290, calories: 760, description: 'Double beef patty seasoned with mitmita, caramelized onion, berbere aioli in a toasted brioche bun.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80' },
  { category: 'burgers', name: 'Crispy Chicken Burger', popular: false, price: 260, calories: 680, description: 'Fried chicken breast with coleslaw, pickles and honey mustard sauce.', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80' },
  // Pizza
  { category: 'pizza', name: 'Tibs Pizza', popular: true, price: 340, calories: 850, description: 'Thin crust topped with berbere-spiced tibs beef, red onion, jalapeño and mozzarella.', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80' },
  { category: 'pizza', name: 'Classic Margherita', popular: false, price: 260, calories: 720, description: 'San Marzano tomato, fresh mozzarella, basil and extra virgin olive oil.', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80' },
  // Pasta
  { category: 'pasta', name: 'Spicy Berbere Pasta', popular: false, price: 230, calories: 590, description: 'Penne tossed in a rich tomato berbere sauce with garlic, olive oil and parmesan.', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&q=80' },
  // Desserts
  { category: 'desserts', name: 'Honey Cake', popular: true, price: 130, calories: 390, description: 'Moist sponge cake glazed with Ethiopian honey and served with a cardamom cream.', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80' },
  { category: 'desserts', name: 'Chocolate Lava Cake', popular: true, price: 190, calories: 520, description: 'Warm dark chocolate fondant with a flowing center, served with vanilla ice cream.', image: 'https://images.unsplash.com/photo-1606313564200-e75d8a5de2f1?w=500&q=80' },
  // Vegetarian
  { category: 'vegetarian', name: 'Beyaynetu Full Veggie', popular: true, price: 300, calories: 490, description: 'Grand fasting platter: shiro, misir, gomen, tikil gomen, azifa, fosolia and tomato salad on injera.', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80' },
  { category: 'vegetarian', name: "Ye'abesha Gomen", popular: false, price: 160, calories: 220, description: 'Ethiopian collard greens slowly braised with garlic, ginger, onion and niter kibbeh.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80' },
  { category: 'vegetarian', name: 'Tikil Gomen', popular: false, price: 150, calories: 200, description: 'Spiced cabbage and carrot stew — mild, fragrant, and satisfying.', image: 'https://images.unsplash.com/photo-1555243896-c709bfa0b564?w=500&q=80' },
  // Kids
  { category: 'kids', name: 'Mini Burger & Fries', popular: false, price: 160, calories: 480, description: 'Small beef burger with sweet potato fries and ketchup.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80' },
  { category: 'kids', name: 'Macaroni Tomato Sauce', popular: false, price: 120, calories: 380, description: 'Soft macaroni in a mild homemade tomato sauce with a sprinkle of cheese.', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&q=80' },
]

export async function seed(knex) {
  await knex('menu_items').del()

  await knex('menu_items').insert(
    menuItems.map((item, index) => ({ ...item, sort_order: index, available: true })),
  )

  console.log(`  menu_items: ${menuItems.length}`)
}