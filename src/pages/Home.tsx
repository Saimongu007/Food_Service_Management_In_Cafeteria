import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Clock, CreditCard, Utensils } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1557499305-0af888c3d8ec?auto=format&fit=crop&q=80"
            alt="University Canteen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-6">EDU Canteen Service</h1>
          <p className="text-xl mb-8">
            Order delicious meals from your university canteen with ease.
            Skip the lines, customize your orders, and enjoy your food!
          </p>
          <Link
            to="/menu"
            className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            View Menu
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: <Utensils className="h-8 w-8" />,
              title: 'Fresh Food',
              description: 'Quality ingredients prepared daily',
            },
            {
              icon: <Clock className="h-8 w-8" />,
              title: 'Quick Service',
              description: 'Skip the lines with online ordering',
            },
            {
              icon: <CreditCard className="h-8 w-8" />,
              title: 'Easy Payment',
              description: 'Multiple payment options available',
            },
            {
              icon: <ChefHat className="h-8 w-8" />,
              title: 'Special Menu',
              description: 'Daily specials and customizable orders',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="inline-block p-3 bg-indigo-100 rounded-full text-indigo-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Specials */}
      <section className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Today's Specials</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Chef's Special Biryani",
              price: "৳180",
              image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80",
            },
            {
              name: "Grilled Chicken Platter",
              price: "৳220",
              image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80",
            },
            {
              name: "Vegetarian Thali",
              price: "৳150",
              image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80",
            },
          ].map((special, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={special.image}
                alt={special.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{special.name}</h3>
                <p className="text-indigo-600 font-bold">{special.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}