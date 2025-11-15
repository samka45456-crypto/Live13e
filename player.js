async function initPlayer() {
    // ... (your existing player setup code) ...
    const player = new shaka.Player(video);
    const ui = new shaka.ui.Overlay(player, playerContainer, video);

    // 🔥 ADD THIS SECTION - IT IS THE FIX FOR 1001 ERROR
    player.getNetworkingEngine().registerRequestFilter(function(type, request) {
        const uri = request.uris[0];
        if (uri.includes('jiotvpllive.cdn.jio.com')) {
            // This tells the browser to send cookies with the request
            request.allowCrossSiteCredentials = true;
        }
    });
    // 🔥 END OF FIX

    // ... (your existing player.configure code for ClearKey) ...
    player.configure({
        'drm': {
            'clearKeys': CLEAR_KEYS
        }
        // ... other configurations
    });

    // 3. Load the NEW, FRESH URL
    const FRESH_MANIFEST_URL = "https://jiotvpllive.cdn.jio.com/bpk-tv/Disney_Channel_BTS/output/index.mpd"; // The new URL you fetched in Step 1
    await player.load(FRESH_MANIFEST_URL);
}