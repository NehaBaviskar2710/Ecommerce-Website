import React from 'react'
import "./footernew.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";



export default function FooterNew() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScrollButtonVisibility = () =>{
      window.pageYOffset > 300 ? setShowButton(true) : setShowButton(false);
    };
    window.addEventListener('scroll',handleScrollButtonVisibility);
    return() => {
      window.removeEventListener('scroll', handleScrollButtonVisibility)
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
        <footer class="footer-area footer--light">
  <div class="footer-big">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sm-12">
          <div class="footer-widget">
            <div class="widget-about">
              <img src="https://giveasmile.frappe.cloud/files/Kalakriti.png"
                    style={{ height: '80px', width: '150px' }} alt="" class="img-fluid"/>
              <p>Kalakriti is inspired by a generation that is highly connected with its roots. Hence, we have crafted this platform that connects you to the artisans of India and showcases their work by providing you with the best handicraft items online.</p>
              <ul class="contact-details">
                <li>
                  <span class="icon-earphones"></span> Call Us : 
                  <a href="tel:344-755-111">344-755-111</a>
                </li>
                <li>
                  <span class="icon-envelope-open"></span>
                  <a href="mailto:support@aazztech.com">support@kalakriti.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-4">
          <div class="footer-widget">
            <div class="footer-menu footer-menu--1">
              <h4 class="footer-widget-title">Popular Category</h4>
              <ul>
                <li>
                  <a href="/dining/serveware/dinner_sets">Dinner Sets</a>
                </li>
                <li>
                  <a href="/dining/serveware/serving_trays">Serving Trays</a>
                </li>
                <li>
                  <a href="/dining/cutlery/serving_sets">Serving Sets</a>
                </li>
                <li>
                  <a href="/garden/pots_and_planters/hanging_planters">Hanging Planters</a>
                </li>
                <li>
                  <a href="/decor/wall_decor/name_plates">Name Plates</a>
                </li>
                <li>
                  <a href="/decor/showpieces_and_idols/showpieces">Showpieces</a>
                </li>
                <li>
                  <a href="/lighting/lamps/aroma_diffusers">Aroma Diffusers</a>
                </li>
                <li>
                  <a href="/lighting/lamps/wall_lamps">Wall Lamps</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-md-3 col-sm-4">
          <div class="footer-widget">
            <div class="footer-menu">
              <h4 class="footer-widget-title">Our Company</h4>
              <ul>
                <li>
                  <a href="/about">About Us</a>
                </li>
                {/* <li>
                  <a href="#">Start Selling your own product</a>
                </li> */}
                <li>
                <Link to="/contact" onClick={handleScrollToTop}> Contact Us </Link>
                </li>
                <li>
                  <a href="/bulkorders">Bulk Orders</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-md-3 col-sm-4">
          <div class="footer-widget">
            <div class="footer-menu no-padding">
              <h4 class="footer-widget-title">Follow Us</h4>
              <div className='row container d-flex'>
                <div className='col-3'>
                <a href="https://www.facebook.com"><i class="bi bi-facebook iconic fa-2x"></i></a>
                </div>
                <div className='col-3'>
                <a href="https://twitter.com/"><i class="bi bi-twitter iconic fa-2x"></i></a>
                </div>
                <div className='col-3'>
                <a href="https://www.instagram.com/"><i class="bi bi-instagram iconic fa-2x"></i></a>
                </div>
                <div className='col-3'>
                <a href="https://www.telegram.com/"><i class="bi bi-telegram iconic fa-2x"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div class="mini-footer">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="copyright-text">
            <p>© 2023. All rights reserved. Created by 
              <a href="#">Kalakriti</a>
            </p>
          </div>
          {showButton && (
            <div class="go_top" onClick={handleScrollToTop}>
            <span class="icon-arrow-up"><i class="bi bi-arrow-up"></i></span>
          </div>
          )}
          
        </div>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}