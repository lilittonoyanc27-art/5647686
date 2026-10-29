import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ClothingItem } from './types';
import { CLOTHING_ITEMS } from './clothesData';
import { speakSpanish, playClickSound, playCoinSound } from './audioHelper';
import { Volume2, ShoppingBag, Eye, X, Move, ChevronUp, ChevronDown, Check } from 'lucide-react';

interface Shop3DProps {
  onSelectItem: (item: ClothingItem) => void;
  onAddToCart: (item: ClothingItem) => void;
  onInspectItemForQuiz: (item: ClothingItem) => void;
}

export const Shop3D: React.FC<Shop3DProps> = ({ onSelectItem, onAddToCart, onInspectItemForQuiz }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<ClothingItem | null>(null);
  const [showItemTranslation, setShowItemTranslation] = useState<boolean>(false);
  const [isControlsCollapsed, setIsControlsCollapsed] = useState<boolean>(false);
  const [interactPrompt, setInteractPrompt] = useState<string | null>(null);

  // Keyboard state
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // Mobile joystick touch state
  const joystickCenter = useRef<{ x: number; y: number } | null>(null);
  const joystickMove = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleSelectItem = useCallback((item: ClothingItem) => {
    setActiveItem(item);
    setShowItemTranslation(false);
    onSelectItem(item);
    playClickSound();
  }, [onSelectItem]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF6F2EB);
    scene.fog = new THREE.Fog(0xF6F2EB, 15, 38);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.7, 7); // Eyesight height
    let cameraYaw = 0;
    let cameraPitch = 0;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Procedural Studio Environment Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting (Warm Key + Cool Fill + Directional Soft)
    const hemiLight = new THREE.HemisphereLight(0xFFF7ED, 0xD4D4D8, 0.7);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xFFEEDD, 1.2);
    keyLight.position.set(6, 9, 5);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 30;
      keyLight.shadow.camera.left = -12;
      keyLight.shadow.camera.right = 12;
      keyLight.shadow.camera.top = 12;
      keyLight.shadow.camera.bottom = -12;
    }
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xFDBA74, 0.6, 18);
    fillLight.position.set(-5, 4, 2);
    scene.add(fillLight);

    // ==========================================
    // PROCEDURAL 3D STORE ARCHITECTURE
    // ==========================================

    // 1. Boutique Floor (Parquet texture procedurally drawn on 2D Canvas)
    const floorCanvas = document.createElement('canvas');
    floorCanvas.width = 512;
    floorCanvas.height = 512;
    const fCtx = floorCanvas.getContext('2d');
    if (fCtx) {
      fCtx.fillStyle = '#EBDBC9';
      fCtx.fillRect(0, 0, 512, 512);
      // Wood plank lines
      fCtx.strokeStyle = '#D1BA9F';
      fCtx.lineWidth = 4;
      for (let y = 0; y < 512; y += 64) {
        fCtx.beginPath();
        fCtx.moveTo(0, y);
        fCtx.lineTo(512, y);
        fCtx.stroke();
      }
      for (let x = 0; x < 512; x += 128) {
        for (let y = 0; y < 512; y += 64) {
          fCtx.beginPath();
          const offsetX = (y / 64) % 2 === 0 ? 0 : 64;
          fCtx.moveTo(x + offsetX, y);
          fCtx.lineTo(x + offsetX, y + 64);
          fCtx.stroke();
        }
      }
    }
    const floorTexture = new THREE.CanvasTexture(floorCanvas);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(8, 8);
    floorTexture.colorSpace = THREE.SRGBColorSpace;
    floorTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.35,
      metalness: 0.05,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = !isSoftwareGl;
    scene.add(floorMesh);

    // Burgundy central carpet
    const carpetGeo = new THREE.PlaneGeometry(8, 14);
    const carpetMat = new THREE.MeshStandardMaterial({
      color: 0x780016,
      roughness: 0.85,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const carpetMesh = new THREE.Mesh(carpetGeo, carpetMat);
    carpetMesh.rotation.x = -Math.PI / 2;
    carpetMesh.position.set(0, 0.01, 0);
    scene.add(carpetMesh);

    // Walls
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xF7F4EE, roughness: 0.9 });
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(24, 6, 0.4), wallMat);
    backWall.position.set(0, 3, -12);
    backWall.receiveShadow = !isSoftwareGl;
    scene.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 6, 24), wallMat);
    leftWall.position.set(-12, 3, 0);
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 6, 24), wallMat);
    rightWall.position.set(12, 3, 0);
    scene.add(rightWall);

    // Burgundy decorative wall panels
    const panelMat = new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.5 });
    const panel1 = new THREE.Mesh(new THREE.BoxGeometry(5, 4, 0.1), panelMat);
    panel1.position.set(-6, 2.5, -11.75);
    scene.add(panel1);

    const panel2 = new THREE.Mesh(new THREE.BoxGeometry(5, 4, 0.1), panelMat);
    panel2.position.set(6, 2.5, -11.75);
    scene.add(panel2);

    // Interactive 3D Objects tracking
    const interactiveObjects: { mesh: THREE.Object3D; item: ClothingItem }[] = [];

    // Helper: Create a clothing rack with hung shirts
    function createClothingRack(x: number, z: number, items: ClothingItem[]) {
      const rackGroup = new THREE.Group();
      rackGroup.position.set(x, 0, z);

      // Gold metal frame
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        metalness: 0.85,
        roughness: 0.25,
      });

      // Base bar
      const base1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.4), frameMat);
      base1.rotation.z = Math.PI / 2;
      base1.position.set(0, 0.05, -0.4);
      rackGroup.add(base1);

      const base2 = base1.clone();
      base2.position.set(0, 0.05, 0.4);
      rackGroup.add(base2);

      // Vertical posts
      const post1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.8), frameMat);
      post1.position.set(-1.1, 0.9, 0);
      post1.castShadow = !isSoftwareGl;
      rackGroup.add(post1);

      const post2 = post1.clone();
      post2.position.set(1.1, 0.9, 0);
      rackGroup.add(post2);

      // Top hanging bar
      const topBar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.3), frameMat);
      topBar.rotation.z = Math.PI / 2;
      topBar.position.set(0, 1.7, 0);
      rackGroup.add(topBar);

      // Clothes hanging
      const count = Math.min(items.length, 5);
      for (let i = 0; i < count; i++) {
        const item = items[i];
        const clothGroup = new THREE.Group();
        const posX = -0.8 + i * 0.4;
        clothGroup.position.set(posX, 1.65, 0);

        // Hanger
        const hanger = new THREE.Mesh(
          new THREE.TorusGeometry(0.08, 0.015, 8, 16, Math.PI),
          frameMat
        );
        clothGroup.add(hanger);

        // Cloth mesh
        const clothColor = new THREE.Color(item.colorHex || 0xDC2626);
        const clothMat = new THREE.MeshStandardMaterial({
          color: clothColor,
          roughness: 0.7,
        });
        const shirtMesh = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.65, 0.08), clothMat);
        shirtMesh.position.set(0, -0.38, 0);
        shirtMesh.castShadow = !isSoftwareGl;
        shirtMesh.userData = { clothingItem: item };
        clothGroup.add(shirtMesh);

        // Tag label
        const tag = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 0.12, 0.02),
          new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
        );
        tag.position.set(0.12, -0.2, 0.05);
        clothGroup.add(tag);

        rackGroup.add(clothGroup);
        interactiveObjects.push({ mesh: shirtMesh, item });
      }

      scene.add(rackGroup);
    }

    // Populate Racks across store departments
    // Left: Men's section
    const menItems = CLOTHING_ITEMS.filter(c => c.category === 'hombre');
    createClothingRack(-7, -4, menItems.slice(0, 5));
    createClothingRack(-7, 2, menItems.slice(5, 10));

    // Right: Women's section
    const womenItems = CLOTHING_ITEMS.filter(c => c.category === 'mujer');
    createClothingRack(7, -4, womenItems.slice(0, 5));
    createClothingRack(7, 2, womenItems.slice(5, 10));

    // Center Back: Sales / Rebajas rack
    const saleItems = CLOTHING_ITEMS.filter(c => c.category === 'rebajas');
    createClothingRack(0, -9, saleItems.slice(0, 5));

    // Mannequin 1 (Left Entrance)
    const mannequinGroup = new THREE.Group();
    mannequinGroup.position.set(-3, 0, -2);
    const manMat = new THREE.MeshStandardMaterial({ color: 0xF5EBE1, roughness: 0.3 });
    // Stand
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.04), frameMatStyle());
    stand.position.y = 0.02;
    mannequinGroup.add(stand);
    // Torso
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.75), new THREE.MeshStandardMaterial({ color: 0x881337 }));
    torso.position.y = 1.15;
    torso.userData = { clothingItem: menItems[0] };
    mannequinGroup.add(torso);
    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.12), manMat);
    head.position.y = 1.7;
    mannequinGroup.add(head);
    scene.add(mannequinGroup);
    interactiveObjects.push({ mesh: torso, item: menItems[0] });

    // Mannequin 2 (Right Entrance - Party dress)
    const mannequin2Group = new THREE.Group();
    mannequin2Group.position.set(3, 0, -2);
    const stand2 = stand.clone();
    mannequin2Group.add(stand2);
    const dressTorso = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.35, 1.05),
      new THREE.MeshStandardMaterial({ color: 0xEA580C, roughness: 0.6 })
    );
    dressTorso.position.y = 1.0;
    dressTorso.userData = { clothingItem: womenItems[0] };
    mannequin2Group.add(dressTorso);
    const head2 = head.clone();
    mannequin2Group.add(head2);
    scene.add(mannequin2Group);
    interactiveObjects.push({ mesh: dressTorso, item: womenItems[0] });

    // Cashier Desk (Caja Registradora) at front right
    const deskGroup = new THREE.Group();
    deskGroup.position.set(7, 0, 7);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x3F2E23, roughness: 0.4 });
    const desk = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.1, 1.0), deskMat);
    desk.position.y = 0.55;
    desk.castShadow = !isSoftwareGl;
    deskGroup.add(desk);

    // Register / Screen on desk
    const screenMat = new THREE.MeshStandardMaterial({ color: 0x18181B, roughness: 0.2 });
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.05), screenMat);
    screen.position.set(0, 1.3, 0);
    deskGroup.add(screen);

    // Cashier character bust / mannequin
    const clerk = new THREE.Mesh(new THREE.SphereGeometry(0.18), new THREE.MeshStandardMaterial({ color: 0xFBCFE8 }));
    clerk.position.set(0, 1.75, 0.6);
    deskGroup.add(clerk);
    scene.add(deskGroup);

    // Fitting Room (Probadores) on front left
    const fittingGroup = new THREE.Group();
    fittingGroup.position.set(-8, 0, 7);
    const boothMat = new THREE.MeshStandardMaterial({ color: 0xE2D9D0, roughness: 0.8 });
    const wallB1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.5, 2), boothMat);
    wallB1.position.set(0, 1.25, 0);
    fittingGroup.add(wallB1);

    const curtainMat = new THREE.MeshStandardMaterial({ color: 0x780016, roughness: 0.9 });
    const curtain = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.4, 0.08), curtainMat);
    curtain.position.set(0.8, 1.2, 1);
    fittingGroup.add(curtain);

    // Mirror on the fitting room
    const mirrorGeo = new THREE.PlaneGeometry(0.9, 1.8);
    const mirrorMat = new THREE.MeshStandardMaterial({
      color: 0xE0E7FF,
      roughness: 0.05,
      metalness: 0.95,
    });
    const mirror = new THREE.Mesh(mirrorGeo, mirrorMat);
    mirror.position.set(0.06, 1.2, 0);
    mirror.rotation.y = Math.PI / 2;
    fittingGroup.add(mirror);
    scene.add(fittingGroup);

    function frameMatStyle() {
      return new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.8, roughness: 0.2 });
    }

    // Raycasting for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshesToTest = interactiveObjects.map(o => o.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest, true);

      if (intersects.length > 0) {
        let hit: THREE.Object3D | null = intersects[0].object;
        while (hit && !hit.userData.clothingItem && hit.parent) {
          hit = hit.parent;
        }
        if (hit && hit.userData.clothingItem) {
          handleSelectItem(hit.userData.clothingItem);
        }
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);

    // Keyboard handlers
    const onKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Pointer Drag Look handler
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      cameraYaw -= deltaX * 0.004;
      cameraPitch -= deltaY * 0.003;
      cameraPitch = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, cameraPitch));
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();

      // Keyboard movement (WASD / Arrows)
      const moveSpeed = 4.2 * delta;
      let forward = 0;
      let strafe = 0;

      const keys = keysPressed.current;
      if (keys['w'] || keys['arrowup']) forward += 1;
      if (keys['s'] || keys['arrowdown']) forward -= 1;
      if (keys['a'] || keys['arrowleft']) strafe -= 1;
      if (keys['d'] || keys['arrowright']) strafe += 1;

      // Add mobile joystick values
      forward += -joystickMove.current.y * 1.5;
      strafe += joystickMove.current.x * 1.5;

      if (forward !== 0 || strafe !== 0) {
        const sin = Math.sin(cameraYaw);
        const cos = Math.cos(cameraYaw);

        camera.position.x += (strafe * cos - forward * sin) * moveSpeed;
        camera.position.z += (strafe * sin + forward * cos) * moveSpeed;

        // Boundaries
        camera.position.x = Math.max(-10, Math.min(10, camera.position.x));
        camera.position.z = Math.max(-10, Math.min(10, camera.position.z));
      }

      // Update camera orientation
      const targetX = camera.position.x - Math.sin(cameraYaw) * Math.cos(cameraPitch);
      const targetY = camera.position.y + Math.sin(cameraPitch);
      const targetZ = camera.position.z - Math.cos(cameraYaw) * Math.cos(cameraPitch);
      camera.lookAt(targetX, targetY, targetZ);

      // Check proximity to items
      let nearestItem: ClothingItem | null = null;
      let minDistance = 2.4;

      for (const obj of interactiveObjects) {
        const worldPos = new THREE.Vector3();
        obj.mesh.getWorldPosition(worldPos);
        const dist = camera.position.distanceTo(worldPos);
        if (dist < minDistance) {
          minDistance = dist;
          nearestItem = obj.item;
        }
      }

      if (nearestItem) {
        setInteractPrompt(`Presiona o haz clic para ver: ${nearestItem.spanishName}`);
      } else {
        setInteractPrompt(null);
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    // Resize handler
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('click', handleCanvasClick);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [handleSelectItem]);

  // Touch joystick handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    joystickCenter.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!joystickCenter.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - joystickCenter.current.x;
    const dy = touch.clientY - joystickCenter.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxRadius = 45;
    const normX = (dx / Math.max(dist, 1)) * Math.min(dist / maxRadius, 1);
    const normY = (dy / Math.max(dist, 1)) * Math.min(dist / maxRadius, 1);
    joystickMove.current = { x: normX, y: normY };
  };

  const handleTouchEnd = () => {
    joystickCenter.current = null;
    joystickMove.current = { x: 0, y: 0 };
  };

  return (
    <div className="relative w-full h-[620px] sm:h-[720px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#780016]/20 bg-[#FAF6F0]">
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Banner / Store Title */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="bg-white/90 backdrop-blur-xs px-4 py-2 rounded-2xl shadow-md border border-[#E5D5C5] flex items-center gap-2 pointer-events-auto">
          <span className="text-xl">🏬</span>
          <div>
            <h2 className="text-sm font-extrabold text-[#780016]">Tienda 3D: Español Shop</h2>
            <p className="text-[11px] font-semibold text-gray-500">
              Շարժվեք WASD / Սլաքներով կամ սեղմեք հագուստի վրա
            </p>
          </div>
        </div>

        {interactPrompt && (
          <div className="hidden sm:flex bg-[#EA580C] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg animate-bounce pointer-events-auto items-center gap-1.5">
            <span>✨</span>
            <span>{interactPrompt}</span>
          </div>
        )}
      </div>

      {/* Virtual Touch Joystick on Mobile */}
      <div
        className="sm:hidden absolute bottom-24 left-6 w-24 h-24 rounded-full bg-black/30 border-2 border-white/40 flex items-center justify-center touch-none select-none z-20"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-10 h-10 rounded-full bg-[#EA580C] shadow-lg flex items-center justify-center text-white text-xs font-bold pointer-events-none">
          <Move className="w-5 h-5" />
        </div>
      </div>

      {/* Interactive Clothing Item Modal Overlay */}
      {activeItem && (
        <div className="absolute inset-0 z-40 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-[#780016]/30 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#780016] to-[#EA580C] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 bg-white/20 rounded-2xl shadow-inner">
                  {activeItem.icon}
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-200">
                    {activeItem.department}
                  </span>
                  <h3 className="text-xl font-black">{activeItem.spanishName}</h3>
                </div>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  setActiveItem(null);
                }}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Armenian Name */}
              <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E5D5C5]">
                <span className="text-[11px] font-bold uppercase text-[#780016]/70 block">
                  Անվանումը հայերեն
                </span>
                <p className="text-lg font-bold text-gray-900">{activeItem.armenianName}</p>
              </div>

              {/* Price & Discount */}
              <div className="flex items-center justify-between p-3.5 bg-amber-50 rounded-xl border border-amber-200">
                <div>
                  <span className="text-xs text-gray-500 font-semibold block">Գին (Precio)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-[#780016]">
                      {activeItem.discountPercent
                        ? (activeItem.price * (1 - activeItem.discountPercent / 100)).toFixed(0)
                        : activeItem.price}{' '}
                      €
                    </span>
                    {activeItem.discountPercent && (
                      <span className="text-xs font-bold text-white bg-red-600 px-2 py-0.5 rounded-full">
                        -{activeItem.discountPercent}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 font-semibold block">Չափս (Talla)</span>
                  <span className="text-sm font-bold text-gray-800 bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                    {activeItem.size}
                  </span>
                </div>
              </div>

              {/* Example sentence with TTS */}
              <div className="p-3.5 bg-orange-50 rounded-xl border border-orange-200 space-y-1.5">
                <span className="text-[11px] font-bold text-[#EA580C] uppercase tracking-wide block">
                  Նախադասություն խանութում (Ejemplo en tienda)
                </span>
                <p className="text-sm font-semibold text-gray-800 italic">
                  «{activeItem.exampleEs}»
                </p>
                {showItemTranslation && (
                  <p className="text-sm font-medium text-gray-700 animate-in fade-in">
                    «{activeItem.exampleHy}»
                  </p>
                )}
              </div>

              {/* Action Buttons: Escuchar, Traducción, Comprar, Practicar */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={() => {
                    speakSpanish(activeItem.exampleEs);
                  }}
                  className="py-3 px-4 bg-[#FAF6F0] hover:bg-[#E5D5C5] text-[#780016] font-bold rounded-xl border border-[#E5D5C5] flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98 cursor-pointer text-sm"
                >
                  <Volume2 className="w-4 h-4 text-[#EA580C]" />
                  <span>🔊 Escuchar</span>
                </button>

                <button
                  onClick={() => {
                    playClickSound();
                    setShowItemTranslation(prev => !prev);
                  }}
                  className="py-3 px-4 bg-[#FAF6F0] hover:bg-[#E5D5C5] text-gray-800 font-bold rounded-xl border border-[#E5D5C5] flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98 cursor-pointer text-sm"
                >
                  <Eye className="w-4 h-4 text-[#780016]" />
                  <span>📖 {showItemTranslation ? 'Թաքցնել' : 'Traducción'}</span>
                </button>

                <button
                  onClick={() => {
                    playCoinSound();
                    onAddToCart(activeItem);
                    setActiveItem(null);
                  }}
                  className="py-3 px-4 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98 cursor-pointer text-sm col-span-1"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>🛒 Comprar</span>
                </button>

                <button
                  onClick={() => {
                    playClickSound();
                    onInspectItemForQuiz(activeItem);
                    setActiveItem(null);
                  }}
                  className="py-3 px-4 bg-[#780016] hover:bg-[#600012] text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98 cursor-pointer text-sm col-span-1"
                >
                  <span>🎮 Practicar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ergonomic Collapsible Bottom Control Dock */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[94%] max-w-[840px] z-30 transition-all duration-300">
        <div className="flex justify-center mb-1">
          <button
            onClick={() => {
              playClickSound();
              setIsControlsCollapsed(prev => !prev);
            }}
            className="px-3 py-1 bg-white/90 hover:bg-white text-gray-700 text-xs font-bold rounded-full shadow-md border border-[#E5D5C5] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {isControlsCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>{isControlsCollapsed ? 'Ցուցադրել կառավարումը' : 'Թաքցնել (Zen Mode)'}</span>
          </button>
        </div>

        {!isControlsCollapsed && (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-[#E5D5C5] flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <span className="p-1.5 bg-[#FAF6F0] rounded-lg border border-[#E5D5C5] text-sm">🎮</span>
              <span>
                <strong>Ստեղնաշար՝</strong> W, A, S, D կամ սլաքներ։ Մկնիկով քաշեք տեսադաշտը շրջելու համար։
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-gray-500 mr-1">Արագ ընտրություն՝</span>
              {CLOTHING_ITEMS.slice(0, 4).map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className="px-2.5 py-1 bg-[#FAF6F0] hover:bg-orange-100 text-gray-800 text-xs font-bold rounded-lg border border-[#E5D5C5] flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span>{item.icon}</span>
                  <span className="hidden sm:inline">{item.spanishName.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
