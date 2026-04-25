import { Hash, Heart, Shuffle } from 'lucide-react';

interface RelatedToolsProps {
  currentPath?: string;
}

const tools = [
  {
    href: '/',
    title: 'Ship Name Generator',
    description: 'Blend two names into cute ship names and relationship nicknames.',
    icon: Heart,
  },
  {
    href: '/couple-ship-name-generator',
    title: 'Couple Ship Name Generator',
    description: 'Create romantic couple names, crush names, and OTP nicknames.',
    icon: Heart,
  },
  {
    href: '/random-ship-name-generator',
    title: 'Random Ship Name Generator',
    description: 'Get instant random ship name ideas from sample name pairs.',
    icon: Shuffle,
  },
  {
    href: '/wedding-hashtag-generator',
    title: 'Wedding Hashtag Generator',
    description: 'Make custom wedding hashtags with names, years, and last names.',
    icon: Hash,
  },
];

export default function RelatedTools({ currentPath }: RelatedToolsProps) {
  const visibleTools = tools.filter((tool) => tool.href !== currentPath);

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 font-display">
          Popular Ship Name Tools
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Try another generator for couple names, random ideas, or wedding hashtags.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {visibleTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <a
                key={tool.href}
                href={tool.href}
                className="block p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-soft card-hover"
              >
                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-coral-400 to-purple-soft flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" fill={tool.icon === Heart ? 'currentColor' : 'none'} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{tool.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tool.description}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
