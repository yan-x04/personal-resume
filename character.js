/**
 * 3D 卡通IP形象 —— Q版双手托腮小女孩
 * 风格参考：3D卡通吉祥物，细腻皮肤高光，大眼睛萌系，长发
 */
(function () {
  const canvas = document.getElementById('character-canvas');
  if (!canvas) return;

  // ---------- 基础设置 ----------
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    30,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0.2, 9);
  camera.lookAt(0, 0.5, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  // ---------- 灯光 ----------
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // 主光（前方偏右上，制造面部高光）
  const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
  keyLight.position.set(2, 3, 4);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  scene.add(keyLight);

  // 补光（左侧偏冷）
  const fillLight = new THREE.DirectionalLight(0x88aaff, 0.4);
  fillLight.position.set(-3, 1, 2);
  scene.add(fillLight);

  // 轮廓光（后方粉色）
  const rimLight = new THREE.DirectionalLight(0xffb6c1, 0.6);
  rimLight.position.set(0, 2, -3);
  scene.add(rimLight);

  // 底部补光
  const bottomLight = new THREE.DirectionalLight(0xffffff, 0.2);
  bottomLight.position.set(0, -2, 2);
  scene.add(bottomLight);

  // ---------- 材质 ----------
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: 0xffe0d0,
    roughness: 0.35,
    metalness: 0.05,
  });

  const skinLipMaterial = new THREE.MeshStandardMaterial({
    color: 0xff8a9e,
    roughness: 0.4,
    metalness: 0.1,
  });

  const blushMaterial = new THREE.MeshStandardMaterial({
    color: 0xffb6c1,
    roughness: 0.6,
    transparent: true,
    opacity: 0.6,
  });

  const hairMaterial = new THREE.MeshStandardMaterial({
    color: 0x5c3a2e,
    roughness: 0.45,
    metalness: 0.15,
  });

  const hairHighlightMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b5a42,
    roughness: 0.35,
    metalness: 0.2,
  });

  const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.2,
    metalness: 0.1,
  });

  const eyeIrisMaterial = new THREE.MeshStandardMaterial({
    color: 0x5c3a2e,
    roughness: 0.1,
    metalness: 0.3,
  });

  const eyePupilMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.1,
    metalness: 0.1,
  });

  const eyeShineMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.05,
    metalness: 0.5,
    emissive: 0xffffff,
    emissiveIntensity: 0.3,
  });

  const dressMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5e6d3,
    roughness: 0.7,
    metalness: 0.0,
  });

  const braceletMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    roughness: 0.3,
    metalness: 0.3,
  });

  const braceletBeadMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4a574,
    roughness: 0.2,
    metalness: 0.6,
  });

  const hatMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4b896,
    roughness: 0.8,
    metalness: 0.0,
  });

  // ---------- 角色组 ----------
  const character = new THREE.Group();
  scene.add(character);

  // 头部组（用于眨眼和转头）
  const headGroup = new THREE.Group();
  headGroup.position.y = 1.4;
  character.add(headGroup);

  // ===== 头部 =====
  const headGeo = new THREE.SphereGeometry(0.85, 64, 64);
  // 调整脸部形状：拉长一点，压一下下巴
  const headPos = headGeo.attributes.position;
  for (let i = 0; i < headPos.count; i++) {
    const x = headPos.getX(i);
    const y = headPos.getY(i);
    const z = headPos.getZ(i);
    // 脸部稍向前突出
    if (z > 0.2) {
      headPos.setZ(i, z * 1.15);
    }
    // 头顶稍扁
    if (y > 0.4) {
      headPos.setY(i, y * 0.88 + 0.05);
    }
    // 下巴稍尖
    if (y < -0.3 && z > 0) {
      headPos.setY(i, y * 1.1);
      headPos.setX(i, x * 0.9);
    }
  }
  headGeo.computeVertexNormals();
  const head = new THREE.Mesh(headGeo, skinMaterial);
  head.castShadow = true;
  headGroup.add(head);

  // ===== 耳朵 =====
  const earGeo = new THREE.SphereGeometry(0.12, 24, 24);
  earGeo.scale(0.6, 1, 0.4);
  const leftEar = new THREE.Mesh(earGeo, skinMaterial);
  leftEar.position.set(-0.78, 0.05, 0.1);
  leftEar.castShadow = true;
  headGroup.add(leftEar);
  const rightEar = new THREE.Mesh(earGeo, skinMaterial);
  rightEar.position.set(0.78, 0.05, 0.1);
  rightEar.castShadow = true;
  headGroup.add(rightEar);

  // ===== 眼睛 =====
  function createEye(side) {
    const eyeGroup = new THREE.Group();
    const x = side * 0.32;
    eyeGroup.position.set(x, 0.08, 0.75);

    // 眼白
    const eyeWhiteGeo = new THREE.SphereGeometry(0.18, 32, 32);
    eyeWhiteGeo.scale(1, 0.85, 0.5);
    const eyeWhite = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMaterial);
    eyeGroup.add(eyeWhite);

    // 虹膜
    const irisGeo = new THREE.SphereGeometry(0.11, 32, 32);
    irisGeo.scale(1, 1, 0.3);
    const iris = new THREE.Mesh(irisGeo, eyeIrisMaterial);
    iris.position.z = 0.07;
    iris.name = 'iris';
    eyeGroup.add(iris);

    // 瞳孔
    const pupilGeo = new THREE.SphereGeometry(0.06, 24, 24);
    pupilGeo.scale(1, 1, 0.3);
    const pupil = new THREE.Mesh(pupilGeo, eyePupilMaterial);
    pupil.position.z = 0.1;
    pupil.name = 'pupil';
    eyeGroup.add(pupil);

    // 眼睛高光
    const shineGeo = new THREE.SphereGeometry(0.03, 16, 16);
    const shine1 = new THREE.Mesh(shineGeo, eyeShineMaterial);
    shine1.position.set(-0.03, 0.03, 0.13);
    eyeGroup.add(shine1);
    const shine2 = new THREE.Mesh(shineGeo.clone(), eyeShineMaterial);
    shine2.scale.set(0.5, 0.5, 0.5);
    shine2.position.set(0.04, -0.02, 0.13);
    eyeGroup.add(shine2);

    // 上眼睑（用于眨眼）
    const eyelidGeo = new THREE.SphereGeometry(0.19, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const eyelid = new THREE.Mesh(eyelidGeo, skinMaterial);
    eyelid.position.y = 0.08;
    eyelid.rotation.x = -Math.PI / 2;
    eyelid.scale.y = 0.01;
    eyelid.name = 'eyelid';
    eyeGroup.add(eyelid);

    // 下眼睑
    const lowerLidGeo = new THREE.SphereGeometry(0.17, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    const lowerLid = new THREE.Mesh(lowerLidGeo, skinMaterial);
    lowerLid.position.y = -0.08;
    lowerLid.rotation.x = Math.PI / 2;
    lowerLid.scale.y = 0.01;
    lowerLid.name = 'lowerLid';
    eyeGroup.add(lowerLid);

    eyeGroup.userData.iris = iris;
    eyeGroup.userData.pupil = pupil;
    eyeGroup.userData.eyelid = eyelid;
    eyeGroup.userData.lowerLid = lowerLid;

    return eyeGroup;
  }

  const leftEye = createEye(-1);
  const rightEye = createEye(1);
  headGroup.add(leftEye);
  headGroup.add(rightEye);

  // ===== 眉毛 =====
  const browGeo = new THREE.BoxGeometry(0.18, 0.025, 0.03);
  const browMat = new THREE.MeshStandardMaterial({ color: 0x4a2c1e, roughness: 0.5 });
  const leftBrow = new THREE.Mesh(browGeo, browMat);
  leftBrow.position.set(-0.32, 0.3, 0.76);
  leftBrow.rotation.z = 0.08;
  headGroup.add(leftBrow);
  const rightBrow = new THREE.Mesh(browGeo.clone(), browMat);
  rightBrow.position.set(0.32, 0.3, 0.76);
  rightBrow.rotation.z = -0.08;
  headGroup.add(rightBrow);

  // ===== 鼻子 =====
  const noseGeo = new THREE.SphereGeometry(0.06, 16, 16);
  noseGeo.scale(0.7, 0.5, 1.2);
  const nose = new THREE.Mesh(noseGeo, skinMaterial);
  nose.position.set(0, -0.08, 0.82);
  headGroup.add(nose);

  // ===== 嘴巴 =====
  const mouthGroup = new THREE.Group();
  mouthGroup.position.set(0, -0.3, 0.78);
  headGroup.add(mouthGroup);

  // 上唇
  const upperLipGeo = new THREE.TorusGeometry(0.08, 0.025, 12, 24, Math.PI);
  const upperLip = new THREE.Mesh(upperLipGeo, skinLipMaterial);
  upperLip.rotation.x = Math.PI / 2;
  upperLip.rotation.z = Math.PI;
  upperLip.position.y = 0.01;
  mouthGroup.add(upperLip);

  // 下唇
  const lowerLipGeo = new THREE.TorusGeometry(0.09, 0.03, 12, 24, Math.PI);
  const lowerLip = new THREE.Mesh(lowerLipGeo, skinLipMaterial);
  lowerLip.rotation.x = -Math.PI / 2;
  lowerLip.position.y = -0.01;
  mouthGroup.add(lowerLip);

  // ===== 腮红 =====
  const blushGeo = new THREE.CircleGeometry(0.14, 24);
  const leftBlush = new THREE.Mesh(blushGeo, blushMaterial);
  leftBlush.position.set(-0.48, -0.1, 0.72);
  leftBlush.rotation.y = -0.4;
  headGroup.add(leftBlush);
  const rightBlush = new THREE.Mesh(blushGeo, blushMaterial);
  rightBlush.position.set(0.48, -0.1, 0.72);
  rightBlush.rotation.y = 0.4;
  headGroup.add(rightBlush);

  // ===== 头发 =====
  const hairGroup = new THREE.Group();
  headGroup.add(hairGroup);

  // 头发主体（后脑+头顶）
  const hairMainGeo = new THREE.SphereGeometry(0.9, 48, 48);
  const hairMainPos = hairMainGeo.attributes.position;
  for (let i = 0; i < hairMainPos.count; i++) {
    const x = hairMainPos.getX(i);
    const y = hairMainPos.getY(i);
    const z = hairMainPos.getZ(i);
    // 脸的部分切掉（前半部分不收）
    if (z > 0.4) {
      hairMainPos.setZ(i, z * 0.4);
    }
    // 头顶蓬松
    if (y > 0.3) {
      hairMainPos.setY(i, y * 1.15);
    }
  }
  hairMainGeo.computeVertexNormals();
  const hairMain = new THREE.Mesh(hairMainGeo, hairMaterial);
  hairMain.castShadow = true;
  hairGroup.add(hairMain);

  // 刘海（前发）
  function createBangs() {
    const bangsGroup = new THREE.Group();
    bangsGroup.position.z = 0.75;

    // 左刘海
    const leftBangsGeo = new THREE.SphereGeometry(0.45, 24, 24);
    leftBangsGeo.scale(1, 0.7, 0.3);
    const leftBangs = new THREE.Mesh(leftBangsGeo, hairMaterial);
    leftBangs.position.set(-0.25, 0.3, 0);
    leftBangs.rotation.z = 0.3;
    bangsGroup.add(leftBangs);

    // 右刘海
    const rightBangsGeo = new THREE.SphereGeometry(0.4, 24, 24);
    rightBangsGeo.scale(1, 0.65, 0.3);
    const rightBangs = new THREE.Mesh(rightBangsGeo, hairMaterial);
    rightBangs.position.set(0.25, 0.28, 0);
    rightBangs.rotation.z = -0.2;
    bangsGroup.add(rightBangs);

    // 中间刘海
    const midBangsGeo = new THREE.SphereGeometry(0.25, 20, 20);
    midBangsGeo.scale(1, 0.5, 0.25);
    const midBangs = new THREE.Mesh(midBangsGeo, hairMaterial);
    midBangs.position.set(0, 0.2, 0.05);
    bangsGroup.add(midBangs);

    return bangsGroup;
  }
  hairGroup.add(createBangs());

  // ===== 长发（两侧垂下） =====
  function createHairStrand(x, zOffset, scaleX, scaleY, rotZ) {
    const strandGeo = new THREE.CapsuleGeometry(0.2, 2.5, 12, 16);
    const strand = new THREE.Mesh(strandGeo, hairMaterial);
    strand.position.set(x * scaleX, -0.8, zOffset);
    strand.rotation.z = rotZ;
    strand.scale.set(scaleX, scaleY, 0.7);
    strand.castShadow = true;
    return strand;
  }

  // 左侧长发
  hairGroup.add(createHairStrand(-0.65, 0.2, 1, 1.2, 0.05));
  hairGroup.add(createHairStrand(-0.85, 0.1, 1.1, 1.4, 0.08));
  hairGroup.add(createHairStrand(-0.5, 0.35, 0.8, 1, 0.02));

  // 右侧长发
  hairGroup.add(createHairStrand(0.65, 0.2, 1, 1.2, -0.05));
  hairGroup.add(createHairStrand(0.85, 0.1, 1.1, 1.4, -0.08));
  hairGroup.add(createHairStrand(0.5, 0.35, 0.8, 1, -0.02));

  // 背后长发
  const backHairGeo = new THREE.CapsuleGeometry(0.5, 2.8, 12, 20);
  const backHair = new THREE.Mesh(backHairGeo, hairMaterial);
  backHair.position.set(0, -0.9, -0.3);
  backHair.scale.set(1.3, 1.3, 0.6);
  backHair.castShadow = true;
  hairGroup.add(backHair);

  // 发梢高光
  const highlightGeo = new THREE.SphereGeometry(0.15, 16, 16);
  highlightGeo.scale(0.8, 1, 0.4);
  const highlight1 = new THREE.Mesh(highlightGeo, hairHighlightMaterial);
  highlight1.position.set(-0.3, 0.45, 0.5);
  hairGroup.add(highlight1);

  // ===== 发带/发饰（参考参考图的头巾感，简化成发带） =====
  const headbandGeo = new THREE.TorusGeometry(0.85, 0.05, 16, 48);
  const headband = new THREE.Mesh(headbandGeo, hatMaterial);
  headband.position.y = 0.4;
  headband.rotation.x = Math.PI / 2.2;
  headband.scale.set(1, 0.6, 0.9);
  hairGroup.add(headband);

  // 发带装饰小蝴蝶结
  const bowKnotGeo = new THREE.SphereGeometry(0.06, 12, 12);
  const bowMat = new THREE.MeshStandardMaterial({ color: 0xc9a678, roughness: 0.6 });
  const bowKnot = new THREE.Mesh(bowKnotGeo, bowMat);
  bowKnot.position.set(0, 0.75, 0.35);
  hairGroup.add(bowKnot);

  const bowLoopGeo = new THREE.SphereGeometry(0.12, 16, 16);
  bowLoopGeo.scale(1, 0.6, 0.3);
  const bowLeft = new THREE.Mesh(bowLoopGeo, bowMat);
  bowLeft.position.set(-0.12, 0.75, 0.35);
  bowLeft.rotation.z = 0.3;
  hairGroup.add(bowLeft);
  const bowRight = new THREE.Mesh(bowLoopGeo.clone(), bowMat);
  bowRight.position.set(0.12, 0.75, 0.35);
  bowRight.rotation.z = -0.3;
  hairGroup.add(bowRight);

  // ===== 脖子 =====
  const neckGeo = new THREE.CylinderGeometry(0.22, 0.25, 0.25, 24);
  const neck = new THREE.Mesh(neckGeo, skinMaterial);
  neck.position.y = 0.55;
  neck.castShadow = true;
  character.add(neck);

  // ===== 身体（衣服） =====
  const bodyGroup = new THREE.Group();
  bodyGroup.position.y = 0.2;
  character.add(bodyGroup);

  // 身体（上半身，露肩设计）
  const torsoGeo = new THREE.CylinderGeometry(0.55, 0.7, 1.2, 32);
  const torsoPos = torsoGeo.attributes.position;
  for (let i = 0; i < torsoPos.count; i++) {
    const y = torsoPos.getY(i);
    const x = torsoPos.getX(i);
    const z = torsoPos.getZ(i);
    // 胸部
    if (z > 0 && y < 0.3 && y > -0.1) {
      torsoPos.setZ(i, z + 0.1);
    }
  }
  torsoGeo.computeVertexNormals();
  const torso = new THREE.Mesh(torsoGeo, dressMaterial);
  torso.position.y = -0.1;
  torso.castShadow = true;
  bodyGroup.add(torso);

  // 吊带
  const strapGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.6, 12);
  const strapMat = new THREE.MeshStandardMaterial({ color: 0xe8d5be, roughness: 0.6 });
  const leftStrap = new THREE.Mesh(strapGeo, strapMat);
  leftStrap.position.set(-0.35, 0.3, 0.4);
  leftStrap.rotation.z = 0.1;
  leftStrap.rotation.x = 0.2;
  bodyGroup.add(leftStrap);
  const rightStrap = new THREE.Mesh(strapGeo.clone(), strapMat);
  rightStrap.position.set(0.35, 0.3, 0.4);
  rightStrap.rotation.z = -0.1;
  rightStrap.rotation.x = 0.2;
  bodyGroup.add(rightStrap);

  // 胸前褶皱装饰
  const ruffleGeo = new THREE.TorusGeometry(0.15, 0.04, 8, 24);
  const ruffle = new THREE.Mesh(ruffleGeo, strapMat);
  ruffle.position.set(0, 0.05, 0.6);
  ruffle.rotation.x = Math.PI / 2;
  ruffle.scale.set(1, 0.5, 1);
  bodyGroup.add(ruffle);

  // ===== 手臂（双手托腮姿势） =====
  function createArm(side) {
    const armGroup = new THREE.Group();
    const x = side * 0.5;

    // 上臂
    const upperArmGeo = new THREE.CapsuleGeometry(0.13, 0.5, 12, 16);
    const upperArm = new THREE.Mesh(upperArmGeo, skinMaterial);
    upperArm.position.set(x, 0.2, 0.3);
    upperArm.rotation.z = side * -0.5;
    upperArm.rotation.x = -0.3;
    upperArm.castShadow = true;
    armGroup.add(upperArm);

    // 前臂
    const forearmGeo = new THREE.CapsuleGeometry(0.12, 0.5, 12, 16);
    const forearm = new THREE.Mesh(forearmGeo, skinMaterial);
    forearm.position.set(side * 0.28, 0.55, 0.55);
    forearm.rotation.z = side * 0.6;
    forearm.rotation.x = -0.8;
    forearm.castShadow = true;
    armGroup.add(forearm);

    // 手（托着腮帮）
    const handGeo = new THREE.SphereGeometry(0.14, 24, 24);
    handGeo.scale(1, 0.8, 0.6);
    const hand = new THREE.Mesh(handGeo, skinMaterial);
    hand.position.set(side * 0.22, 0.85, 0.68);
    hand.rotation.z = side * 0.3;
    hand.castShadow = true;
    armGroup.add(hand);

    // 手指（简化成几个小圆柱）
    for (let i = 0; i < 3; i++) {
      const fingerGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.12, 8);
      const finger = new THREE.Mesh(fingerGeo, skinMaterial);
      finger.position.set(
        side * (0.15 + i * 0.05),
        0.95,
        0.65 - i * 0.02
      );
      finger.rotation.x = 0.5;
      finger.rotation.z = side * 0.2;
      armGroup.add(finger);
    }

    // 手链（棕色珠子手链）
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const beadGeo = new THREE.SphereGeometry(0.03, 12, 12);
      const bead = new THREE.Mesh(beadGeo, braceletBeadMaterial);
      bead.position.set(
        side * (0.28 + Math.cos(angle) * 0.13),
        0.4 + Math.sin(angle) * 0.02,
        0.5 + Math.sin(angle) * 0.1
      );
      armGroup.add(bead);
    }

    return armGroup;
  }

  character.add(createArm(-1));
  character.add(createArm(1));

  // ===== 底座/肩膀以下过渡（底部渐隐） =====
  const baseGeo = new THREE.CylinderGeometry(0.7, 0.9, 0.3, 32);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0xf5e6d3,
    transparent: true,
    opacity: 0.3,
  });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -0.9;
  bodyGroup.add(base);

  // ---------- 动画控制 ----------
  const clock = new THREE.Clock();
  let mouseX = 0;
  let mouseY = 0;
  let targetHeadRotY = 0;
  let targetHeadRotX = 0;
  let blinkTimer = Math.random() * 3;
  let isBlinking = false;
  let blinkProgress = 0;

  // 鼠标跟随
  document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouseX = x;
    mouseY = y;
    // 头部左右轻微转动
    targetHeadRotY = x * 0.3;
    targetHeadRotX = y * 0.1;
  });

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    const dt = clock.getDelta();

    // 呼吸动画（整个角色轻微起伏）
    character.position.y = Math.sin(t * 1.5) * 0.03;

    // 头部转动跟随鼠标（平滑插值）
    headGroup.rotation.y += (targetHeadRotY - headGroup.rotation.y) * 0.05;
    headGroup.rotation.x += (targetHeadRotX - headGroup.rotation.x) * 0.05;

    // 头部自然微晃
    headGroup.rotation.z = Math.sin(t * 0.8) * 0.03;

    // 眼睛跟随鼠标
    const eyeOffsetX = mouseX * 0.02;
    const eyeOffsetY = mouseY * 0.015;
    leftEye.userData.iris.position.x = eyeOffsetX;
    leftEye.userData.iris.position.y = eyeOffsetY;
    leftEye.userData.pupil.position.x = eyeOffsetX * 1.2;
    leftEye.userData.pupil.position.y = eyeOffsetY * 1.2;
    rightEye.userData.iris.position.x = eyeOffsetX;
    rightEye.userData.iris.position.y = eyeOffsetY;
    rightEye.userData.pupil.position.x = eyeOffsetX * 1.2;
    rightEye.userData.pupil.position.y = eyeOffsetY * 1.2;

    // 眨眼逻辑
    blinkTimer -= dt;
    if (blinkTimer <= 0 && !isBlinking) {
      isBlinking = true;
      blinkProgress = 0;
    }

    if (isBlinking) {
      blinkProgress += dt * 8;
      const s = Math.sin(blinkProgress);
      leftEye.userData.eyelid.scale.y = s;
      leftEye.userData.lowerLid.scale.y = s * 0.5;
      rightEye.userData.eyelid.scale.y = s;
      rightEye.userData.lowerLid.scale.y = s * 0.5;

      if (blinkProgress >= Math.PI) {
        isBlinking = false;
        blinkTimer = 2 + Math.random() * 4;
        leftEye.userData.eyelid.scale.y = 0.01;
        leftEye.userData.lowerLid.scale.y = 0.01;
        rightEye.userData.eyelid.scale.y = 0.01;
        rightEye.userData.lowerLid.scale.y = 0.01;
      }
    }

    // 头发轻微飘动
    hairGroup.rotation.z = Math.sin(t * 0.6) * 0.01;

    // 发带闪光
    bowMat.emissive = new THREE.Color(0x000000);

    renderer.render(scene, camera);
  }

  animate();

  // ---------- 响应式 ----------
  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  window.addEventListener('resize', resize);
  // 初始resize
  setTimeout(resize, 100);
})();
