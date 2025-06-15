import { FiCheck } from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PricingCardProps {
  name: string;
  price: number | null;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  index: number;
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  popular = false,
  index,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative rounded-2xl p-8 ${
        popular
          ? 'bg-primary text-white shadow-xl scale-105'
          : 'bg-white text-primary shadow-lg'
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <div className="flex items-baseline justify-center">
          {price === null ? (
            <span className="text-2xl font-bold">Custom Pricing</span>
          ) : (
            <>
              <span className="text-4xl font-bold">${price}</span>
              <span className="text-gray-500 ml-2">/month</span>
            </>
          )}
        </div>
        <p className={`mt-4 ${popular ? 'text-gray-200' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-center">
            <FiCheck
              className={`h-5 w-5 mr-3 ${
                popular ? 'text-accent' : 'text-primary'
              }`}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/book"
        className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
          popular
            ? 'bg-accent hover:bg-accent/90 text-white'
            : 'bg-primary hover:bg-primary/90 text-white'
        }`}
      >
        {cta}
      </Link>
    </motion.div>
  );
} 