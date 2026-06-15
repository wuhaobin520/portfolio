// ========================================
// 设计师作品集 — 交互动效脚本
// ========================================

// ===== 霓虹预加载动画 =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // 最小显示 600ms，确保动画可见
        setTimeout(() => {
            preloader.classList.add('hidden');
            // 动画结束后移除 DOM
            setTimeout(() => {
                if (preloader.parentNode) preloader.remove();
            }, 500);
        }, 600);
    }
});

// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    sidebar.classList.toggle('active');
});

// Close menu on nav link click (mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            menuToggle.classList.remove('active');
            sidebar.classList.remove('active');
        }
    });
});

// ===== Active Nav Link on Scroll (节流优化) =====
const sections = document.querySelectorAll('section[id]');
let scrollTicking = false;

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        requestAnimationFrame(() => {
            updateActiveNav();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});

function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = '✓ 消息已发送，我会尽快回复您！';
        document.body.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('show'));

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);

        contactForm.reset();
    });
}

// ===== Smooth Scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Tiger Art Parallax on mouse move =====
const tigerArt = document.querySelector('.tiger-art');
const heroSection = document.querySelector('.hero-section');

if (heroSection && tigerArt) {
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        tigerArt.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
        tigerArt.style.transform = 'translate(0, 0)';
        tigerArt.style.transition = 'transform 0.8s ease';
        setTimeout(() => { tigerArt.style.transition = ''; }, 800);
    });
}

// ===== Close mobile sidebar when clicking outside =====
document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) &&
        !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        sidebar.classList.remove('active');
    }
});

// ===== Detail Page Hover Preview =====
const workDetailPage = document.getElementById('workDetailPage');
const detailPreview = document.getElementById('detailPreview');
let previewTimer = null;

if (workDetailPage && detailPreview) {
    workDetailPage.addEventListener('mouseenter', () => {
        clearTimeout(previewTimer);
        detailPreview.classList.add('visible');
    });

    workDetailPage.addEventListener('mouseleave', () => {
        previewTimer = setTimeout(() => {
            detailPreview.classList.remove('visible');
        }, 150);
    });

    detailPreview.addEventListener('mouseenter', () => {
        clearTimeout(previewTimer);
    });

    detailPreview.addEventListener('mouseleave', () => {
        detailPreview.classList.remove('visible');
    });
}

// ===== UI Design Hover Preview =====
const workUiDesign = document.getElementById('workUiDesign');
const uiPreview = document.getElementById('uiPreview');
let uiPreviewTimer = null;

if (workUiDesign && uiPreview) {
    workUiDesign.addEventListener('mouseenter', () => {
        clearTimeout(uiPreviewTimer);
        uiPreview.classList.add('visible');
    });

    workUiDesign.addEventListener('mouseleave', () => {
        uiPreviewTimer = setTimeout(() => {
            uiPreview.classList.remove('visible');
        }, 150);
    });

    uiPreview.addEventListener('mouseenter', () => {
        clearTimeout(uiPreviewTimer);
    });

    uiPreview.addEventListener('mouseleave', () => {
        uiPreview.classList.remove('visible');
    });
}

// ===== IP Design Hover Preview (下方展开) =====
const workIpDesign = document.getElementById('workIpDesign');
const ipPreview = document.getElementById('ipPreview');
let ipPreviewTimer = null;

if (workIpDesign && ipPreview) {
    workIpDesign.addEventListener('mouseenter', () => {
        clearTimeout(ipPreviewTimer);
        ipPreview.classList.add('visible');
    });

    workIpDesign.addEventListener('mouseleave', () => {
        ipPreviewTimer = setTimeout(() => {
            ipPreview.classList.remove('visible');
        }, 150);
    });

    ipPreview.addEventListener('mouseenter', () => {
        clearTimeout(ipPreviewTimer);
    });

    ipPreview.addEventListener('mouseleave', () => {
        ipPreview.classList.remove('visible');
    });
}

// ===== Poster Design Modal 弹窗（fixed 居中 + 遮罩） =====
const workPosterDesign = document.getElementById('workPosterDesign');
const posterPreview = document.getElementById('posterPreview');
let posterOverlay = null;
let posterPreviewTimer = null;
let posterInBody = false;

// 动态创建遮罩层（仅创建一次）
function getPosterOverlay() {
    if (!posterOverlay) {
        posterOverlay = document.createElement('div');
        posterOverlay.className = 'poster-modal-overlay';
        document.body.appendChild(posterOverlay);

        // 点击遮罩关闭弹窗
        posterOverlay.addEventListener('click', closePosterModal);
    }
    return posterOverlay;
}

