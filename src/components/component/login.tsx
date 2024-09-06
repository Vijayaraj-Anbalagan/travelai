import Link from "next/link";
import Image from "next/image";

export default function Login() {
  return (
    <div className="fixed inset-0 grid lg:grid-cols-2 bg-white">
      {/* Form Section */}
      <div className="flex items-center justify-center p-12 lg:p-24">
        <div className="w-full max-w-sm space-y-6">
          <h1 className="text-3xl font-bold text-center">Your Adventure Awaits with Travela!</h1>
          <p className="text-sm text-center text-gray-500">Lets get started on your next journey.</p>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input id="email" type="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500" placeholder="gopalu@example.com" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input id="password" type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
              <Link href="/reset-password" className="inline-block mt-1 text-sm text-orange-600 hover:text-orange-500">
                Lost your way? Reset Password
              </Link>
            </div>

            <Link href={'/pip'}>
            <button  type="submit" className="w-full mt-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600">
              Login and Explore
              </button>
            </Link>

            <button type="button" className="w-full px-4 py-2 text-sm font-medium text-orange-500 border border-orange-500 rounded-md hover:bg-gray-100">
              Login with Google for a Smooth Ride
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            New to Travela?{" "}
            <Link href="/register" className="text-orange-600 hover:text-orange-500">
              Start Your Journey Now
            </Link>
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative hidden w-full h-full lg:block">
        <Image
          src="/login.svg"
          alt="Login"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>
    </div>
  );
}
