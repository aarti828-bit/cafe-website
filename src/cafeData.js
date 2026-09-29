const photos = {
  hero: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1500&q=80',
  coffee: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=75',
  tea: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=75',
  coldDrink: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=75',
  pizza: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=75',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=75',
  snack: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=75',
  dessert: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=75',
  interior: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=80',
  patio: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=75',
  bakery: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=75',
}

export const cafe = {
  name: 'Brew House Cafe',
  headline: 'Good coffee. Good company. Stay a little.',
  tagline: 'A welcoming neighborhood cafe for a thoughtful cup, something fresh, and an unhurried moment.',
  shortDescription: 'Coffee, fresh bites, and a comfortable place to pause.',
  storyTitle: 'A neighborhood kind of cafe',
  story: 'Brew House is a demo cafe concept built around good coffee and easy hospitality. Replace this introduction with the real cafe story, its people, and what makes the place special.',
  highlights: ['Coffee & tea', 'Freshly made food', 'A seat for everyone'],
  images: { hero: photos.hero, heroAlt: 'A freshly prepared cafe coffee on a table' },

  // Replace blank contact fields and the sample location before launch. Phone numbers use international format.
  phoneDisplay: '',
  phoneNumber: '',
  whatsappNumber: '',
  email: '',
  instagramUrl: '',
  address: '',
  mapsUrl: '',

  hours: {
    isDemo: true,
    days: [{ label: 'Monday – Sunday', hours: '10:00 AM – 10:00 PM' }],
  },
}

export const menuCategories = [
  ['all', 'All items'], ['Coffee', 'Coffee'], ['Tea', 'Tea'], ['Cold Drinks', 'Cold drinks'],
  ['Pizza', 'Pizza'], ['Burgers', 'Burgers'], ['Snacks', 'Snacks'], ['Desserts', 'Desserts'],
]

export const menuItems = [
  { name: 'House Latte', category: 'Coffee', price: '$4.75', description: 'Espresso with silky steamed milk, finished with a little latte art.', image: photos.coffee, alt: 'Latte in a ceramic cup on a cafe table' },
  { name: 'Masala Chai', category: 'Tea', price: '$4.25', description: 'Black tea gently simmered with warming spices and milk.', image: photos.tea, alt: 'Fresh tea served in a glass cup' },
  { name: 'Iced Coffee', category: 'Cold Drinks', price: '$4.50', description: 'Chilled coffee over ice for a refreshing afternoon pick-me-up.', image: photos.coldDrink, alt: 'Cold coffee served over ice' },
  { name: 'Garden Pizza', category: 'Pizza', price: '$12.50', description: 'A crisp base topped with seasonal vegetables and melted cheese.', image: photos.pizza, alt: 'Freshly baked vegetable pizza' },
  { name: 'Classic Cafe Burger', category: 'Burgers', price: '$13.50', description: 'A toasted bun, a hearty patty, crisp greens, and house sauce.', image: photos.burger, alt: 'Cafe burger with fresh lettuce and tomato' },
  { name: 'Butter Croissant', category: 'Snacks', price: '$3.75', description: 'A flaky, golden pastry to go with your favorite drink.', image: photos.snack, alt: 'Golden flaky croissants ready to serve' },
  { name: 'Seasonal Cake', category: 'Desserts', price: '$6.00', description: 'A tender slice of cake with a changing seasonal finish.', image: photos.dessert, alt: 'A slice of cake served for dessert' },
]

export const gallery = [
  { src: photos.coffee, label: 'Coffee', alt: 'A freshly poured latte in a ceramic cup' },
  { src: photos.bakery, label: 'Fresh bakes', alt: 'Golden pastries arranged on a bakery tray' },
  { src: photos.interior, label: 'Cafe interior', alt: 'Warm cafe interior with tables and natural light' },
  { src: photos.patio, label: 'Ambience', alt: 'Outdoor cafe seating surrounded by greenery' },
  { src: photos.dessert, label: 'Desserts', alt: 'A freshly plated cafe dessert' },
]

export const reviews = [
  { id: 'sample-1', initials: 'SR', name: 'Sample guest', stars: 5, text: 'Replace this sample with a genuine customer review before launch.' },
  { id: 'sample-2', initials: 'SR', name: 'Sample guest', stars: 5, text: 'Add a real guest testimonial here, with permission to publish.' },
  { id: 'sample-3', initials: 'SR', name: 'Sample guest', stars: 5, text: 'Demo testimonial only. Update or remove this entry in the cafe data.' },
]