function openPosterModal() {
    const overlay = getPosterOverlay();

    // 关键：将弹窗提升到 body 层级，脱离有 transform 的祖先容器
    if (!posterInBody && posterPreview) {
        document.body.appendChild(posterPreview);
        posterInBody = true;
    }

    requestAnimationFrame(() => {
        overlay.classList.add('active');
        posterPreview.classList.add('visible');
    });
}

function closePosterModal() {
    if (posterOverlay) {
        posterOverlay.classList.remove('active');
    }
    posterPreview.classList.remove('visible');

    // 动画结束后归还 DOM 到原位
    setTimeout(() => {
        if (posterInBody && posterPreview && !posterPreview.classList.contains('visible')) {
            const originalParent = document.getElementById('workPosterDesign');
            if (originalParent) {
                originalParent.appendChild(posterPreview);
                posterInBody = false;
            }
        }
    }, 400);
}

if (workPosterDesign && posterPreview) {
    workPosterDesign.addEventListener('mouseenter', () => {
        clearTimeout(posterPreviewTimer);
        openPosterModal();
    });

    workPosterDesign.addEventListener('mouseleave', () => {
        posterPreviewTimer = setTimeout(() => {
            closePosterModal();
        }, 180);
    });

    // 鼠标进入弹窗区域时取消关闭计时器
    posterPreview.addEventListener('mouseenter', () => {
        clearTimeout(posterPreviewTimer);
    });

    // 鼠标离开弹窗区域后关闭
    posterPreview.addEventListener('mouseleave', () => {
        posterPreviewTimer = setTimeout(() => {
            closePosterModal();
        }, 120);
    });

    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && posterPreview.classList.contains('visible')) {
            closePosterModal();
        }
    });
}

// ===== 05 商业插画 Hover Preview（右侧弹出 3×3 网格） =====
const workIllustration = document.getElementById('workIllustrationPoster');
const illustPreview = document.getElementById('illustPreview');
let illustPreviewTimer = null;
let illustInBody = false;

function openIllustPreview() {
    // 将弹窗提升到 body 层级（避免父元素 overflow 裁剪）
    if (!illustInBody && illustPreview) {
        document.body.appendChild(illustPreview);
        illustInBody = true;
    }

    // 定位：左对齐卡片，弹窗顶部与副标题行对齐
    const cardRect = workIllustration.getBoundingClientRect();
    const categoryEl = workIllustration.querySelector('.work-category');
    const catRect = categoryEl ? categoryEl.getBoundingClientRect() : null;

    let left = catRect ? catRect.left : cardRect.left;
    let top = catRect ? catRect.top : (cardRect.bottom + 16);

    // 左边界防溢出
    if (left < 10) left = 10;

    illustPreview.style.left = left + 'px';
    illustPreview.style.top = top + 'px';

    requestAnimationFrame(() => {
        illustPreview.classList.add('visible');
    });
}

function closeIllustPreview() {
    illustPreview.classList.remove('visible');

    // 动画结束后归还 DOM
    setTimeout(() => {
        if (illustInBody && illustPreview && !illustPreview.classList.contains('visible')) {
            const originalParent = document.getElementById('workIllustrationPoster');
            if (originalParent) {
                originalParent.appendChild(illustPreview);
                illustInBody = false;
            }
        }
    }, 350);
}

if (workIllustration && illustPreview) {
    workIllustration.addEventListener('mouseenter', () => {
        clearTimeout(illustPreviewTimer);
        openIllustPreview();
    });

    workIllustration.addEventListener('mouseleave', () => {
        illustPreviewTimer = setTimeout(() => {
            closeIllustPreview();
        }, 150);
    });

    // 鼠标移入弹窗内保持显示
    illustPreview.addEventListener('mouseenter', () => {
        clearTimeout(illustPreviewTimer);
    });

    illustPreview.addEventListener('mouseleave', () => {
        illustPreviewTimer = setTimeout(() => {
            closeIllustPreview();
        }, 120);
    });

    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && illustPreview.classList.contains('visible')) {
            closeIllustPreview();
        }
    });

    // 移动端点击切换弹窗（替代 hover）
    workIllustration.addEventListener('click', (e) => {
        if (window.innerWidth > 768) return; // 桌面端保持 hover
        e.stopPropagation();
        if (illustPreview.classList.contains('visible')) {
            closeIllustPreview();
        } else {
            openIllustPreview();
        }
    });

    // 点击弹窗外部关闭（移动端）
    document.addEventListener('click', (e) => {
        if (window.innerWidth > 768) return;
        if (illustPreview.classList.contains('visible') &&
            !illustPreview.contains(e.target) &&
            !workIllustration.contains(e.target)) {
            closeIllustPreview();
        }
    });
}

