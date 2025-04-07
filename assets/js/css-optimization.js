/**
 * CSS Minification and Optimization Script
 * For Training Club Website
 * Created: April 7, 2025
 */

// This script would typically run as part of a build process
// For demonstration purposes, we're including the logic here

/**
 * Minify CSS by removing whitespace, comments, and unnecessary characters
 * @param {string} css - The CSS content to minify
 * @returns {string} - Minified CSS
 */
function minifyCSS(css) {
    if (!css) return '';
    
    return css
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove whitespace around symbols
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:;,])\s*/g, '$1')
        .replace(/\s*;\s*}/g, '}')
        // Remove trailing semicolons
        .replace(/;\}/g, '}')
        // Remove unnecessary zeros
        .replace(/(^|[^0-9])0+([1-9])/g, '$1$2')
        .replace(/([^0-9])0+(\.[0-9])/g, '$1$2')
        // Convert rgb to hex where possible
        .replace(/rgb\(([0-9]+),([0-9]+),([0-9]+)\)/g, function(match, r, g, b) {
            return '#' + 
                   parseInt(r).toString(16).padStart(2, '0') + 
                   parseInt(g).toString(16).padStart(2, '0') + 
                   parseInt(b).toString(16).padStart(2, '0');
        })
        // Trim leading and trailing whitespace
        .trim();
}

/**
 * Combine multiple CSS files into one
 * @param {Array} files - Array of file paths to combine
 * @returns {Promise<string>} - Promise that resolves to combined CSS content
 */
function combineCSS(files) {
    // In a real implementation, this would use file system operations
    // For demonstration, we'll assume the files are already loaded
    return Promise.resolve(files.join('\n'));
}

/**
 * Extract critical CSS for above-the-fold content
 * @param {string} css - Full CSS content
 * @param {Array} criticalSelectors - Array of critical selectors
 * @returns {string} - Critical CSS content
 */
function extractCriticalCSS(css, criticalSelectors) {
    if (!css || !criticalSelectors || !criticalSelectors.length) return '';
    
    // Simple implementation - in production would use a proper CSS parser
    let criticalCSS = '';
    const cssRules = css.match(/[^{]+{[^}]+}/g) || [];
    
    cssRules.forEach(rule => {
        const selector = rule.match(/[^{]+/)[0].trim();
        
        // Check if this selector is in our critical selectors list
        if (criticalSelectors.some(criticalSelector => 
            selector.includes(criticalSelector))) {
            criticalCSS += rule + '\n';
        }
    });
    
    return criticalCSS;
}

/**
 * Optimize CSS by removing unused selectors
 * @param {string} css - CSS content to optimize
 * @param {Array} usedSelectors - Array of selectors that are actually used
 * @returns {string} - Optimized CSS
 */
function removeUnusedCSS(css, usedSelectors) {
    if (!css || !usedSelectors || !usedSelectors.length) return css;
    
    // Simple implementation - in production would use a proper CSS parser
    let optimizedCSS = '';
    const cssRules = css.match(/[^{]+{[^}]+}/g) || [];
    
    cssRules.forEach(rule => {
        const selector = rule.match(/[^{]+/)[0].trim();
        
        // Check if this selector is used
        if (usedSelectors.some(usedSelector => 
            selector.includes(usedSelector))) {
            optimizedCSS += rule + '\n';
        }
    });
    
    return optimizedCSS;
}

/**
 * Inline critical CSS directly into HTML
 * @param {string} html - HTML content
 * @param {string} criticalCSS - Critical CSS to inline
 * @returns {string} - HTML with inlined critical CSS
 */
function inlineCriticalCSS(html, criticalCSS) {
    if (!html || !criticalCSS) return html;
    
    // Create style tag with critical CSS
    const styleTag = `<style id="critical-css">${criticalCSS}</style>`;
    
    // Insert after head tag
    return html.replace(/<head>/, `<head>\n${styleTag}`);
}

// Export functions for use in build scripts
module.exports = {
    minify: minifyCSS,
    combine: combineCSS,
    extractCritical: extractCriticalCSS,
    removeUnused: removeUnusedCSS,
    inlineCritical: inlineCriticalCSS
};

// Example usage in a build process:
/*
const fs = require('fs');
const path = require('path');
const cssOptimizer = require('./css-optimization');

// Read CSS files
const mainCSS = fs.readFileSync(path.join(__dirname, 'assets/css/style.css'), 'utf8');
const darkModeCSS = fs.readFileSync(path.join(__dirname, 'assets/css/dark-mode.css'), 'utf8');

// Combine CSS files
const combinedCSS = mainCSS + '\n' + darkModeCSS;

// Minify CSS
const minifiedCSS = cssOptimizer.minify(combinedCSS);

// Write minified CSS to file
fs.writeFileSync(path.join(__dirname, 'assets/css/style.min.css'), minifiedCSS);

// Extract critical CSS
const criticalSelectors = ['.header', '.hero', '.nav', '.cta-button'];
const criticalCSS = cssOptimizer.extractCritical(combinedCSS, criticalSelectors);

// Read HTML file
const htmlFile = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Inline critical CSS
const htmlWithCriticalCSS = cssOptimizer.inlineCritical(htmlFile, criticalCSS);

// Write HTML with inlined critical CSS
fs.writeFileSync(path.join(__dirname, 'index.html'), htmlWithCriticalCSS);
*/
