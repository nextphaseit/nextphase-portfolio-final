import Link from "next/link"

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Our Website</h1>
          <p className="text-lg text-gray-700 mb-8">Your one-stop destination for all your needs.</p>
          <Link href="/about" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded">
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Feature 1</h2>
              <p className="text-gray-700">
                Description of feature 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Feature 2</h2>
              <p className="text-gray-700">
                Description of feature 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Feature 3</h2>
              <p className="text-gray-700">
                Description of feature 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 My Website. All rights reserved.</p>
          <nav className="mt-4">
            <Link href="/about" className="hover:text-gray-300 mr-4">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-300 mr-4">
              Contact
            </Link>
            <Link href="/terms" className="hover:text-gray-300">
              Terms of Service
            </Link>
          </nav>
          <div className="mt-4">
            <p>Contact us:</p>
            <Link href="/contact" className="hover:text-gray-300">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