// ===== 移动端：所有 hover 预览改为点击弹出 =====
function setupMobileClickPreview(cardId, previewId) {
    const card = document.getElementById(cardId);
    const preview = document.getElementById(previewId);
    if (!card || !preview) return;

    card.addEventListener('click', (e) => {
        if (window.innerWidth > 768) return;
        e.stopPropagation();
        preview.classList.toggle('visible');
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth > 768) return;
        if (preview.classList.contains('visible') &&
            !preview.contains(e.target) &&
            !card.contains(e.target)) {
            preview.classList.remove('visible');
        }
    });
}

// 为其他预览卡片注册移动端点击切换
setupMobileClickPreview('workIpDesign', 'ipPreview');
setupMobileClickPreview('workDetailPage', 'detailPreview');
setupMobileClickPreview('workUiDesign', 'uiPreview');

// 03 海报设计：移动端点击弹出 Modal
const posterCard = document.getElementById('workPosterDesign');
if (posterCard) {
    posterCard.addEventListener('click', (e) => {
        if (window.innerWidth > 768) return;
        e.stopPropagation();
        if (posterPreview.classList.contains('visible')) {
            closePosterModal();
        } else {
            openPosterModal();
        }
    });
}


// ========================================
// 全局星空呼吸闪烁背景粒子
// ========================================
(function createStars() {
    const container = document.getElementById('stars-canvas');
    if (!container) return;

    const STAR_COUNT = 200;
    const FLOAT_RATIO = 0.2;

    // 星星色调池：默认暖白 / 蓝b / 紫p / 金g / 粉f
    const colorPool = ['', 'b', 'p', 'g', 'f'];
    // 权重：暖白占多，彩色点缀
    function pickColor() {
        const r = Math.random();
        if (r < 0.50) return '';      // 50% 暖白
        if (r < 0.70) return 'b';     // 20% 冷蓝
        if (r < 0.82) return 'p';     // 12% 淡紫
        if (r < 0.91) return 'g';     // 9%  淡金
        return 'f';                     // 9%  淡粉
    }

    const frag = document.createDocumentFragment();

    for (let i = 0; i < STAR_COUNT; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 3 + 1.7;               // 1.7px ~ 4.7px
        const left = Math.random() * 100;
        const top  = Math.random() * 100;
        const dur  = (Math.random() * 4 + 2).toFixed(2);
        const delay = (Math.random() * 5).toFixed(2);
        const isFloat = Math.random() < FLOAT_RATIO;
        const color = pickColor();

        star.className = 'star' + (isFloat ? ' star-float' : ' star-breathe-only');
        if (color) star.setAttribute('data-c', color);
        star.style.width  = size + 'px';
        star.style.height = size + 'px';
        star.style.left   = left + '%';
        star.style.top    = top + '%';
        star.style.setProperty('--dur', dur + 's');
        star.style.setProperty('--delay', delay + 's');
        star.style.setProperty('--drift-dur', (Math.random() * 6 + 5).toFixed(1) + 's');

        frag.appendChild(star);
    }

    container.appendChild(frag);
})();

// ========================================
// 修复微信二维码图片加载
// ========================================
(function fixQrcodeImg() {
    const qrcodeImg = document.querySelector('.qrcode-img');
    if (!qrcodeImg) return;

    // 尝试直接加载，失败则使用 data URL 或备用方案
    qrcodeImg.onerror = function() {
        // 用 fetch 转为 base64 绕过路径编码问题
        fetch('25a467e45dc3d0ad68cc1d0f0034af5d.jpg')
            .then(r => r.ok ? r.blob() : Promise.reject())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                this.src = url;
                this.onerror = null;
            })
            .catch(() => {
                // 最终兜底：显示提示文字
                this.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.textContent = '微信二维码加载失败';
                fallback.style.cssText = 'color:var(--text-dim);font-size:0.85rem;text-align:center;padding:2rem;';
                this.parentNode.insertBefore(fallback, this.nextSibling);
            });
    };
})();
