import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export const Footer = () => (
    <footer className="w-full bg-white border-t border-gray-200 py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="font-semibold text-gray-800 mb-4">About Travela</h3>
                    <p className="text-gray-600">
                        Your AI-powered travel companion for seamless, personalized adventures.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-600">
                        <li>
                            <Link href='/'>About</Link>
                        </li>
                        <li>
                            <Link href='/'>Contact</Link>
                        </li>
                        <li>
                            <Link href='/'>Privacy Policy</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Connect</h3>
                    <div className="flex space-x-4">
                        <Link href='/' className="text-gray-600 hover:text-orange-500">
                            <FaTwitter className="w-5 h-5" />
                        </Link>
                        <Link href='/' className="text-gray-600 hover:text-orange-500">
                            <FaGithub className="w-5 h-5" />
                        </Link>
                        <Link href='/' className="text-gray-600 hover:text-orange-500">
                            <FaLinkedin className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="text-center text-gray-600 mt-8">
                © 2024 Travela. All rights reserved.
            </div>
        </div>
    </footer>
);