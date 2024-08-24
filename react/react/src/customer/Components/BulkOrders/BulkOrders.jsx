import React from "react";
import "./bulkorders.css";
import "font-awesome/css/font-awesome.min.css";

export default function BulkOrders() {
  return (
    <>
      <div>
        <img
          style={{ width: "100%" }}
          src="https://cdn.shopify.com/s/files/1/0030/9759/1872/t/122/assets/b2b-banners-1655297769505.png?v=1655297780"
          alt=""
        />
      </div>
      <h1 style={{ marginTop: "60px" }}>
        Sometimes, good things come in large packages
      </h1>
      <div className="AskContainer1">
        <div
          style={{
            display: "flex",
            height: "100px",
            width: "50%"
          }}
        >
          <img
            style={{ height: "150px" }}
            src="data:image/jpeg;base64,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"
            alt=""
          />
          <div
            style={{
              marginTop: "10px"
            }}
          >
            <h1>Exclusive Pricing</h1>
            <p>
              7 years of experience in international shipping, standardized
              bubble wrapping & cardboard spacing.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: "100px",
            width: "50%",
            justifyContent: "space-between"
          }}
        >
          <img
            style={{ height: "150px" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbbHjT5dwgO7d1mDH5kbRZBN8ivBOvvFHGLQ&usqp=CAU"
            alt=""
          />
          <div
            style={{
              marginTop: "10px"
            }}
          >
            <h1>Speedy Response Delivery</h1>
            <p>
              Get on-time doorstep delivery from best-in-class courier partners
            </p>
          </div>
        </div>
      </div>

      <div className="AskContainer1">
        <div
          style={{
            display: "flex",
            height: "100px",
            width: "50%"
          }}
        >
          <img
            style={{ height: "150px" }}
            src="data:image/png;base64,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"
            alt=""
          />
          <div
            style={{
              marginTop: "10px"
            }}
          >
            <h1>Big Warehouse Facility</h1>
            <p>
              Enjoy exclusive discounts and incentives, designed especially for
              you.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: "100px",
            width: "50%",
            justifyContent: "space-between"
          }}
        >
          <img
            style={{ height: "150px" }}
            src="https://media.istockphoto.com/id/1369899988/vector/handshake-sign-in-the-circle-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=auA4GuM2p-EmKmEgcFjIOUibPiXsuvTxfvRKB-EN7o8="
            alt=""
          />
          <div
            style={{
              marginTop: "10px"
            }}
          >
            <h1>Quality you can trust</h1>
            <p>
              Our products undergo checks to ensure that you enjoy best-in-class
              quality.
            </p>
          </div>
        </div>
      </div>

      <h1 style={{ marginTop: "50px" }}>Frequently Asked Questions</h1>

      <h2 style={{ marginTop: "50px" }}>Is there a minimum order limit?</h2>
      <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "21x" }}>
        Yes, you need to have a minimum cart value of Rs.25000 for the wholesale
        discount to be applicable. You will get a flat discount of 35% on
        purchase of Rs.25000 or more
      </p>

      <h2 style={{ marginTop: "50px" }}>Can I get a GST Invoice?</h2>
      <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "21x" }}>
        Yes, we will provide you with a GST Tax invoice on your registered GST
        number and company name, in case you need more information on this,
        please write to us a care@exclusivelane.com
      </p>

      <h2 style={{ marginTop: "50px" }}>
        I don’t have a GST Registration yet. Can I still be make a bulk
        purchase?{" "}
      </h2>
      <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "21x" }}>
        There is no restriction as such for this and you can place a bulk order
        with us. However, as per government guidelines, a business whose
        aggregate turnover in a financial year exceeds Rs 20 lakhs has to
        mandatorily register under Goods and Services Tax. This limit is set at
        Rs 10 lakhs for North Eastern and hilly states flagged as special
        category states. We would advise you to please consult a professional
        tax consultant.
      </p>

      <h2 style={{ marginTop: "50px" }}>Can I sell on Online Marketplaces?</h2>
      <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "21x" }}>
        No. Any online marketplace would require you to have a Brand
        Authorization in order to sell any brand on that particular online
        marketplace. You are authorised to resell ExclusiveLane products
        anywhere other than online marketplaces. You are however free to create
        your own websites, retail stores, partner with retail stores, wholesale,
        Facebook groups/pages.
      </p>

      <h2 style={{ marginTop: "50px" }}>What commission or markup do I get?</h2>
      <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "21x" }}>
        We offer a best prices on our products which gives you an opportunity to
        buy at extremely competitive rates and sell them to customers while
        making a good profit.
      </p>

      <h2 style={{ marginTop: "50px" }}>
        What if the items I purchased don’t sell. Can I return them against
        Money back?
      </h2>
      <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "21x" }}>
        What if the items I purchased don’t sell. Can I return them against
        Money back?
      </p>

      <hr />

      <h1>The World Of Wholesale Indian Handicrafts</h1>
      <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "21x" }}>
        During this covid situation, many people have lost their job and source
        of income. The case has been hard on all of us. But, if there is a
        problem, there is undoubtedly a solution. Retailing business is once
        again booming in India, and if you are sitting idle at home, you should
        consider getting yourself enrolled in the retailing industry.
      </p>
      <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "21x" }}>
        Before doing that, you have to decide what type of business you want to
        get into. Honestly, everybody wants to get into the garments retailing
        business, but it has become too mainstream over the years. Every other
        person you know is getting into the garments retailing business. So, the
        scope has been hampered. A good market now to get into is the
        handicrafts market. It has been growing for the last few years, and now
        is an excellent time to get into it. ExclusiveLane is one of the topmost
        wholesale handicrafts stores. It has a fantastic collection of Indian
        handicrafts wholesale and has been verified as an integral handicrafts
        wholesaler.
      </p>

      <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "21x" }}>
        You should consider getting yourself enrolled in ExclusiveLane as a
        retailer. But, if you don’t want to get into the business and want to
        buy for your family, you can do so! You can purchase wholesale
        handicrafts. ExclusiveLane has a fantastic collection of Indian
        handicrafts that will fascinate you and make you fall in love. It is the
        only destination for buying beautiful Indian handicrafts wholesale.
      </p>

      <h1>Get The Best Wholesale Handicrafts With ExclusiveLane</h1>
      <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "21x" }}>
        ExclusiveLane has the best wholesale handicrafts. They never compromise
        on quality, and they get the products from the superbly talented
        artisans of India. You will get the best handicrafts India wholesale
        online shopping from the best wholesaler online for handicraft India.
        Their beautiful collection has several items that include wall decor,
        vases, home decor, kitchen storages, and many more things that will make
        you fall in love.
      </p>

      <h1>Why Choose ExclusiveLane?</h1>
      <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "21x" }}>
        They have seven years of experience, and they have been established as
        the best. The process here is speedy, and you get a quick response and
        fast delivery. There are exclusive discounts and incentives especially
        for you. ExclusiveLane cares for you and tries to provide only the best
        to you.
      </p>

      <p style={{ fontSize: "22px", textAlign: "left", marginLeft: "21x" }}>
        What are you waiting for? Visit the website today!
      </p>
    </>
  );
}
