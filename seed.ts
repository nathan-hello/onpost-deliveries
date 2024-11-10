// This file is in .prettierignore

import { createSeedClient } from "@snaplet/seed";

const main = async () => {
  const seed = await createSeedClient();

  await seed.$resetDatabase();

  // Seed auth.users
  await seed.users([
    { id: '550e8400-e29b-41d4-a716-446655440000', email: 'user1@example.com' },
    { id: '550e8400-e29b-41d4-a716-446655440001', email: 'user2@example.com' },
    { id: '550e8400-e29b-41d4-a716-446655440002', email: 'user3@example.com' },
    { id: '550e8400-e29b-41d4-a716-446655440003', email: 'user4@example.com' },
  ]);

  // Seed opd_profiles
  await seed.opd_profiles([
    { id: '550e8400-e29b-41d4-a716-446655440000', name: 'User One', favorite_bases: [1, 2], favorite_restaurants: [1, 2], is_restaurant: null, },
    { id: '550e8400-e29b-41d4-a716-446655440001', name: 'User Two', favorite_bases: [3], favorite_restaurants: [2], is_restaurant: null, },
    { id: '550e8400-e29b-41d4-a716-446655440002', name: 'User Three', favorite_bases: [4, 5], favorite_restaurants: [3], is_restaurant: null, },
    { id: '550e8400-e29b-41d4-a716-446655440003', name: 'User Four', favorite_bases: [1], favorite_restaurants: [4], is_restaurant: null, },
  ]);

  // Seed opd_hours for restaurants
  await seed.opd_hours([
    { id: 1, entity_id: 1, entity_type: 'Restaurant', always_open: true, begin_time: '00:00', end_time: '23:59', day_of_week: 'Monday', },
    { id: 2, entity_id: 2, entity_type: 'Restaurant', always_open: false, begin_time: '09:00', end_time: '22:00', day_of_week: 'Tuesday', },
    { id: 3, entity_id: 3, entity_type: 'Restaurant', always_open: false, begin_time: '09:00', end_time: '22:00', day_of_week: 'Wednesday', },
    { id: 4, entity_id: 4, entity_type: 'Restaurant', always_open: false, begin_time: '09:00', end_time: '22:00', day_of_week: 'Thursday', },
    { id: 5, entity_id: 5, entity_type: 'Restaurant', always_open: false, begin_time: '09:00', end_time: '22:00', day_of_week: 'Friday', },
    { id: 6, entity_id: 6, entity_type: 'Restaurant', always_open: false, begin_time: '10:00', end_time: '23:00', day_of_week: 'Saturday', },
    { id: 7, entity_id: 7, entity_type: 'Restaurant', always_open: false, begin_time: '10:00', end_time: '23:00', day_of_week: 'Sunday', },
  ]);

  // Seed opd_hours for gates
  await seed.opd_hours([
    { id: 8, entity_id: 1, entity_type: 'Gate', always_open: true, begin_time: '00:00', end_time: '23:59', day_of_week: 'All', },
    { id: 9, entity_id: 2, entity_type: 'Gate', always_open: false, begin_time: '09:00', end_time: '22:00', day_of_week: 'All', },
    { id: 10, entity_id: 3, entity_type: 'Gate', always_open: true, begin_time: '00:00', end_time: '23:59', day_of_week: 'All', },
    { id: 11, entity_id: 4, entity_type: 'Gate', always_open: false, begin_time: '09:00', end_time: '22:00', day_of_week: 'All', },
    { id: 12, entity_id: 5, entity_type: 'Gate', always_open: true, begin_time: '00:00', end_time: '23:59', day_of_week: 'All', },
  ]);

  // Seed opd_bases
  await seed.opd_bases([
    { id: 1, name: 'Base A', restaurants: [1, 2], gates: [1, 2] },
    { id: 2, name: 'Base B', restaurants: [3], gates: [2] },
    { id: 3, name: 'Base C', restaurants: [4, 5], gates: [1] },
    { id: 4, name: 'Base D', restaurants: [6, 7], gates: [2] },
  ]);

  // Seed opd_restaurants
  await seed.opd_restaurants([
    { id: 1, name: 'Restaurant 1', address: '123 Main St', delivery_hours: 1, working_hours: 1 },
    { id: 2, name: 'Restaurant 2', address: '456 Elm St', delivery_hours: 2, working_hours: 2 },
    { id: 3, name: 'Restaurant 3', address: '789 Oak St', delivery_hours: 3, working_hours: 3 },
    { id: 4, name: 'Restaurant 4', address: '321 Pine St', delivery_hours: 4, working_hours: 4 },
    { id: 5, name: 'Restaurant 5', address: '654 Maple St', delivery_hours: 5, working_hours: 5 },
    { id: 6, name: 'Restaurant 6', address: '987 Cedar St', delivery_hours: 6, working_hours: 6 },
    { id: 7, name: 'Restaurant 7', address: '159 Birch St', delivery_hours: 7, working_hours: 7 },
  ]);

  // Seed opd_base_gates
  await seed.opd_base_gates([
    { id: 1, location: 'Gate 1', is_24_hour: true, is_visitor_gate: false, signup_instructions: 'Sign up at the entrance', base_id: 1, hours: 8, },
    { id: 2, location: 'Gate 2', is_24_hour: false, is_visitor_gate: true, signup_instructions: 'Sign up online', base_id: 1, hours: 9, },
    { id: 3, location: 'Gate 3', is_24_hour: true, is_visitor_gate: false, signup_instructions: 'Sign up at the entrance', base_id: 2, hours: 10, },
    { id: 4, location: 'Gate 4', is_24_hour: false, is_visitor_gate: true, signup_instructions: 'Sign up online', base_id: 3, hours: 11, },
    { id: 5, location: 'Gate 5', is_24_hour: true, is_visitor_gate: false, signup_instructions: 'Sign up at the entrance', base_id: 4, hours: 12, },
  ]);

  // Seed opd_drivers
  await seed.opd_drivers([
    { id: 1, name: 'Driver A', currently_working: true, restaurant_id: 1 },
    { id: 2, name: 'Driver B', currently_working: false, restaurant_id: 2 },
    { id: 3, name: 'Driver C', currently_working: true, restaurant_id: 3 },
    { id: 4, name: 'Driver D', currently_working: true, restaurant_id: 4 },
    { id: 5, name: 'Driver E', currently_working: false, restaurant_id: 5 },
    { id: 6, name: 'Driver F', currently_working: true, restaurant_id: 6 },
    { id: 7, name: 'Driver G', currently_working: false, restaurant_id: 7 },
  ]);

  console.log('Database seeded successfully!');

  process.exit();
};

main();

