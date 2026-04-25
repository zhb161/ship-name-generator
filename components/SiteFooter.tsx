import { Heart } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="py-12 px-4 sm:px-6 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-coral-400" fill="currentColor" />
              <span className="font-bold text-xl">Ship Name Generator</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Create cute couple names, random ship names, and wedding hashtags with free online tools.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Generators</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Ship Name Generator</a></li>
              <li><a href="/couple-ship-name-generator" className="hover:text-white transition-colors">Couple Ship Names</a></li>
              <li><a href="/random-ship-name-generator" className="hover:text-white transition-colors">Random Ship Names</a></li>
              <li><a href="/wedding-hashtag-generator" className="hover:text-white transition-colors">Wedding Hashtags</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Ship Name Generator. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Made with <Heart className="w-4 h-4 inline text-coral-400" fill="currentColor" /> for couples everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
