import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import logo from '../assets/images/logo.png'

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const navbarRef = useRef<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const threeJsAssets = useRef<{
        scene: THREE.Scene | null,
        camera: THREE.PerspectiveCamera | null,
        renderer: THREE.WebGLRenderer | null,
        plane: THREE.Mesh | null
    }>({
        scene: null,
        camera: null,
        renderer: null,
        plane: null
    });

    useEffect(() => {
        // Initialize Three.js scene for background effects
        const initThreeJS = () => {
            const { current: assets } = threeJsAssets;
            assets.scene = new THREE.Scene();
            assets.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            assets.renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true
            });

            assets.renderer.setSize(window.innerWidth, window.innerHeight);
            assets.renderer.setClearColor(0x000000, 0);
            assets.renderer.domElement.style.position = 'fixed';
            assets.renderer.domElement.style.top = '0';
            assets.renderer.domElement.style.zIndex = '-1';
            containerRef.current?.appendChild(assets.renderer.domElement);

            // Create glass effect geometry
            const geometry = new THREE.PlaneGeometry(100, 10);
            const material = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                transmission: 0.9,
                roughness: 0.1,
                metalness: 0.1,
                clearcoat: 0.9,
                clearcoatRoughness: 0.1,
                ior: 1.2,
                thickness: 1,
                envMapIntensity: 1,
                // Start hidden (set plane.visible = false after creation)
            });

            assets.plane = new THREE.Mesh(geometry, material);
            assets.plane.visible = false; // Start hidden
            assets.scene.add(assets.plane);
            assets.camera.position.z = 5;

            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate);
                if (assets.renderer && assets.scene && assets.camera) {
                    assets.renderer.render(assets.scene, assets.camera);
                }
            };
            animate();
        };

        const setupScrollEffects = () => {
            const { current: assets } = threeJsAssets;

            // GSAP scroll animation with proper callbacks
            ScrollTrigger.create({
                trigger: document.body,
                start: "top top",
                end: "max",
                onUpdate: (self) => {
                    const isScrolled = self.scroll() > 10;
                    setScrolled(isScrolled);

                    // Toggle Three.js plane visibility
                    if (assets.plane) {
                        (assets.plane.material as THREE.Material).visible = isScrolled;
                        assets.plane.position.y = -self.scroll() / 100;
                    }
                },
                onLeave: () => {
                    if (assets.plane) assets.plane.visible = true;
                    // No need to set material.visible; set mesh visibility only
                },
                onEnterBack: () => {
                    if (assets.plane) assets.plane.visible = false;
                    // No need to set material.visible; set mesh visibility only
                }
            });

            // Smooth animation for visual properties
            gsap.to(navbarRef.current, {
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "max",
                    scrub: true
                },
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(10, 25, 47, 0.8)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                duration: 0.3
            });
        };

        const handleResize = () => {
            const { current: assets } = threeJsAssets;
            if (assets.camera && assets.renderer) {
                assets.camera.aspect = window.innerWidth / window.innerHeight;
                assets.camera.updateProjectionMatrix();
                assets.renderer.setSize(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        initThreeJS();
        setupScrollEffects();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current && threeJsAssets.current.renderer) {
                containerRef.current.removeChild(threeJsAssets.current.renderer.domElement);
            }
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <div className="relative">
            <div ref={containerRef} className="absolute w-full h-full pointer-events-none" />
            <nav
                ref={navbarRef}
                className="fixed w-full py-3 px-6 md:px-12 flex justify-between items-center transition-all duration-300 z-50"
                style={{
                    backdropFilter: scrolled ? 'blur(10px)' : 'none',
                    backgroundColor: scrolled ? 'rgba(10, 25, 47, 0.8)' : 'rgba(10, 25, 47, 0)',
                    borderRadius: '20px',
                    margin: '1rem auto',
                    maxWidth: 'calc(100% - 2rem)',
                    border: scrolled ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent'
                }}
            >
                <div className="text-white font-bold text-xl">
                    <img
                        src={logo}
                        alt="Modern tech company logo in dark blue with white text"
                        className="h-16"
                    />
                </div>

                <ul className="hidden md:flex space-x-2">
                    <NavItem href="#home" isActive={!scrolled}>Home</NavItem>
                    <NavItem href="#about" isActive={!scrolled}>About</NavItem>
                    <NavItem href="#services" isActive={!scrolled}>Services</NavItem>
                    <NavItem href="#industry" isActive={!scrolled}>Industry</NavItem>
                    <NavItem href="#contact" isActive={!scrolled}>Contact</NavItem>
                </ul>

                <MobileMenuButton isActive={!scrolled} />
            </nav>
        </div>
    );
};

type NavItemProps = {
    href: string;
    children: React.ReactNode;
    isActive: boolean;
};

const NavItem = ({ href, children, isActive }: NavItemProps) => (
    <li>
        <a
            href={href}
            className={`px-3 py-2 rounded-lg transition-all duration-300 flex items-center
        ${isActive ? 'text-white' : 'text-white/90 hover:text-white'}`}
        >
            {children}
        </a>
    </li>
);

type MobileMenuButtonProps = {
    isActive: boolean;
};

const MobileMenuButton = ({ isActive }: MobileMenuButtonProps) => (
    <button className="md:hidden p-2 rounded-full transition-colors duration-300 hover:bg-white/10">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={isActive ? 'currentColor' : 'rgba(255,255,255,0.9)'}
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </button>
);

export default Navbar;
