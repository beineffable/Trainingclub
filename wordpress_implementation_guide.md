# Ineffable Training Club - WordPress Implementation Guide

## Overview

This document provides instructions for implementing the Ineffable Training Club website design and functionality in a WordPress environment. The static HTML/CSS templates have been created and tested, and now need to be converted into a WordPress theme with the required plugins for membership functionality.

## Required Components

### WordPress Core
- WordPress 6.0 or higher
- PHP 7.4 or higher
- MySQL 5.7 or higher

### Required Plugins
1. **MemberPress** - For membership management, access codes, and credit system
   - License: Commercial ($149-$399/year)
   - Features needed: Custom registration fields, membership levels, payment gateway integration

2. **WooCommerce** - For handling payments and credit packages
   - License: Free (with paid extensions)
   - Extensions needed: Subscriptions ($199/year) for recurring memberships

3. **Bookly Pro** - For session booking and management
   - License: Commercial ($89)
   - Add-ons needed: Custom Fields, Special Days, Special Hours

4. **Advanced Custom Fields Pro** - For custom content management
   - License: Commercial ($49/year)
   - Features needed: Repeater fields, flexible content fields

5. **Yoast SEO** - For search engine optimization
   - License: Free (Premium version optional)

## Implementation Steps

### 1. WordPress Installation

1. Set up a new WordPress installation on your hosting provider
2. Create a MySQL database with the credentials specified in the wp-config.php file
3. Upload WordPress files to your server
4. Run the WordPress installation process
5. Install and activate all required plugins

### 2. Theme Implementation

1. Create a new theme folder in wp-content/themes/ named "ineffable"
2. Copy the CSS files from assets/css/ to the theme folder
3. Copy the JavaScript files from assets/js/ to the theme folder
4. Create the following WordPress template files based on the HTML templates:
   - header.php (from the header section of all HTML files)
   - footer.php (from the footer section of all HTML files)
   - front-page.php (from index.html)
   - page-members.php (from members-area.html)
   - page-access-code.php (from access-code.html)
   - functions.php (for theme setup and customization)
   - style.css (theme information and main stylesheet)

5. Convert static HTML to WordPress template tags:
   - Replace static navigation with `wp_nav_menu()`
   - Replace static content with `the_content()` and custom fields
   - Set up widget areas for dynamic content sections

### 3. MemberPress Configuration

1. Create membership levels:
   - Standard Membership (100 CHF access fee)
   - Elite Membership (0 CHF access fee)

2. Set up pricing options:
   - Per session rates (Standard: 35 CHF, Elite: 30 CHF)
   - 10-Session Package (Standard: 330 CHF, Elite: 285 CHF)
   - 20-Session Package (Standard: 630 CHF, Elite: 540 CHF)
   - Monthly Memberships (Standard: 150 CHF, Elite: 120 CHF)
   - Unlimited Memberships (Standard: 450 CHF, Elite: 380 CHF)

3. Configure access rules:
   - Restrict members-only content to active members
   - Set up different access levels for Standard vs Elite members

4. Custom development for access code system:
   - Create custom database table for access codes
   - Develop code generation and validation system
   - Integrate with registration process

### 4. Booking System Implementation

1. Configure Bookly Pro:
   - Set up services (training sessions)
   - Configure staff members (trainers)
   - Set up locations (Knonau, etc.)
   - Define working hours and session times

2. Integrate with MemberPress:
   - Connect booking system to membership levels
   - Implement credit deduction for bookings
   - Set up waitlist functionality

3. Custom development for credit management:
   - Track credit usage and expiration
   - Implement holiday flexibility features
   - Set up automatic notifications for low credits

### 5. Referral System Implementation

1. Create custom referral tracking system:
   - Develop code request functionality
   - Track successful referrals
   - Implement reward system

2. Integrate with user accounts:
   - Display referral history in user dashboard
   - Show available code requests
   - Track code usage statistics

### 6. Content Migration

1. Set up all pages with proper templates:
   - Homepage
   - Training Model
   - Membership
   - Calendar
   - Corporate Training
   - Contact
   - Members Area
   - Access Code Entry

2. Configure menus:
   - Main navigation
   - Footer links
   - Member dashboard navigation

3. Upload all media:
   - Logo and brand assets
   - Training images
   - Testimonial photos
   - Equipment gallery

## Testing Checklist

Before launching the website, verify the following:

1. **Membership System**
   - Registration process works with access codes
   - Different pricing tiers apply correctly
   - Members can log in and access restricted content

2. **Booking System**
   - Sessions can be booked using credits
   - Cancellation policy works as expected
   - Waitlist functionality operates correctly

3. **Credit Management**
   - Credits are deducted for bookings
   - Credit packages can be purchased
   - Expiration dates are tracked correctly

4. **Referral System**
   - Members can request access codes
   - Successful referrals are tracked
   - Rewards are applied automatically

5. **Responsive Design**
   - Website displays correctly on mobile, tablet, and desktop
   - All interactive elements work on touch devices
   - Forms submit correctly on all devices

## Deployment Checklist

Before going live:

1. **Security**
   - Install SSL certificate
   - Configure secure payment processing
   - Set up regular backups

2. **Performance**
   - Enable caching
   - Optimize images
   - Minify CSS and JavaScript

3. **SEO**
   - Configure Yoast SEO settings
   - Set up XML sitemap
   - Verify meta descriptions and titles

4. **Analytics**
   - Set up Google Analytics
   - Configure conversion tracking
   - Set up event tracking for key actions

## Maintenance Recommendations

To keep the website running smoothly:

1. **Regular Updates**
   - WordPress core updates
   - Plugin updates
   - Theme updates

2. **Content Refreshes**
   - Update training calendar each term
   - Refresh testimonials periodically
   - Add new transformation stories

3. **Security Monitoring**
   - Regular security scans
   - Malware monitoring
   - User access audits

4. **Performance Optimization**
   - Database cleanup
   - Image optimization
   - Cache management

## Support Resources

For ongoing support and development:

1. **WordPress Documentation**
   - [WordPress Codex](https://codex.wordpress.org/)
   - [WordPress Developer Resources](https://developer.wordpress.org/)

2. **Plugin Documentation**
   - [MemberPress Documentation](https://memberpress.com/docs/)
   - [WooCommerce Documentation](https://docs.woocommerce.com/)
   - [Bookly Documentation](https://support.booking-wp-plugin.com/)

3. **Custom Code Documentation**
   - Access code system implementation details
   - Credit management system architecture
   - Referral tracking system specifications
