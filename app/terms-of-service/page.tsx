'use client';

import { Heart, FileText, Scale, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfService() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 mb-6">
            <Scale className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-600">Terms & Conditions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 font-display">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            By using our service, you agree to these terms. Please read them carefully 
            to understand your rights and responsibilities.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
            {/* Acceptance of Terms */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-coral-50 flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-coral-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Acceptance of Terms</h2>
                  <p className="text-gray-600 leading-relaxed">
                    By accessing or using Ship Name Generator (&quot;the Service&quot;), you agree to be bound by 
                    these Terms of Service. If you do not agree to these terms, please do not use our 
                    service. These terms apply to all visitors, users, and others who access or use the Service.
                  </p>
                </div>
              </div>
            </div>

            {/* Description of Service */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-50 flex-shrink-0">
                  <FileText className="w-6 h-6 text-purple-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Description of Service</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Ship Name Generator is a free online tool that creates couple nicknames (ship names) 
                    and wedding hashtags by combining two names. Our service includes:
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></span>
                      <span>Ship name generation using linguistic algorithms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></span>
                      <span>Wedding hashtag creation with customizable options</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></span>
                      <span>Love compatibility calculator for entertainment purposes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></span>
                      <span>Downloadable ship certificates</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* User Conduct */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-50 flex-shrink-0">
                  <Scale className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">User Conduct</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    When using our Service, you agree not to:
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></span>
                      <span>Use the Service for any illegal or unauthorized purpose</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></span>
                      <span>Attempt to interfere with or disrupt the Service or its servers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></span>
                      <span>Use automated systems or software to extract data from the Service</span>
                    </li>
                    <li className="p-3 rounded-lg bg-gray-50 border-l-4 border-coral-400">
                      <span className="text-gray-700">
                        <strong>Note:</strong> While our service generates names based on your input, 
                        we encourage respectful use. Please do not use the Service to create offensive, 
                        harmful, or inappropriate content targeting others.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-50 flex-shrink-0">
                  <FileText className="w-6 h-6 text-amber-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Intellectual Property</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    All content, features, and functionality of the Service—including but not limited to 
                    text, graphics, logos, algorithms, and software—are owned by Ship Name Generator and 
                    are protected by international copyright, trademark, and other intellectual property laws.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    You are granted a limited, non-exclusive, non-transferable license to use the Service 
                    for personal, non-commercial purposes. You may not reproduce, distribute, modify, 
                    create derivative works from, or exploit the Service or its content without our 
                    express written permission.
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-50 flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Disclaimer of Warranties</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties 
                    of any kind, either express or implied, including but not limited to:
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0"></span>
                      <span>Implied warranties of merchantability, fitness for a particular purpose, or non-infringement</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0"></span>
                      <span>Warranties that the Service will be uninterrupted, timely, secure, or error-free</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0"></span>
                      <span>Warranties regarding the accuracy or reliability of any results obtained from using the Service</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 rounded-lg bg-orange-50 border border-orange-100">
                    <p className="text-gray-700 text-sm">
                      <strong>Entertainment Purpose Only:</strong> Our love calculator and compatibility 
                      features are for entertainment purposes only and should not be taken as relationship advice.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-50 flex-shrink-0">
                  <XCircle className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Limitation of Liability</h2>
                  <p className="text-gray-600 leading-relaxed">
                    In no event shall Ship Name Generator, its creators, or affiliates be liable for 
                    any indirect, incidental, special, consequential, or punitive damages, including 
                    without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
                    resulting from your access to or use of (or inability to access or use) the Service.
                  </p>
                </div>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-50 flex-shrink-0">
                  <FileText className="w-6 h-6 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Changes to Terms</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We reserve the right to modify or replace these Terms of Service at any time. 
                    Changes will be effective immediately upon posting to this page. Your continued 
                    use of the Service after any changes constitutes acceptance of the new terms. 
                    We encourage you to review these terms periodically.
                  </p>
                </div>
              </div>
            </div>

            {/* Governing Law */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-teal-50 flex-shrink-0">
                  <Scale className="w-6 h-6 text-teal-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Governing Law</h2>
                  <p className="text-gray-600 leading-relaxed">
                    These Terms shall be governed and construed in accordance with applicable laws, 
                    without regard to its conflict of law provisions. Any disputes arising from or 
                    relating to these Terms or the use of the Service shall be resolved through 
                    friendly negotiation or, if necessary, through appropriate legal channels.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-coral-50 flex-shrink-0">
                  <Heart className="w-6 h-6 text-coral-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Contact Us</h2>
                  <p className="text-gray-600 leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us through 
                    our GitHub repository. We are always happy to help clarify any concerns you may have.
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
              <span className="text-gray-600">Terms of Service</span>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
