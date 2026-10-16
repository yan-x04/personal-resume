(function () {
  'use strict';

  var STORAGE_KEY = 'personal_archive_v4';

  // ========== Data ==========
  var defaultData = {
    personal: {
      name: '',
      gender: '女',
      age: '22',
      political: '共青团员',
      email: '3381734725@qq.cm',
      phone: '198xxx',
      education: '本科',
      location: '',
      birthdate: '',
      hometown: '',
      nationality: '',
      ethnicity: ''
    },
    edu: [
      {
        school: '安徽师范大学',
        time: '2025.09 - 2027.06',
        degree: '本科',
        major: '软件工程',
        rank: '专业排名前15%  平均分 89.8/100',
        courses: '软件质量保证与测试、Java程序设计、数据库原理与应用、数据结构与算法、计算机网络、Web前端开发',
        honors: '校级三等奖学金、芜湖市第十届 Office 应用技能大赛二等奖、校大数据技术与应用竞赛三等奖',
        certs: '英语六级（CET-6）、全国计算机二级（MS Office 高级应用）、计算机程序设计员三级'
      }
    ],
    intern: [
      {
        company: '芜湖圆缘元科技有限公司',
        position: '测试实习生',
        time: '2026.07 - 2026.09',
        desc: [
          '全模块功能测试：覆盖商品、订单、营销、用户、配送5大业务模块，累计执行测试600+项，提交有效缺陷100+个，严重缺陷全部推动修复闭环，保障6项营销活动平稳上线。',
          '营销活动专项测试：重点负责新人券、0元购、拼团、预售团、邀请有礼、校园价等6大营销活动测试，基于业务规则设计多用户身份与多校区交叉场景，梳理出完整的营销活动回归检查清单。',
          '缺陷定位与效率提升：使用浏览器Network面板和抓包工具分析接口请求与响应数据，通过状态码、返回数据和错误信息判断前后端问题，为开发提供精准的问题线索，提升缺陷修复效率。',
          'AI辅助测试实践：主动探索AI工具在测试中的应用，利用大模型辅助生成测试思路、梳理边界场景、整理缺陷描述和业务规则文档；借助AI能力协助完成商品上架测试数据准备，累计辅助构造测试商品60+，提升日常测试效率约30%。'
        ]
      }
    ],
    project: [
      {
        name: 'Hadoop 分布式集群搭建与运维实践',
        start: '2024.09',
        end: '2024.10',
        desc: 'VMware虚拟机环境下搭建3节点Hadoop分布式集群（1主2从），完成HDFS分布式存储、MapReduce数据计算及YARN资源调度全流程部署与实践。\n\n集群环境搭建：配置CentOS静态IP与hosts映射，实现SSH免密登录，部署JDK与Hadoop，编写四大核心配置文件。\n\n集群运维管理：掌握集群启停操作，使用jps、hdfs dfsadmin等命令监控节点存活状态与存储情况，保障集群稳定运行。\n\n故障排查实践：通过分析NameNode、DataNode、ResourceManager日志，定位并解决DataNode启动失败、节点通信异常、YARN资源不足等问题。'
      }
    ],
    skills: {
      testBasic: '熟悉软件测试全流程（需求评审→用例设计→执行→缺陷跟踪→回归测试），掌握等价类划分、边界值分析、场景法等黑盒测试用例设计方法',
      testTools: '熟练通过抓包分析接口请求与响应，区分前端问题与后端接口错误；熟悉 Postman 接口调试，了解 Fiddler/Charles 抓包工具',
      coding: '掌握 Java、Python 基础；熟悉 MySQL（增删改查、多表连接、子查询），能独立编写 SQL 进行测试数据准备与结果验证',
      systems: '熟悉 Linux 常用命令（grep、tail、vim、ps），可通过日志定位问题；了解 Git 基本操作与 GitHub 代码托管',
      aiTools: '熟练使用 DeepSeek、Codex 等 AI 工具辅助测试用例设计、业务规则梳理与文档产出；具备调用AI接口实现自动化任务的实践经验'
    },
    honors: [
      { name: '校级三等奖学金', time: '' },
      { name: '芜湖市第十届 Office 应用技能大赛二等奖', time: '' },
      { name: '校大数据技术与应用竞赛三等奖', time: '' }
    ],
    certs: [
      { name: '英语六级（CET-6）', time: '' },
      { name: '全国计算机二级（MS Office 高级应用）', time: '' },
      { name: '计算机程序设计员三级', time: '' }
    ],
    selfEval: '做事严谨细致，对细节敏感度高，能耐心完成重复性校验工作并准确记录问题。逻辑思维与学习能力良好，能快速上手新工具和新业务流程。责任心强，善于沟通协作，乐于接受反馈并持续改进，具备较好的业务理解能力。'
  };

  var data = loadData();

  function loadData() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        var savedData = JSON.parse(saved);
        var base = JSON.parse(JSON.stringify(defaultData));
        return deepMergeData(base, savedData);
      }
    } catch (e) {
      console.warn('load error', e);
    }
    return JSON.parse(JSON.stringify(defaultData));
  }

  // 深度合并：用 saved 的值覆盖 default，但保留 default 中新的字段
  function deepMergeData(target, source) {
    for (var key in source) {
      if (!source.hasOwnProperty(key)) continue;
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key] || typeof target[key] !== 'object') {
          target[key] = {};
        }
        deepMergeData(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('save error', e);
    }
  }

  // ========== Card Layout ==========
  // Card order: personal (top), edu (upper-left), intern (upper-right),
  //              project (lower-left), skill (lower-right)
  var cardAngles = [92, 160, 20, 208, 332]; // degrees, 0 = right
  var cardRadii = [0.72, 1.28, 1.26, 1.30, 1.22];
  var cardTilts = [-1, -12, 12, -10, 10];
  var cardColors = ['#ff2e8b', '#2563eb', '#f5b800', '#9333ea', '#10b981'];

  function layoutCards() {
    var cards = document.querySelectorAll('.card[data-card]');
    var scene = document.querySelector('.scene');
    if (!scene || cards.length === 0) return;

    var sceneW = scene.offsetWidth;
    var sceneH = scene.offsetHeight;

    // Center point
    var centerX = sceneW / 2;
    var centerY = sceneH * 0.52;

    // Base radius
    var baseRadius = Math.min(sceneW * 0.36, sceneH * 0.42, 430);

    cards.forEach(function (card, i) {
      var rad = cardAngles[i] * Math.PI / 180;
      var r = baseRadius * cardRadii[i];
      var x = centerX + Math.cos(rad) * r;
      var y = centerY - Math.sin(rad) * r;

      card.style.left = x + 'px';
      card.style.top = y + 'px';
      card.style.transform = 'translate(-50%, -50%) rotate(' + cardTilts[i] + 'deg)';
    });

    // Update connection lines SVG
    var svg = document.querySelector('.lines-svg');
    if (svg) {
      var size = baseRadius * 2.4;
      svg.style.width = size + 'px';
      svg.style.height = size + 'px';
      svg.style.left = centerX + 'px';
      svg.style.top = centerY + 'px';
      svg.style.transform = 'translate(-50%, -50%)';
    }

    updateConnectionLines(baseRadius);
  }

  function updateConnectionLines(baseRadius) {
    var lines = document.querySelectorAll('.conn-line');
    var dots = document.querySelectorAll('.conn-dot');
    if (!lines.length) return;

    // Character edge radius
    var charEdgeRadius = baseRadius * 0.32;

    lines.forEach(function (line, i) {
      var rad = cardAngles[i] * Math.PI / 180;
      var r = baseRadius * cardRadii[i] * 0.82;

      var startX = Math.cos(rad) * charEdgeRadius;
      var startY = -Math.sin(rad) * charEdgeRadius;
      var endX = Math.cos(rad) * r;
      var endY = -Math.sin(rad) * r;

      line.setAttribute('x1', startX);
      line.setAttribute('y1', startY);
      line.setAttribute('x2', endX);
      line.setAttribute('y2', endY);
    });

    dots.forEach(function (dot, i) {
      var line = lines[i];
      if (line) {
        dot.setAttribute('cx', line.getAttribute('x2'));
        dot.setAttribute('cy', line.getAttribute('y2'));
      }
    });
  }

  // ========== Entrance Animation ==========
  function initEntrance() {
    var char = document.querySelector('.center-char');
    setTimeout(function () {
      char.style.transition = 'opacity 1s ease';
      char.style.opacity = '1';
    }, 200);

    var order = [0, 1, 4, 2, 3];
    var cards = document.querySelectorAll('.card[data-card]');
    order.forEach(function (idx, i) {
      var card = cards[idx];
      if (!card) return;
      setTimeout(function () {
        card.style.transition = 'opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
        card.style.opacity = '1';
      }, 500 + i * 120);
    });

    setTimeout(function () {
      var els = document.querySelectorAll('.topbar, .footer');
      els.forEach(function (el) {
        el.style.transition = 'opacity 0.6s ease';
        el.style.opacity = '1';
      });
    }, 1100);
  }

  // ========== Parallax ==========
  function initParallax() {
    var charWrap = document.querySelector('.char-wrap');
    var glowPink = document.querySelector('.bg-glow-pink');
    var glowBlue = document.querySelector('.bg-glow-blue');
    var svg = document.querySelector('.lines-svg');

    var tx = 0, ty = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', function (e) {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function loop() {
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      if (charWrap) {
        charWrap.style.marginLeft = cx * 8 + 'px';
        charWrap.style.marginTop = -cy * 5 + 'px';
      }
      if (glowPink) glowPink.style.marginLeft = cx * -15 + 'px';
      if (glowBlue) glowBlue.style.marginLeft = cx * -12 + 'px';
      if (svg) {
        svg.style.marginLeft = cx * 4 + 'px';
        svg.style.marginTop = -cy * 3 + 'px';
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ========== Code background ==========
  function initBgCode() {
    var el = document.getElementById('bgCode');
    if (!el) return;
    var lines = [
      'function loadProfile(id) {',
      '  SELECT * FROM users WHERE id = ?',
      '  return userData; }',
      'const skills = ["java", "python", "sql"];',
      'public static void main(String[] args) {',
      '  System.out.println("Hello World"); }',
      'interface DataRepository {',
      '  List<User> findAll();',
      '  Optional<User> findById(Long id); }',
      'CREATE TABLE experience (',
      '  id INT PRIMARY KEY,',
      '  company VARCHAR(255),',
      '  position VARCHAR(128),',
      '  start_date DATE, end_date DATE );',
      'async function fetchProjects() {',
      '  const res = await fetch("/api/projects");',
      '  return res.json(); }',
      '01001010 11010010 10101100',
      '11010101 00101101 11000101',
      'class Resume extends Personal {',
      '  List<Education> education;',
      '  List<Project> projects;',
      '  List<String> skills; }',
      '// Personal Archive System v1.0',
      '// Build Date: 2026.10.16',
      'int main() { return 0; }',
      'Map<String, Integer> skillMap = new HashMap<>();',
      'for (String s : skills) skillMap.put(s, level);'
    ];
    var text = '';
    for (var r = 0; r < 50; r++) {
      var line = '';
      for (var c = 0; c < 3; c++) {
        line += lines[Math.floor(Math.random() * lines.length)] + '    ';
      }
      text += line + '\n';
    }
    el.textContent = text;
  }

  // ========== Modal ==========
  var modalOverlay = document.getElementById('modalOverlay');
  var modalClose = document.getElementById('modalClose');
  var modalCancel = document.getElementById('modalCancel');
  var modalSave = document.getElementById('modalSave');
  var modalTitle = document.getElementById('modalTitle');
  var modalSub = document.getElementById('modalSubtitle') || document.getElementById('modalSub');
  var modalBody = document.getElementById('modalBody');

  var currentType = null;

  var cardConfig = {
    personal: { title: '个人信息', sub: 'PERSONAL INFO', color: '#ff2e8b' },
    edu: { title: '教育背景', sub: 'EDUCATION', color: '#2563eb' },
    intern: { title: '实习经历', sub: 'INTERNSHIP', color: '#f5b800' },
    project: { title: '项目经历', sub: 'PROJECTS', color: '#9333ea' },
    skill: { title: '技能与荣誉', sub: 'SKILLS & HONORS', color: '#10b981' }
  };

  function openModal(type) {
    currentType = type;
    var config = cardConfig[type];
    modalTitle.textContent = config.title;
    if (modalSub) modalSub.textContent = config.sub;
    modalBody.innerHTML = renderForm(type);
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Top line color
    var topline = document.querySelector('.modal-topline');
    if (topline) topline.style.background = config.color;
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    currentType = null;
  }

  function esc(s) {
    if (!s) return '';
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // ========== Render Forms ==========
  function renderForm(type) {
    if (type === 'personal') {
      return '<div class="form-grid">' +
        formField('姓名', 'name', data.personal.name) +
        formField('性别', 'gender', data.personal.gender) +
        formField('年龄', 'age', data.personal.age) +
        formField('政治面貌', 'political', data.personal.political) +
        formField('联系电话', 'phone', data.personal.phone) +
        formField('电子邮箱', 'email', data.personal.email) +
        formField('学历', 'education', data.personal.education) +
        formField('现居地', 'location', data.personal.location) +
        '</div>';
    }

    if (type === 'edu') {
      var html = '<div class="form-list" id="formList">';
      data.edu.forEach(function (ed, i) {
        html += formCardBlock([
          { label: '学校名称', field: 'school', value: ed.school },
          { label: '起止时间', field: 'time', value: ed.time },
          { label: '学历', field: 'degree', value: ed.degree },
          { label: '专业', field: 'major', value: ed.major },
          { label: '排名 / 平均分', field: 'rank', value: ed.rank, full: true },
          { label: '主修课程', field: 'courses', value: ed.courses, full: true, textarea: true, rows: 2 },
          { label: '荣誉奖项', field: 'honors', value: ed.honors, full: true, textarea: true, rows: 2 },
          { label: '资格证书', field: 'certs', value: ed.certs, full: true, textarea: true, rows: 2 }
        ], i, 'edu');
      });
      html += '</div><button class="add-btn" data-type="edu">+ 添加一条教育经历</button>';
      return html;
    }

    if (type === 'intern') {
      var html = '<div class="form-list" id="formList">';
      data.intern.forEach(function (it, i) {
        var descStr = Array.isArray(it.desc) ? it.desc.join('\n') : (it.desc || '');
        html += formCardBlock([
          { label: '公司名称', field: 'company', value: it.company },
          { label: '职位', field: 'position', value: it.position },
          { label: '起止时间', field: 'time', value: it.time },
          { label: '工作描述（每行一条）', field: 'desc', value: descStr, full: true, textarea: true, rows: 4 }
        ], i, 'intern');
      });
      html += '</div><button class="add-btn" data-type="intern">+ 添加一段实习经历</button>';
      return html;
    }

    if (type === 'project') {
      var html = '<div class="form-list" id="formList">';
      data.project.forEach(function (p, i) {
        html += formCardBlock([
          { label: '项目名称', field: 'name', value: p.name },
          { label: '开始时间', field: 'start', value: p.start },
          { label: '结束时间', field: 'end', value: p.end },
          { label: '项目描述', field: 'desc', value: p.desc, full: true, textarea: true, rows: 5 }
        ], i, 'project');
      });
      html += '</div><button class="add-btn" data-type="project">+ 添加一个项目</button>';
      return html;
    }

    if (type === 'skill') {
      var skillHtml =
        '<div class="form-group"><label class="form-label">测试基础</label>' +
        '<textarea class="form-textarea" data-skill="testBasic" rows="2">' + esc(data.skills.testBasic || '') + '</textarea></div>' +
        '<div class="form-group"><label class="form-label">测试工具</label>' +
        '<textarea class="form-textarea" data-skill="testTools" rows="2">' + esc(data.skills.testTools || '') + '</textarea></div>' +
        '<div class="form-group"><label class="form-label">编程与数据库</label>' +
        '<textarea class="form-textarea" data-skill="coding" rows="2">' + esc(data.skills.coding || '') + '</textarea></div>' +
        '<div class="form-group"><label class="form-label">系统与工具</label>' +
        '<textarea class="form-textarea" data-skill="systems" rows="2">' + esc(data.skills.systems || '') + '</textarea></div>' +
        '<div class="form-group"><label class="form-label">AI工具</label>' +
        '<textarea class="form-textarea" data-skill="aiTools" rows="2">' + esc(data.skills.aiTools || '') + '</textarea></div>';

      var honorsHtml = '<div class="form-group"><label class="form-label">荣誉奖项</label>';
      data.honors.forEach(function (h, i) {
        honorsHtml += '<div class="honor-row" data-index="' + i + '">' +
          '<input type="text" class="form-input honor-name-input" placeholder="奖项名称" value="' + esc(h.name) + '" />' +
          '<input type="text" class="form-input honor-time-input" placeholder="获奖时间" value="' + esc(h.time) + '" />' +
          '<button class="remove-honor" data-index="' + i + '">删除</button>' +
          '</div>';
      });
      honorsHtml += '<button class="add-honor-btn">+ 添加一个奖项</button></div>';

      var certsHtml = '<div class="form-group" style="margin-top:14px;"><label class="form-label">资格证书</label>';
      if (data.certs && data.certs.length) {
        data.certs.forEach(function (c, i) {
          certsHtml += '<div class="honor-row" data-cert="' + i + '">' +
            '<input type="text" class="form-input cert-name-input" placeholder="证书名称" value="' + esc(c.name) + '" />' +
            '<input type="text" class="form-input cert-time-input" placeholder="获得时间" value="' + esc(c.time) + '" />' +
            '<button class="remove-cert" data-cert="' + i + '">删除</button>' +
            '</div>';
        });
      }
      certsHtml += '<button class="add-honor-btn add-cert-btn">+ 添加一个证书</button></div>';

      var evalHtml = '<div class="form-group" style="margin-top:14px;">' +
        '<label class="form-label">自我评价</label>' +
        '<textarea class="form-textarea" data-field="selfEval" rows="4">' + esc(data.selfEval || '') + '</textarea></div>';

      return '<div class="two-col">' +
        '<div><div class="col-title">专业技能</div>' + skillHtml + '</div>' +
        '<div><div class="col-title">荣誉 & 证书</div>' + honorsHtml + certsHtml + '</div>' +
        '</div>' +
        '<div style="margin-top:20px;"><div class="col-title">自我评价</div>' + evalHtml + '</div>';
    }

    return '';
  }

  function formField(label, field, value, full) {
    return '<div class="form-group' + (full ? ' full' : '') + '">' +
      '<label class="form-label">' + label + '</label>' +
      '<input type="text" class="form-input" data-field="' + field + '" value="' + esc(value) + '" />' +
      '</div>';
  }

  function formCardBlock(fields, index, type) {
    var html = '<div class="form-card" data-index="' + index + '">' +
      '<button class="remove-card-btn" data-index="' + index + '">删除</button>';
    fields.forEach(function (f) {
      if (f.textarea) {
        html += '<div class="form-group ' + (f.full ? 'full' : '') + '">' +
          '<label class="form-label">' + f.label + '</label>' +
          '<textarea class="form-textarea" data-field="' + f.field + '" rows="' + (f.rows || 3) + '">' + esc(f.value) + '</textarea>' +
          '</div>';
      } else {
        html += '<div class="form-group ' + (f.full ? 'full' : '') + '">' +
          '<label class="form-label">' + f.label + '</label>' +
          '<input type="text" class="form-input" data-field="' + f.field + '" value="' + esc(f.value) + '" />' +
          '</div>';
      }
    });
    html += '</div>';
    return html;
  }

  // ========== Bind Form Events ==========
  function bindFormEvents(type) {
    var listTypes = ['edu', 'intern', 'project'];
    if (listTypes.indexOf(type) >= 0) {
      modalBody.querySelectorAll('.remove-card-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var card = btn.closest('.form-card');
          if (card) card.remove();
        });
      });

      var addBtn = modalBody.querySelector('.add-btn');
      if (addBtn) {
        addBtn.addEventListener('click', function () {
          var list = modalBody.querySelector('#formList');
          var idx = list.querySelectorAll('.form-card').length;
          var newHtml = '';
          if (type === 'edu') {
            newHtml = formCardBlock([
              { label: '学校名称', field: 'school', value: '' },
              { label: '起止时间', field: 'time', value: '' },
              { label: '学历', field: 'degree', value: '' },
              { label: '专业', field: 'major', value: '' },
              { label: '排名 / GPA', field: 'rank', value: '', full: true }
            ], idx, 'edu');
          } else if (type === 'intern') {
            newHtml = formCardBlock([
              { label: '公司名称', field: 'company', value: '' },
              { label: '职位', field: 'position', value: '' },
              { label: '起止时间', field: 'time', value: '' },
              { label: '工作描述（每行一条）', field: 'desc', value: '', full: true, textarea: true, rows: 4 }
            ], idx, 'intern');
          } else if (type === 'project') {
            newHtml = formCardBlock([
              { label: '项目名称', field: 'name', value: '' },
              { label: '开始时间', field: 'start', value: '' },
              { label: '结束时间', field: 'end', value: '' },
              { label: '项目描述', field: 'desc', value: '', full: true, textarea: true, rows: 5 }
            ], idx, 'project');
          }
          var temp = document.createElement('div');
          temp.innerHTML = newHtml;
          var card = temp.firstElementChild;
          list.appendChild(card);

          card.querySelector('.remove-card-btn').addEventListener('click', function () {
            card.remove();
          });

          card.scrollIntoView({ behavior: 'smooth', block: 'end' });
        });
      }
    }

    if (type === 'skill') {
      // 荣誉奖项增删
      var addHonorBtn = modalBody.querySelector('.add-honor-btn');
      if (addHonorBtn) {
        addHonorBtn.addEventListener('click', function () {
          var group = addHonorBtn.parentElement;
          var idx = group.querySelectorAll('.honor-row').length;
          var row = document.createElement('div');
          row.className = 'honor-row';
          row.dataset.index = idx;
          row.innerHTML = '<input type="text" class="form-input honor-name-input" placeholder="奖项名称" />' +
            '<input type="text" class="form-input honor-time-input" placeholder="获奖时间" />' +
            '<button class="remove-honor">删除</button>';
          group.insertBefore(row, addHonorBtn);

          row.querySelector('.remove-honor').addEventListener('click', function () {
            row.remove();
          });
        });
      }

      modalBody.querySelectorAll('.remove-honor').forEach(function (btn) {
        btn.addEventListener('click', function () {
          btn.closest('.honor-row').remove();
        });
      });

      // 资格证书增删
      var addCertBtn = modalBody.querySelector('.add-cert-btn');
      if (addCertBtn) {
        addCertBtn.addEventListener('click', function () {
          var group = addCertBtn.parentElement;
          var idx = group.querySelectorAll('[data-cert]').length;
          var row = document.createElement('div');
          row.className = 'honor-row';
          row.dataset.cert = idx;
          row.innerHTML = '<input type="text" class="form-input cert-name-input" placeholder="证书名称" />' +
            '<input type="text" class="form-input cert-time-input" placeholder="获得时间" />' +
            '<button class="remove-cert">删除</button>';
          group.insertBefore(row, addCertBtn);

          row.querySelector('.remove-cert').addEventListener('click', function () {
            row.remove();
          });
        });
      }

      modalBody.querySelectorAll('.remove-cert').forEach(function (btn) {
        btn.addEventListener('click', function () {
          btn.closest('[data-cert]').remove();
        });
      });
    }
  }

  // ========== Save ==========
  function saveCurrent() {
    if (!currentType) return;

    if (currentType === 'personal') {
      modalBody.querySelectorAll('[data-field]').forEach(function (input) {
        data.personal[input.dataset.field] = input.value;
      });
    }
    else if (currentType === 'skill') {
      // 保存技能分类
      var skillFields = ['testBasic', 'testTools', 'coding', 'systems', 'aiTools'];
      skillFields.forEach(function (key) {
        var el = modalBody.querySelector('[data-skill="' + key + '"]');
        if (el) data.skills[key] = el.value;
      });

      // 保存荣誉
      var honors = [];
      modalBody.querySelectorAll('.honor-row').forEach(function (row) {
        var n = row.querySelector('.honor-name-input').value.trim();
        var t = row.querySelector('.honor-time-input').value.trim();
        if (n || t) honors.push({ name: n, time: t });
      });
      data.honors = honors;

      // 保存证书
      var certs = [];
      modalBody.querySelectorAll('[data-cert]').forEach(function (row) {
        var n = row.querySelector('.cert-name-input').value.trim();
        var t = row.querySelector('.cert-time-input').value.trim();
        if (n || t) certs.push({ name: n, time: t });
      });
      data.certs = certs;

      // 保存自我评价
      var evalEl = modalBody.querySelector('[data-field="selfEval"]');
      if (evalEl) data.selfEval = evalEl.value;
    }
    else {
      var cards = modalBody.querySelectorAll('.form-card');
      var newList = [];
      cards.forEach(function (card) {
        var item = {};
        var hasContent = false;
        card.querySelectorAll('[data-field]').forEach(function (input) {
          var val = input.value;
          if (val.trim()) hasContent = true;
          item[input.dataset.field] = val;
        });
        if (currentType === 'intern' && item.desc) {
          item.desc = item.desc.split('\n').filter(function (s) { return s.trim(); });
        }
        if (hasContent) newList.push(item);
      });
      data[currentType] = newList;
    }

    saveData();
    closeModal();
  }

  // ========== Init ==========
  function init() {
    layoutCards();
    initBgCode();
    initEntrance();
    initParallax();

    // Card hover: brighten line
    var lines = document.querySelectorAll('.conn-line');
    document.querySelectorAll('.card[data-card]').forEach(function (card, idx) {
      card.addEventListener('mouseenter', function () {
        if (lines[idx]) {
          lines[idx].style.opacity = '1';
          lines[idx].style.strokeWidth = '3';
        }
      });
      card.addEventListener('mouseleave', function () {
        if (lines[idx]) {
          lines[idx].style.opacity = '';
          lines[idx].style.strokeWidth = '';
        }
      });
    });

    // Card click
    document.querySelectorAll('.card[data-card]').forEach(function (card) {
      card.addEventListener('click', function () {
        openModal(card.dataset.card);
        bindFormEvents(card.dataset.card);
      });
    });

    // Edit button: open personal info
    var editBtn = document.getElementById('editBtn');
    if (editBtn) {
      editBtn.addEventListener('click', function () {
        openModal('personal');
        bindFormEvents('personal');
      });
    }

    // Close modal
    modalClose.addEventListener('click', closeModal);
    modalCancel.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    // Save
    modalSave.addEventListener('click', saveCurrent);

    // Resize
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        layoutCards();
      }, 100);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();












