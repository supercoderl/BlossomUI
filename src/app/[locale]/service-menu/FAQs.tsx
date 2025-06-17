import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQsSection = () => {
    const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

    const toggleItem = (index: number) => {
        setOpenItems((prev: Record<number, boolean>) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const faqData = [
        {
            question: "What is Hydrafacial?",
            answer: "The HydraFacial is a much-loved rejuvenation treatment, using patented Vortex technology to deliver botanical nutrients directly to the skin. HydraFacials infuse skin with healthy doses of hyaluronic acid, red algae extract, copper, zinc, and magnesium peptides to plump and rejuvenate your appearance, and leave you glowing from the inside out.\n\nHydraFacials are a miracle treatment for common skin concerns such as: acne, hyperpigmentation, fine lines, wrinkles dryness, redness, inflammation, age spots and can even general dullness. If you are looking to replenish the building blocks which lead to long-lasting, healthy-looking skin then a Hydrafacial could be exactly the ticket."
        },
        {
            question: "Should I wash my hair before doing a haircut?",
            answer: "It's generally recommended to come with clean hair for your haircut appointment. Clean hair allows your stylist to better assess your hair's natural texture, growth patterns, and condition. However, some stylists prefer to wash your hair themselves to ensure it's properly prepared for cutting. We recommend checking with your stylist when booking your appointment to understand their preference."
        },
        {
            question: "What does Cocktail makeup include?",
            answer: "Cocktail makeup is a sophisticated look designed for evening events and special occasions. It typically includes a flawless base with medium to full coverage foundation, defined eyes with smoky or dramatic eyeshadow, winged eyeliner, voluminous lashes, sculpted brows, contoured cheeks with a subtle highlight, and a statement lip color. The overall look is polished and glamorous, perfect for cocktail parties, dinner dates, or evening celebrations."
        },
        {
            question: "What if I cannot choose cosmetology service?",
            answer: "If you're unsure about which cosmetology service is right for you, our experienced professionals are here to help! We offer complimentary consultations where we assess your skin type, concerns, and goals to recommend the most suitable treatments. You can also schedule a consultation appointment where we'll discuss your options in detail and create a personalized treatment plan that fits your needs and budget."
        }
    ];

    return (
        <section className="py-24 relative">
            {/* Background */}
            <div className="bg-[#FBF4F1] h-full w-full absolute top-0 left-0"></div>

            <div className="max-w-6xl mx-auto relative px-4">
                <div className="w-full">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-medium text-gray-800 mb-8">
                            Frequently Asked Questions
                        </h2>
                        <div className="max-w-2xl mx-auto">
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Here you can find answers on frequently asked questions. If you cannot find the answer, feel free to contact us via email or phone.
                            </p>
                        </div>
                    </div>

                    {/* FAQ Items */}
                    <div className="max-w-3xl mx-auto">
                        <div className="border-b border-gray-200">
                            {faqData.map((item, index) => (
                                <div key={index} className="border-t border-gray-200">
                                    <button
                                        onClick={() => toggleItem(index)}
                                        className="flex justify-between items-center py-5 w-full text-left hover:bg-gray-50 transition-colors duration-200 px-2"
                                    >
                                        <span className="text-base font-medium text-gray-800 pr-8">
                                            {item.question}
                                        </span>
                                        <div className="flex-shrink-0 ml-4">
                                            {openItems[index] ? (
                                                <Minus className="w-5 h-5 text-gray-600 cursor-pointer" />
                                            ) : (
                                                <Plus className="w-5 h-5 text-gray-600 cursor-pointer" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Collapsible Content */}
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openItems[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                        <div className="pb-6 px-2">
                                            <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                                                {item.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQsSection;