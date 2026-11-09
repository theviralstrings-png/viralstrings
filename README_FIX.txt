VIRALSTRINGS HOMEPAGE LOADING FIX

This package fixes the homepage-specific loading problem by removing the script that hid the whole page until all resources completed, and by embedding the header/footer instead of loading them asynchronously with jQuery AJAX.

For Netlify: upload/deploy the contents of this ZIP with index.html at the publish root (not a nested folder). This is a static-site package.

Note: this fixes the homepage loading behavior; it is not a full site redesign or a guarantee that every third-party service/form works.
