const drinks = [
  { category: 'cocktails', name: 'Tej Sunrise', price: 220, description: 'Ethiopian honey wine (tej), orange juice and grenadine. Sweet and golden.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80' },
  { category: 'cocktails', name: 'Addis Mule', price: 240, description: 'Vodka, ginger beer, fresh lime and Ethiopian berbere rim.', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&q=80' },
  { category: 'cocktails', name: 'Blue Nile', price: 230, description: 'Gin, blue curaçao, tonic water, mint leaves and a lime twist.', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500&q=80' },
  { category: 'mocktails', name: 'Mango Tej Fizz', price: 150, description: 'Fresh mango, ginger, honey, lime juice and sparkling water.', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80' },
  { category: 'mocktails', name: 'Passion Cooler', price: 140, description: 'Passion fruit, pineapple, coconut cream and crushed ice.', image: 'https://images.unsplash.com/photo-1473396413399-6717ef7c4093?w=500&q=80' },
  { category: 'beer', name: 'St. George Draft', price: 120, description: "Ethiopia's flagship lager — crisp, refreshing and locally brewed.", image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500&q=80' },
  { category: 'beer', name: 'Dashen Bottle', price: 110, description: 'Smooth Ethiopian amber lager from the highlands.', image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=500&q=80' },
  { category: 'beer', name: 'Habesha Beer', price: 115, description: 'Light, clean lager with a distinctive Ethiopian barley taste.', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&q=80' },
  { category: 'wine', name: 'Awash Red Wine', price: 180, description: 'Full-bodied Ethiopian red — notes of dark fruit and warm spice.', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&q=80' },
  { category: 'wine', name: 'Awash White Wine', price: 175, description: 'Light and dry Ethiopian white with floral aromas.', image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=500&q=80' },
  { category: 'whiskey', name: 'Johnnie Walker Black', price: 280, description: '12-year aged blended Scotch whisky, smooth with a smoky finish.', image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=500&q=80' },
  { category: 'vodka', name: 'Grey Goose', price: 290, description: 'French premium vodka, clean and smooth.', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=80' },
  { category: 'gin', name: "Hendrick's Gin", price: 300, description: 'Scottish gin infused with cucumber and rose petals.', image: 'https://images.unsplash.com/photo-1606143745113-21d4d1c5e7e3?w=500&q=80' },
  { category: 'tequila', name: 'Don Julio Blanco', price: 310, description: 'Premium silver tequila — bright agave and citrus notes.', image: 'https://images.unsplash.com/photo-1601887573500-0edce1f665c5?w=500&q=80' },
  { category: 'rum', name: 'Havana Club 7', price: 250, description: 'Aged Cuban rum — rich, complex and perfectly balanced.', image: 'https://images.unsplash.com/photo-1598963869854-5c5d9f7de3ab?w=500&q=80' },
  { category: 'soft', name: 'Soft Drinks', price: 60, description: 'Coca-Cola, Fanta, Sprite, Tonic Water, Ambo sparkling water.', image: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?w=500&q=80' },
  { category: 'coffee', name: 'Jebena Coffee Ceremony', price: 200, description: 'Traditional 3-round Ethiopian coffee service — roasted, ground and brewed in a clay jebena with popcorn.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80' },
  { category: 'coffee', name: 'Ethiopian Macchiato', price: 65, description: 'Addis-style espresso with a touch of steamed milk — rich and intense.', image: 'https://images.unsplash.com/photo-1485808191679-5f86510df71f?w=500&q=80' },
  { category: 'coffee', name: 'Buna (Black Coffee)', price: 55, description: 'Freshly roasted Yirgacheffe beans brewed strong and served with sugar.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80' },
  { category: 'juice', name: 'Layered Juice Special', price: 130, description: 'The famous Addis layered juice — avocado, mango, papaya and guava stacked in a glass.', image: 'https://images.unsplash.com/photo-1473158912295-9ed202edb993?w=500&q=80' },
  { category: 'juice', name: 'Fresh Orange Juice', price: 90, description: 'Hand-squeezed Valencia oranges, served immediately.', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&q=80' },
  { category: 'juice', name: 'Avocado Juice', price: 110, description: 'Blended fresh avocado with milk and a drizzle of honey.', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80' },
]

export async function seed(knex) {
  await knex('drinks').del()

  await knex('drinks').insert(
    drinks.map((drink, index) => ({ ...drink, sort_order: index, available: true })),
  )

  console.log(`  drinks: ${drinks.length}`)
}