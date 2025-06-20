'use client'

import { useState } from 'react'
import {
    CloseOutlined,
    DownOutlined,
    PlusOutlined
} from '@ant-design/icons'

const FAQSection = () => {
    const [openPanel, setOpenPanel] = useState(null)

    const togglePanel = (panelId: any) => {
        setOpenPanel(openPanel === panelId ? null : panelId)
    }

    const faqData = [
        {
            id: 'cancellation',
            title: 'Cancellation Policy',
            content: `The HydraFacial is a much-loved rejuvenation treatment, using patented Vortex technology to deliver botanical nutrients directly to the skin. HydraFacials infuse skin with healthy doses of hyaluronic acid, red algae extract, copper, zinc, and magnesium peptides to plump and rejuvenate your appearance, and leave you glowing from the inside out.

HydraFacials are a miracle treatment for common skin concerns such as: acne, hyperpigmentation, fine lines, wrinkles dryness, redness, inflammation, age spots and can even general dullness. If you are looking to replenish the building blocks which lead to long-lasting, healthy-looking skin then a Hydrafacial could be exactly the ticket.`
        },
        {
            id: 'refund',
            title: 'Non Refund Policy',
            content: `The HydraFacial is a much-loved rejuvenation treatment, using patented Vortex technology to deliver botanical nutrients directly to the skin. HydraFacials infuse skin with healthy doses of hyaluronic acid, red algae extract, copper, zinc, and magnesium peptides to plump and rejuvenate your appearance, and leave you glowing from the inside out.

HydraFacials are a miracle treatment for common skin concerns such as: acne, hyperpigmentation, fine lines, wrinkles dryness, redness, inflammation, age spots and can even general dullness. If you are looking to replenish the building blocks which lead to long-lasting, healthy-looking skin then a Hydrafacial could be exactly the ticket.`
        },
        {
            id: 'terms',
            title: 'Terms & Conditions',
            content: `The HydraFacial is a much-loved rejuvenation treatment, using patented Vortex technology to deliver botanical nutrients directly to the skin. HydraFacials infuse skin with healthy doses of hyaluronic acid, red algae extract, copper, zinc, and magnesium peptides to plump and rejuvenate your appearance, and leave you glowing from the inside out.

HydraFacials are a miracle treatment for common skin concerns such as: acne, hyperpigmentation, fine lines, wrinkles dryness, redness, inflammation, age spots and can even general dullness. If you are looking to replenish the building blocks which lead to long-lasting, healthy-looking skin then a Hydrafacial could be exactly the ticket.`
        }
    ]

    return (
        <section className="w-full bg-white shadow-lg rounded-lg overflow-hidden py-[100px]">
            <div className="max-w-[1170px] flex mx-auto relative">
                <div className="w-full relative min-h flex">
                    <div className="px-[15px] flex relative w-full flex-wrap content-start">
                        <div className="w-full relative max-w-[750px] mx-auto">
                            {faqData.map((faq) => (
                                <div key={faq.id} className="border-y border-gray-200 overflow-hidden">
                                    <button
                                        className="w-full py-[17px] text-left transition-colors duration-200 flex justify-between items-center"
                                        onClick={() => togglePanel(faq.id)}
                                        aria-expanded={openPanel === faq.id}
                                        aria-controls={`panel-${faq.id}`}
                                    >
                                        <span className="font-semibold text-gray-800">
                                            {faq.title}
                                        </span>
                                        {
                                            openPanel ?
                                                <CloseOutlined
                                                    className={`w-5 h-5 text-gray-600 transform transition-transform duration-200`}
                                                />
                                                :
                                                <PlusOutlined
                                                    className={`w-5 h-5 text-gray-600 transform transition-transform duration-200`}
                                                />
                                        }
                                    </button>
                                    <div
                                        id={`panel-${faq.id}`}
                                        className={`transition-all duration-300 ease-in-out ${openPanel === faq.id
                                            ? 'max-h-96 opacity-100'
                                            : 'max-h-0 opacity-0 overflow-hidden'
                                            }`}
                                    >
                                        <div className="py-3 bg-white">
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                                {faq.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FAQSection