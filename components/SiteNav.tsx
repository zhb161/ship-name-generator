import { Github, Hash, Heart, Shuffle } from 'lucide-react';

interface SiteNavProps {
  activePath?: string;
}

const navItems = [
  { href: '/', label: 'Ship Names', icon: Heart },
  { href: '/couple-ship-name-generator', label: 'Couples', icon: Heart },
  { href: '/random-ship-name-generator', label: 'Random', icon: Shuffle },
  { href: '/wedding-hashtag-generator', label: 'Wedding Hashtags', icon: Hash },
];

export default function SiteNav({ activePath = '/' }: SiteNavProps) {
  return (
    <nav className="sticky top-0 z-40 glass border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral-400 to-purple-soft flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <span className="font-bold text-xl text-gray-800 hidden lg:block">
              Ship Name Generator
            </span>
          </a>

          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePath === item.href;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive ? 'text-coral-600' : 'text-gray-600 hover:text-coral-500'
                  }`}
                >
                  <Icon className="w-4 h-4" fill={item.href === '/' || item.href === '/couple-ship-name-generator' ? 'currentColor' : 'none'} />
                  <span>{item.label}</span>
                </a>
              );
            })}
            <a
              href="https://github.com/zhb161/ship-name-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-coral-500 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
