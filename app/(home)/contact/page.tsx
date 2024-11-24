import { Metadata } from "next";

import { ContactForm } from "./_components/contact-form";

export const metadata: Metadata = {
    title: "APBn Scouts | Contact",
    description: "Apbn scouts group",
};

const Contact = () => {
    return (
        <div className="py-4 md:py-16 w-full max-w-screen-xl mx-auto">
            <ContactForm />
            <section className="py-16 px-4 md:px-8 lg:px-12 bg-muted">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">Visit Us</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Our Address</h3>
                            <p className="text-lg text-muted-foreground">
                                123 Main Street
                                <br />
                                Motijheel, Dhaka
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Contact Info</h3>
                            <p className="text-lg text-muted-foreground">
                                Phone: (123) 456-7890
                                <br />
                                Email: apbnscouts@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact;