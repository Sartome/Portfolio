    </main>
    
    <!-- Footer -->
    <footer class="mt-20 bg-slate-900/50 border-t border-white/10">
        <div class="container mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- About -->
                <div>
                    <h3 class="text-xl font-bold mb-4 gradient-text">Marwane El arrass</h3>
                    <p class="text-gray-400 mb-4">
                        Développeur Web Full-Stack passionné par les technologies modernes et l'innovation.
                    </p>
                    <div class="flex space-x-4">
                        <a href="https://github.com/Sartome" target="_blank" class="text-gray-400 hover:text-blue-400 transition-colors">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/marwane-el-arrass/" target="_blank" class="text-gray-400 hover:text-blue-400 transition-colors">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </a>
                        <a href="mailto:elarrassmarwane@gmail.com" class="text-gray-400 hover:text-blue-400 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                
                <!-- Quick Links -->
                <div>
                    <h3 class="text-xl font-bold mb-4">Liens Rapides</h3>
                    <ul class="space-y-2">
                        <li><a href="<?= url('/') ?>" class="text-gray-400 hover:text-blue-400 transition-colors">Accueil</a></li>
                        <li><a href="<?= url('/cv') ?>" class="text-gray-400 hover:text-blue-400 transition-colors">Mon CV</a></li>
                        <li><a href="<?= url('/projects') ?>" class="text-gray-400 hover:text-blue-400 transition-colors">Mes Projets</a></li>
                        <li><a href="<?= url('/veille') ?>" class="text-gray-400 hover:text-blue-400 transition-colors">Veille Technologique</a></li>
                        <li><a href="<?= url('/journey') ?>" class="text-gray-400 hover:text-blue-400 transition-colors">Mon Parcours</a></li>
                    </ul>
                </div>
                
                <!-- Contact & Old Site -->
                <div>
                    <h3 class="text-xl font-bold mb-4">Contact</h3>
                    <ul class="space-y-2 mb-6">
                        <li class="text-gray-400">
                            <span class="font-semibold">Email:</span> elarrassmarwane@gmail.com
                        </li>
                        <li class="text-gray-400">
                            <span class="font-semibold">Localisation:</span> Île-de-France
                        </li>
                    </ul>
                    
                    <!-- Old Site Link -->
                    <a href="<?= url('/old/index.html') ?>" class="inline-flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-sm transition-all hover-glow">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Ancien Site
                    </a>
                </div>
            </div>
            
            <!-- Copyright -->
            <div class="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
                <p>&copy; <?= date('Y') ?> Marwane El arrass. Tous droits réservés.</p>
                <p class="text-sm mt-2">Développé avec ❤️ en PHP MVC moderne</p>
            </div>
        </div>
    </footer>
    
    <!-- Back to Top Button -->
    <button id="back-to-top" class="fixed bottom-8 right-8 p-3 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg opacity-0 pointer-events-none transition-all duration-300 hover-glow">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    </button>
    
    <!-- JavaScript -->
    <script>
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuBtn?.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Back to Top Button
        const backToTopBtn = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        });
        
        backToTopBtn?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-slide-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in-section').forEach(el => {
            observer.observe(el);
        });
    </script>
</body>
</html>
