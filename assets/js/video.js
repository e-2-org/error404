/**
 * The piece as a video
 *
 * "Watch video" in the start dialog plays the video for the chosen desktop
 * theme (error404-win.mp4 or error404-mac.mp4, hosted at video_url in
 * _config.yml) in an overlay.
 * The overlay closes with its close button, Escape, a click outside the
 * video, or when the video ends.
 */
export const Video = {
    init() {
        this.overlay = document.getElementById('video-overlay');
        /* no overlay until video_url is set in _config.yml */
        if (!this.overlay || new URLSearchParams(location.search).has('capture')) {
            return;
        }
        this.video = this.overlay.querySelector('video');
        document.getElementById('dialog-video').addEventListener('click', () => this.open());
        this.overlay.querySelector('.video-close').addEventListener('click', () => this.overlay.close());
        /* a click on the overlay itself, not the video, is outside the video */
        this.overlay.addEventListener('click', e => {
            if (e.target === this.overlay) {
                this.overlay.close();
            }
        });
        this.video.addEventListener('ended', () => this.overlay.close());
        this.overlay.addEventListener('close', () => {
            this.video.pause();
            document.getElementById('dialog-video').focus();
        });
    },
    open() {
        /* the theme chosen in the dialog is the body's class (desktop.js) */
        const os = document.body.classList.contains('os-mac') ? 'mac' : 'win';
        const src = this.overlay.dataset.src + os + '.mp4';
        if (this.video.getAttribute('src') !== src) {
            this.video.src = src;
        } else if (this.video.ended) {
            this.video.currentTime = 0;
        }
        this.overlay.showModal();
        this.video.focus();
        this.video.play().catch(() => {});
    }
};
