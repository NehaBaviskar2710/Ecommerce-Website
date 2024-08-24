import React from 'react';
import "./About.css"
function About() {
   const teamMembers = [
    {
      name: 'Roshani Shirsat',
      designation: 'Co-Founder',
      imageSrc: './images/avatars/4.png',
      
    },
    {
        name: 'Prathmesh Shete',
        designation: 'Co-Founder',
        imageSrc: './images/avatars/5.png',
        
      },
      {
        name: 'Pavan Patil',
        designation: 'Co-Founder',
        imageSrc: './images/avatars/3.png',
       
      },
  
  ];
  const teamMember = [
   
      {
        name: 'Prajakta Nemade',
        designation: 'Co-Founder',
        imageSrc: './images/avatars/8.png',
       
      },
      {
        name: 'Sanket Musale',
        designation: 'Co-Founder',
        imageSrc: './images/avatars/2.png',
       
      },
      {
        name: 'Ajay Sonavane',
        designation: 'Co-Founder',
        imageSrc: './images/avatars/1.png',
        
      },
  
  ];



    return (
        <section >
            <div className="row">
                <div className="container mt-5" >
            <video controls className="w-100">
        <source src="./videos/Flipkart-about-us-Part-3.mp4" type="video/mp4" />
        </video>
        </div>
        
                <h1 className="container mt-4">What Got Us Started?</h1>
                <div className="container mt-4">
                    <p style={{ fontSize: '24px' }}>
                    Started Kalakriti with a vision to promote crafts globally & help small artisans based in different parts of the World earn a living out of it. We work with 100 plus creative artisans & designers across India & help them in developing the end product, right from the ideation phase. Each product is uniquely handcrafted & hand painted with miniature details by skilled craftsmen. We have products across multiple categories like Home & Decor, Lighting, Kitchen & Dining, Furniture & Furnishing, made in different materials like terracotta, Teak & Sheesham wood, ceramic, Brass, Canvas etc.</p>
                    <br />
                    <hr></hr>
                    <br />
                    <h1>Our Mission</h1>
                    <p style={{ fontSize: '24px' }}>We are on a mission to:</p>
                    <p style={{ fontSize: '24px' }}>a. Design & Co-create functional products with craftsmen from different parts of India & the World by fusing multiple art forms & materials for urban market & consumers.</p>
                    <p style={{ fontSize: '24px' }}>b. Provide a better livelihood & lifestyle to the craftsmen & their families by creating a sustainable & a long-term business model for them.</p>
                    <p style={{ fontSize: '24px' }}>c. Preserving the pride of India; the traditional art forms, techniques & skill set of the artisans inherited from the ancestors which are depleting day by day due to non-functional product design, competition from China & low sales of handicrafts.</p>
                    <br />
                    <hr></hr>
                    <br />
                    <h1>Our Vision</h1>
                    <p style={{ fontSize: '24px' }}>Our vision is to create a global brand from India which is synonymous with craft.</p>
                    <br />
                    <hr></hr>
                    <br />
                    
          <p className="col-12 d-flex justify-content-center align-items-center">Kalakriti- OUR TEAM</p>
         
         <br />
        <hr></hr>
        <div className="container-xx1 py-3">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">Instructors</h6>
          <h4 className="col-12 d-flex justify-content-center align-items-center" style={{color:"#9155FD"}}>The people that</h4>
        <h2 className="col-12 d-flex justify-content-center align-items-center">Made us possible</h2>
        
        </div>
        <div className="row g-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`0.${index + 1}s`}>
              <div className="team-item bg-light">
                <div className="overflow-hidden">
                  <img className="img-fluid px-5" src={member.imageSrc} alt={member.name} />
                </div>
                <div className="position-relative d-flex justify-content-center  pt-2 px-1" style={{ marginTop: '-23px' }}>
                 
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">{member.name}</h5>
                  <small>{member.designation}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="container-xxl py-5">
      <div className="container">
        
        <div className="row g-4">
          {teamMember.map((member, index) => (
            <div key={index} className="col-lg-4 col-md-5 wow fadeInUp" data-wow-delay={`0.${index + 1}s`}>
              <div className="team-item bg-light">
                <div className="overflow-hidden">
                  <img className="img-fluid px-5" src={member.imageSrc} alt={member.name} />
                </div>
                <div className="position-relative d-flex justify-content-center  pt-2 px-1" style={{ marginTop: '-23px' }}>
                 
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">{member.name}</h5>
                  <small>{member.designation}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
        <hr></hr>
        <br />

        <h2 className="col-12 d-flex justify-content-center align-items-center">Thankyou for Visiting Us !</h2>
                    
                    
                </div>
            </div>
           
        </section>
        
    );
}

export default About;