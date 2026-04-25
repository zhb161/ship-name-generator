export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  faqs: FaqItem[];
}

export default function FaqSection({ title = 'Frequently Asked Questions', faqs }: FaqSectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 bg-white/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 font-display">{title}</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl bg-white/80 border border-gray-100 shadow-sm p-5"
            >
              <summary className="cursor-pointer list-none font-bold text-gray-800 flex items-center justify-between gap-4">
                <span>{faq.question}</span>
                <span className="text-coral-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-gray-600 leading-relaxed mt-3">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
