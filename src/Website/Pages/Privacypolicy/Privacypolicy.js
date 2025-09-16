// PrivacyPolicy.jsx
import React from "react";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PrivacyPolicy.css"; // Import custom styles

const PrivacyPolicy = () => {
    return (
        <>
            <Navbar />

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-11 col-12">

                        {/* Page Title */}
                        <h1 className="text-center mb-3 fw-bold custom-heading-main">Privacy Policy</h1>
                       
                        {/* 1. Introduction */}
                        <section className="mb-4">
                            <h2 className="h4 custom-heading">1. Introduction</h2>
                            <p className="text-secondary">
                                Welcome to <strong>New Friends Jewellers</strong>. We are committed to protecting
                                your personal information and your right to privacy. This Privacy
                                Policy explains how we collect, use, and safeguard your information
                                when you visit our website{" "}
                                <a
                                    href="https://newfriendsjewellers.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none custom-link fw-semibold"
                                >
                                    https://newfriendsjewellers.com/
                                </a>{" "}
                                or use our services.
                            </p>
                        </section>

                        {/* 2. Information We Collect */}
                        <section className="mb-4">
                            <h2 className="h4 custom-heading">2. Information We Collect</h2>
                            <ul className="list-unstyled ps-3">
                                <li className="mb-2">• <strong>Personal Information:</strong> Name, email, phone number, etc.</li>
                                <li className="mb-2">• <strong>Usage Data:</strong> IP address, browser type, pages visited, etc.</li>
                                <li className="mb-2">• <strong>Cookies & Tracking:</strong> Information collected via cookies or similar technologies.</li>
                            </ul>
                        </section>

                        {/* 3. How We Use Your Information */}
                        <section className="mb-4">
                            <h2 className="h4 custom-heading">3. How We Use Your Information</h2>
                            <ul className="list-unstyled ps-3">
                                <li className="mb-2">• To provide, maintain, and improve our services.</li>
                                <li className="mb-2">• To communicate with you regarding updates, offers, or promotions.</li>
                                <li className="mb-2">• To analyze usage patterns and enhance user experience.</li>
                                <li className="mb-2">• To comply with legal and regulatory obligations.</li>
                            </ul>
                        </section>

                        {/* 4. Sharing Your Information */}
                        <section className="mb-4">
                            <h2 className="h4 custom-heading">4. Sharing Your Information</h2>
                            <p className="text-secondary">
                                We do not sell or rent your personal information to third parties.
                                However, we may share information with:
                            </p>
                            <ul className="list-unstyled ps-3">
                                <li className="mb-2">• Trusted service providers that help us operate our services.</li>
                                <li className="mb-2">• Law enforcement or legal authorities when required by law.</li>
                                <li className="mb-2">• Business partners in case of mergers, acquisitions, or similar events.</li>
                            </ul>
                        </section>

                        {/* 5. Your Privacy Rights */}
                        <section className="mb-4">
                            <h2 className="h4 custom-heading">5. Your Privacy Rights</h2>
                            <p className="text-secondary">
                                Depending on your local laws, you may have rights to access, update, or
                                delete your personal information. To exercise these rights, please
                                contact us at{" "}
                                <a
                                    href="mailto:friendsjewelleryldk@gmail.com"
                                    className="text-decoration-none custom-link fw-semibold"
                                >
                                    friendsjewelleryldk@gmail.com
                                </a>.
                            </p>
                        </section>

                        {/* 6. Security */}
                        <section className="mb-4">
                            <h2 className="h4 custom-heading">6. Security</h2>
                            <p className="text-secondary">
                                We implement reasonable technical and organizational measures to
                                safeguard your data. However, please note that no method of
                                transmission or storage over the internet is 100% secure.
                            </p>
                        </section>

                        {/* 7. Changes to This Policy */}
                        <section className="mb-4">
                            <h2 className="h4 custom-heading">7. Changes to This Policy</h2>
                            <p className="text-secondary">
                                We may update this Privacy Policy from time to time. Any changes will
                                be posted on this page with the updated effective date.
                            </p>
                        </section>

                        {/* 8. Contact Us */}
                        <section>
                            <h2 className="h4 custom-heading">8. Contact Us</h2>
                            <p className="text-secondary">
                                If you have questions about this Privacy Policy, please contact us:
                            </p>

                            <div className="bg-light p-3 rounded border">
                                {/* Company Name */}
                                <p className="mb-1">
                                    <strong>New Friends Jewellers</strong>
                                </p>

                                {/* Email */}
                                <p className="mb-1">
                                    <strong>Email:</strong>{" "}
                                    <a
                                        href="mailto:friendsjewelleryldk@gmail.com"
                                        className="text-decoration-none custom-link fw-semibold"
                                    >
                                        friendsjewelleryldk@gmail.com
                                    </a>
                                </p>

                                {/* Website */}
                                <p className="mb-3">
                                    <strong>Website:</strong>{" "}
                                    <a
                                        href="https://newfriendsjewellers.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none custom-link fw-semibold"
                                    >
                                        https://newfriendsjewellers.com/
                                    </a>
                                </p>

                                {/* Address */}
                                <p className="mb-0">
                                    <strong>Address:</strong> SHOP NO. F2, SKITCHAN NGODUP COMPLEX, NEAR OLD BUS STAND,
                                    LEH, Ladakh, 194101
                                </p>
                            </div>
                        </section>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default PrivacyPolicy;
