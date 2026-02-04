'use client';

import { Heart, Shield, Lock, Eye, FileText } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-cream">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral-400 to-purple-soft flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <span className="font-bold text-xl text-gray-800 hidden sm:block">
                Ship Name Generator
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-coral-500 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-50 border border-coral-100 mb-6">
            <Shield className="w-4 h-4 text-coral-500" />
            <span className="text-sm font-medium text-gray-600">Your Privacy Matters</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 font-display">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We value your privacy and are committed to protecting your personal information.
            This policy explains how we handle data on our website.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
            {/* Introduction */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-coral-50 flex-shrink-0">
                  <FileText className="w-6 h-6 text-coral-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Introduction</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Ship Name Generator (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to 
                    protecting any information that may be collected while using our website. This Privacy Policy 
                    explains our data practices and the choices you have concerning your information.
                  </p>
                </div>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-50 flex-shrink-0">
                  <Eye className="w-6 h-6 text-purple-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Information We Collect</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Our website is designed to function without requiring any personal information. However, 
                    we may collect the following types of data:
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral-400 mt-2 flex-shrink-0"></span>
                      <span>
                        <strong>Names entered:</strong> The names you type into our generator are processed 
                        locally in your browser and are not stored on our servers.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral-400 mt-2 flex-shrink-0"></span>
                      <span>
                        <strong>Usage data:</strong> We may collect anonymous usage statistics to improve 
                        our service, such as popular feature usage and general traffic patterns.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral-400 mt-2 flex-shrink-0"></span>
                      <span>
                        <strong>Technical data:</strong> Browser type, device information, and IP address 
                        may be collected for security and analytics purposes.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-50 flex-shrink-0">
                  <Lock className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">How We Use Your Information</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Any information collected is used solely for the following purposes:
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></span>
                      <span>To provide and improve our ship name generation service</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></span>
                      <span>To analyze usage patterns and enhance user experience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></span>
                      <span>To maintain website security and prevent abuse</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></span>
                      <span>To comply with legal obligations when required</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-green-50 flex-shrink-0">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Data Security</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We implement appropriate security measures to protect against unauthorized access, 
                    alteration, disclosure, or destruction of data. Since our service processes names 
                    locally in your browser, no personal name data is transmitted to or stored on our servers.
                  </p>
                </div>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-50 flex-shrink-0">
                  <Eye className="w-6 h-6 text-amber-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Third-Party Services</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We may use third-party analytics services (such as Google Analytics) to help us 
                    understand how visitors interact with our website. These services may use cookies 
                    and similar technologies to collect anonymous traffic data. You can control cookie 
                    preferences through your browser settings.
                  </p>
                </div>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-pink-50 flex-shrink-0">
                  <Heart className="w-6 h-6 text-pink-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Children&apos;s Privacy</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our service is not directed to children under 13 years of age. We do not knowingly 
                    collect personal information from children under 13. If you are a parent or guardian 
                    and believe your child has provided us with personal information, please contact us 
                    immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Changes to Policy */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-50 flex-shrink-0">
                  <FileText className="w-6 h-6 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Changes to This Policy</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We may update this Privacy Policy from time to time. Any changes will be posted on 
                    this page with an updated revision date. We encourage you to review this policy 
                    periodically to stay informed about how we protect your information.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Us */}
            <div className="p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-coral-50 flex-shrink-0">
                  <Heart className="w-6 h-6 text-coral-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Contact Us</h2>
                  <p className="text-gray-600 leading-relaxed">
                    If you have any questions, concerns, or suggestions regarding this Privacy Policy, 
                    please feel free to contact us through our GitHub repository or by email.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-coral-400 to-purple-soft text-white font-semibold shadow-lg shadow-coral-200 hover:shadow-xl hover:shadow-coral-300 transition-all duration-300"
            >
              <Heart className="w-5 h-5" />
              Back to Ship Name Generator
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Ship Name Generator. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/wedding-hashtag-generator" className="hover:text-white transition-colors">Wedding Hashtags</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <span className="text-gray-600">Privacy Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
