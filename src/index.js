(function () {
    function getMobileURL(url) {
        const isAndroid = /Android/i.test(navigator.userAgent);

        // Handle YouTube links
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            // Extract video ID for YouTube links
            let videoId = '';

            try {
                if (url.includes('youtube.com/watch')) {
                    // For urls like: https://www.youtube.com/watch?v=VIDEO_ID
                    const urlParams = new URLSearchParams(new URL(url).search);
                    videoId = urlParams.get('v');
                } else if (url.includes('youtu.be/')) {
                    // For shortened urls like: https://youtu.be/VIDEO_ID
                    videoId = url.split('youtu.be/')[1].split('?')[0];
                } else if (url.includes('youtube.com/v/')) {
                    // For urls like: https://www.youtube.com/v/VIDEO_ID
                    videoId = url.split('youtube.com/v/')[1].split('?')[0];
                } else if (url.includes('youtube.com/embed/')) {
                    // For embed urls like: https://www.youtube.com/embed/VIDEO_ID
                    videoId = url.split('youtube.com/embed/')[1].split('?')[0];
                }

                if (videoId) {
                    // Create YouTube app deep link
                    if (isAndroid) {
                        return `youtube://www.youtube.com/watch?v=${videoId}`;
                    } else {
                        // iOS
                        return `youtube:${videoId}`;
                    }
                }
            } catch (e) {
                console.error("Error parsing YouTube URL:", e);
            }
        }

        // Handle other common apps
        // Twitter/X
        if (url.includes('twitter.com') || url.includes('x.com')) {
            const tweetPath = new URL(url).pathname;
            if (isAndroid) {
                return `twitter://status${tweetPath}`;
            } else {
                return `twitter://status${tweetPath}`;
            }
        }

        // Instagram
        if (url.includes('instagram.com')) {
            const instagramPath = new URL(url).pathname;
            if (isAndroid) {
                return `instagram://instagram.com${instagramPath}`;
            } else {
                return `instagram://instagram.com${instagramPath}`;
            }
        }

        // LinkedIn
        if (url.includes('linkedin.com')) {
            if (isAndroid) {
                return url.replace('https://www.linkedin.com', 'linkedin://');
            } else {
                return url.replace('https://www.linkedin.com', 'linkedin://');
            }
        }

        // Facebook
        if (url.includes('facebook.com')) {
            if (isAndroid) {
                return url.replace('https://www.facebook.com', 'fb://');
            } else {
                return url.replace('https://www.facebook.com', 'fb://');
            }
        }

        // TikTok
        if (url.includes('tiktok.com')) {
            const tiktokPath = new URL(url).pathname;
            if (isAndroid) {
                return `tiktok://app${tiktokPath}`;
            } else {
                return `tiktok://app${tiktokPath}`;
            }
        }

        // If no special handling, return the original URL
        return url;
    }

    document.querySelectorAll('a[x-opener-url]').forEach((el) => {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            // Check if the device is mobile
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            // Open appropriate URL based on device type
            if (isMobile) {
                const mobileUrl = getMobileURL(url);
                // For mobile, attempt to open the app first
                window.location.href = mobileUrl;

                // Set a fallback to open the website if the app doesn't open
                setTimeout(() => {
                    window.location.href = url;
                }, 2500);
            } else {
                window.location.href = url;
            }
        });
    });
})();