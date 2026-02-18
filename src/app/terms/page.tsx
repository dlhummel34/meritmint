import React from 'react';

export default function TermsOfService() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-merit-paper text-merit-charcoal">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="font-serif text-4xl md:text-5xl text-merit-gold mb-8">Terms of Service</h1>

                <div className="prose prose-merit max-w-none space-y-6 font-sans text-merit-charcoal/80">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="font-serif text-2xl text-merit-charcoal mt-8 mb-4">1. Agreement to Terms</h2>
                        <p>
                            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and MeritMint ("we," "us," or "our"),
                            concerning your access to and use of the MeritMint website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-merit-charcoal mt-8 mb-4">2. Intellectual Property Rights</h2>
                        <p>
                            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-merit-charcoal mt-8 mb-4">3. Products</h2>
                        <p>
                            We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-merit-charcoal mt-8 mb-4">4. Purchases and Payment</h2>
                        <p>
                            We accept the following forms of payment: Visa, Mastercard, American Express, Discover. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-merit-charcoal mt-8 mb-4">5. Return Policy</h2>
                        <p>
                            Due to the custom nature of our products, all sales are final. However, if there is a defect with your order, please contact us immediately so we can resolve the issue.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-merit-charcoal mt-8 mb-4">6. Contact Us</h2>
                        <p>
                            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: david@meritmint.news
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
