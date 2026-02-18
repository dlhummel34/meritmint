import React from 'react';

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-merit-paper text-merit-charcoal">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="font-serif text-4xl md:text-5xl text-merit-gold mb-8">Privacy Policy</h1>

                <div className="prose prose-merit max-w-none space-y-6 font-sans text-merit-charcoal/80">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="font-serif text-2xl text-merit-charcoal mt-8 mb-4">1. Introduction</h2>
                        <p>
                            MeritMint ("we," "our," or "us") respects your privacy and is committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit our website
                            (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-merit-charcoal mt-8 mb-4">2. The Data We Collect</h2>
                        <p>
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-merit-charcoal mt-8 mb-4">3. How We Use Your Data</h2>
                        <p>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-merit-charcoal mt-8 mb-4">4. Data Security</h2>
                        <p>
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl text-merit-charcoal mt-8 mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about this privacy policy or our privacy practices, please contact us at: david@meritmint.news
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
