class PDFViewer {
    constructor() {
        this.iframe = document.querySelector('.pdf-iframe');
        this.zoomInBtn = document.getElementById('zoomInBtn');
        this.zoomOutBtn = document.getElementById('zoomOutBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.backBtn = document.getElementById('backBtn');
        this.currentZoom = 100;

        this.initEventListeners();
    }

    initEventListeners() {
        this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        this.downloadBtn.addEventListener('click', () => this.downloadPDF());
        this.backBtn.addEventListener('click', () => this.goBack());
    }

    zoomIn() {
        this.currentZoom = Math.min(this.currentZoom + 25, 200);
        this.updateZoom();
    }

    zoomOut() {
        this.currentZoom = Math.max(this.currentZoom - 25, 50);
        this.updateZoom();
    }

    updateZoom() {
        this.iframe.style.transform = `scale(${this.currentZoom / 100})`;
        this.iframe.style.transformOrigin = 'top center';
    }

    downloadPDF() {
        const link = document.createElement('a');
        link.href = this.iframe.src;
        link.download = 'document.pdf';
        link.click();
    }

    goBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Fallback to a default page or homepage
            window.location.href = '/';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PDFViewer();
});