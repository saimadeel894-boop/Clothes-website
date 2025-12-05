import React from 'react';

interface LegalPageProps {
  type: 'shipping' | 'terms' | 'privacy';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const content = {
    shipping: {
      title: "Shipping Policy",
      body: (
        <>
          <p>At AhmedHub, we are committed to delivering your order accurately, in good condition, and always on time.</p>
          <h3>Processing Time</h3>
          <p>All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.</p>
          <h3>Shipping Rates & Delivery Estimates</h3>
          <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
          <ul className="list-disc pl-5 my-4">
             <li>Standard Shipping (15-30 business days): Free</li>
             <li>Express Shipping (7-15 business days): $15.00</li>
          </ul>
          <h3>International Shipping</h3>
          <p>We ship worldwide. Please note that custom duties and taxes may apply upon arrival in your country and are the responsibility of the customer.</p>
        </>
      )
    },
    terms: {
      title: "Terms & Conditions",
      body: (
        <>
          <p>Welcome to AhmedHub. These terms and conditions outline the rules and regulations for the use of AhmedHub's Website.</p>
          <h3>Cookies</h3>
          <p>We employ the use of cookies. By accessing AhmedHub, you agreed to use cookies in agreement with the AhmedHub's Privacy Policy.</p>
          <h3>License</h3>
          <p>Unless otherwise stated, AhmedHub and/or its licensors own the intellectual property rights for all material on AhmedHub. All intellectual property rights are reserved.</p>
          <h3>User Comments</h3>
          <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. AhmedHub does not filter, edit, publish or review Comments prior to their presence on the website.</p>
        </>
      )
    },
    privacy: {
      title: "Privacy Policy",
      body: (
        <>
          <p>Your privacy is important to us. It is AhmedHub's policy to respect your privacy regarding any information we may collect from you across our website.</p>
          <h3>Information We Collect</h3>
          <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
          <h3>Data Retention</h3>
          <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft.</p>
          <h3>Sharing</h3>
          <p>We don't share any personally identifying information publicly or with third-parties, except when required to by law.</p>
        </>
      )
    }
  };

  const current = content[type];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 border-b pb-4">{current.title}</h1>
      <div className="prose prose-slate max-w-none">
        {current.body}
      </div>
    </div>
  );
};