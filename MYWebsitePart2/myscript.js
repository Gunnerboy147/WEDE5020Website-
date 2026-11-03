/**
 * Ponelopele Secondary School - Official External JavaScript
 * Based on HTML, CSS and JavaScript Tutorial (learn coding guide)
 */

// Global state and configurations
var currentSlideIndex = 0;
var slideTimer = null;
var isSlidePlaying = true;

// Default slide images (local guaranteed high-res images)
var DEFAULT_SLIDE_IMAGES = [
  'homepage.jpg',
  'homepage2.jpg',
  'matriclearners.jpg',
  'edu.jpg'
];

// Fallback image error handler
function handleImgError(img) {
  // Prevent infinite loops
  if (img.dataset.hasFailedTwice) {
    img.onerror = null;
    return;
  }
  if (!img.dataset.hasFailedOnce) {
    img.dataset.hasFailedOnce = 'true';
    var altSrc = img.getAttribute('data-alt-src');
    if (altSrc) {
      img.src = altSrc;
      return;
    }
  }
  // Repeat school badge if image cannot be loaded
  img.dataset.hasFailedTwice = 'true';
  img.src = 'shoolbadge.jpg';
}

// ----------------------------------------------------
// Page Navigation Handler
// ----------------------------------------------------
function switchPage(pageId, anchorId) {
  var mobileDrawer = document.getElementById('mobile-drawer-menu');
  if (mobileDrawer) {
    mobileDrawer.classList.add('hidden');
  }

  var pages = document.querySelectorAll('.page-view');
  for (var i = 0; i < pages.length; i++) {
    if (pages[i].id === pageId + '-page') {
      pages[i].classList.add('active-page');
    } else {
      pages[i].classList.remove('active-page');
    }
  }

  var navButtons = document.querySelectorAll('.nav-tab-btn');
  for (var j = 0; j < navButtons.length; j++) {
    var btn = navButtons[j];
    if (btn.id === 'nav-btn-' + pageId) {
      btn.classList.add('bg-[#C8102E]', 'text-white', 'shadow-md');
      btn.classList.remove('text-stone-200');
    } else {
      btn.classList.remove('bg-[#C8102E]', 'text-white', 'shadow-md');
      btn.classList.add('text-stone-200');
    }
  }

  if (pageId === 'admin-portal') {
    syncAdminPortalUI();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (anchorId) {
    setTimeout(function() {
      var el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  }
}

function toggleMobileMenu() {
  var drawer = document.getElementById('mobile-drawer-menu');
  if (drawer) {
    drawer.classList.toggle('hidden');
  }
}

// ----------------------------------------------------
// Hero Slideshow Functions
// ----------------------------------------------------
function updateSlide(index) {
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.slider-dot-indicator');
  var counter = document.getElementById('slider-counter-display');

  if (slides.length === 0) return;
  currentSlideIndex = (index + slides.length) % slides.length;

  for (var i = 0; i < slides.length; i++) {
    if (i === currentSlideIndex) {
      slides[i].classList.add('active-slide');
    } else {
      slides[i].classList.remove('active-slide');
    }
  }

  for (var d = 0; d < dots.length; d++) {
    if (d === currentSlideIndex) {
      dots[d].classList.add('w-9', 'bg-[#C8102E]');
      dots[d].classList.remove('w-2.5', 'bg-white/40');
    } else {
      dots[d].classList.remove('w-9', 'bg-[#C8102E]');
      dots[d].classList.add('w-2.5', 'bg-white/40');
    }
  }

  if (counter) {
    counter.textContent = '0' + (currentSlideIndex + 1) + ' / 0' + slides.length;
  }
}

function nextSlide() {
  updateSlide(currentSlideIndex + 1);
}

function prevSlide() {
  updateSlide(currentSlideIndex - 1);
}

function goToSlide(idx) {
  updateSlide(idx);
}

function startSlideAutoplay() {
  if (slideTimer) clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 5000);
  isSlidePlaying = true;
  var btn = document.getElementById('slider-play-pause-btn');
  if (btn) btn.innerHTML = '❚❚ <span class="hidden sm:inline">Auto-sliding</span>';
}

function stopSlideAutoplay() {
  if (slideTimer) clearInterval(slideTimer);
  slideTimer = null;
  isSlidePlaying = false;
  var btn = document.getElementById('slider-play-pause-btn');
  if (btn) btn.innerHTML = '▶ <span class="hidden sm:inline">Paused</span>';
}

function toggleSlidePlay() {
  if (isSlidePlaying) {
    stopSlideAutoplay();
  } else {
    startSlideAutoplay();
  }
}

// ----------------------------------------------------
// Educational Class Boxes Switcher
// ----------------------------------------------------
var CLASS_BOX_DETAILS = {
  books: {
    emoji: "📚",
    title: "Academic Books & Digital Resource Utilization",
    image: "2ourlearners.jpg",
    altSrc: "shoolbadge.jpg",
    desc: "At Ponelopele Secondary School, books and digital learning are active engines of transformation. Every learner receives a comprehensive personal suite of CAPS textbooks covering Pure Mathematics, Physical Sciences, Accounting, Economics, and Languages. In addition, physical textbooks are supercharged with digital e-readers, interactive science simulations, and past exam question banks.",
    points: [
      "100% textbook allocation across Grade 8 through 12.",
      "Cloud-connected e-readers with multimedia science laboratories.",
      "Dedicated daily morning reading hour and peer study groups."
    ]
  },
  learners: {
    emoji: "🎓",
    title: "Our Learners, Character & Daily Discipline",
    image: "homepage2.jpg",
    altSrc: "shoolbadge.jpg",
    desc: "With over 1,600 learners hailing from Kaalfontein, Ebony Park, Ivory Park, and greater Midrand, Ponelopele cultivates a culture of academic rigor and mutual respect. Learners wear the red-and-white school badge with great pride, adhering to a strict code of conduct and student leadership councils.",
    points: [
      "Punctuality and zero-tolerance policy towards school disruptions.",
      "Active Representative Council of Learners (RCL) empowering youth leadership.",
      "After-school STEM tutoring and debate clubs."
    ]
  },
  achievements: {
    emoji: "🏆",
    title: "District Trophies & Academic Laureates",
    image: "1achevements.jpg",
    altSrc: "shoolbadge.jpg",
    desc: "Ponelopele Secondary School has repeatedly won the Gauteng District Top Performing Secondary School accolade. In recent years, our Matriculants achieved a staggering 95.9% pass rate, producing 66+ distinctions in STEM disciplines and securing full university bursaries.",
    points: [
      "95.9% Matric pass rate, placing the school in the top quintile in Gauteng.",
      "Multiple provincial science fair and Olympiad gold laureates.",
      "Over 70% Bachelor Degree entrance pass rate for graduating matriculants."
    ]
  },
  oracle: {
    emoji: "🏛️",
    title: "School Heritage & Public-Private Origins",
    image: "mecofedu.jp.jpg",
    altSrc: "shoolbadge.jpg",
    desc: "Established in March 2006 through a landmark corporate social investment between Oracle Corporation South Africa and the Gauteng Department of Education, our school represents educational empowerment at its finest. Today, Ponelopele Secondary School continues this proud tradition of excellence under Principal Mr. Navhatakali Edward Netshianzwane.",
    points: [
      "9 fully equipped digital computer laboratories with broadband access.",
      "Regular visits from the Gauteng MEC of Education and technical directors.",
      "Sustainable infrastructure designed for long-term community empowerment."
    ]
  }
};

function selectClassBox(key) {
  var data = CLASS_BOX_DETAILS[key];
  var panel = document.getElementById('class-box-dynamic-content');
  if (!data || !panel) return;

  var pointsHtml = '';
  for (var i = 0; i < data.points.length; i++) {
    pointsHtml += '<div class="flex items-start gap-2.5 p-2.5 rounded-lg bg-stone-50 border border-stone-200/80 text-xs">' +
                    '<span class="w-5 h-5 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">' + (i + 1) + '</span>' +
                    '<span class="text-stone-800 leading-relaxed font-medium">' + data.points[i] + '</span>' +
                  '</div>';
  }

  panel.innerHTML = 
    '<div class="w-full lg:w-5/12">' +
      '<div class="relative rounded-2xl overflow-hidden shadow-xl border-2 border-stone-200">' +
        '<img src="' + data.image + '" data-alt-src="' + data.altSrc + '" onerror="handleImgError(this)" alt="' + data.title + '" class="w-full h-72 sm:h-80 object-cover" />' +
        '<div class="absolute top-4 left-4 text-3xl p-2.5 rounded-xl bg-white/95 shadow-md">' + data.emoji + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="w-full lg:w-7/12 space-y-4">' +
      '<div class="flex items-center gap-2">' +
        '<span class="text-3xl">' + data.emoji + '</span>' +
        '<h3 class="text-2xl sm:text-3xl font-black text-stone-900 font-[\'Montserrat\']">' + data.title + '</h3>' +
      '</div>' +
      '<p class="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">' + data.desc + '</p>' +
      '<div class="pt-2">' +
        '<h4 class="text-xs font-black uppercase tracking-wider text-[#C8102E] mb-2">✓ Operational Standards &amp; Impact</h4>' +
        '<div class="space-y-2">' + pointsHtml + '</div>' +
      '</div>' +
    '</div>';

  var container = document.getElementById('class-box-details-panel');
  if (container) {
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ----------------------------------------------------
// Admissions Page Sub-Tab Switcher
// ----------------------------------------------------
function switchAdmissionsTab(tabId) {
  var tabContents = document.querySelectorAll('.admissions-tab-content');
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.add('hidden');
  }

  var activeContent = document.getElementById('admissions-tab-' + tabId);
  if (activeContent) {
    activeContent.classList.remove('hidden');
  }

  var tabButtons = document.querySelectorAll('.admissions-subtab-btn');
  for (var j = 0; j < tabButtons.length; j++) {
    var btn = tabButtons[j];
    if (btn.id === 'btn-subtab-' + tabId) {
      btn.classList.add('bg-[#C8102E]', 'text-white', 'shadow');
      btn.classList.remove('bg-stone-100', 'text-stone-700');
    } else {
      btn.classList.remove('bg-[#C8102E]', 'text-white', 'shadow');
      btn.classList.add('bg-stone-100', 'text-stone-700');
    }
  }
}

// ----------------------------------------------------
// Learner ID Pass / Fail Checker Function (IF STATEMENTS)
// As instructed:
// - Enter Learner ID with placeholder e.g. 08052263*****
// - Do not accept any ID that starts with any number besides 0
// - Do not accept any ID that has less than 13 numbers for the SA ID
// - If no such ID in school: red colour message "There is no such ID in the school"
// - If ID in school: green colour message "ID found"
// - Passed indicated in green, failed indicated in red
// - Only correct ID that goes through is admin ID: 0804226399082
// ----------------------------------------------------
function checkLearnerPassStatus() {
  var idInput = document.getElementById('learner-id-check-input');
  var resultBox = document.getElementById('learner-id-check-result');
  if (!idInput || !resultBox) return;

  var id = idInput.value.trim();

  // Reset display
  resultBox.style.display = 'block';

  // 1. if statement: empty check
  if (id === "") {
    resultBox.className = "id-status-notfound";
    resultBox.innerHTML = "<span style='color: red; font-weight: bold;'>⚠️ Please enter a 13-digit South African Learner ID Number.</span>";
    return;
  }

  // 2. if statement: does not accept any ID that starts with any number besides 0
  if (id.charAt(0) !== '0') {
    resultBox.className = "id-status-notfound";
    resultBox.innerHTML = "<span style='color: red; font-weight: bold;'>✗ Invalid ID: South African Learner ID must start with the number 0 (e.g. 08052263*****). IDs beginning with any other number are not accepted.</span>";
    return;
  }

  // 3. if statement: does not accept any ID that has less than 13 numbers
  if (id.length < 13 || id.length > 13 || isNaN(Number(id))) {
    resultBox.className = "id-status-notfound";
    resultBox.innerHTML = "<span style='color: red; font-weight: bold;'>✗ Invalid ID Length: South African IDs must contain exactly 13 digits. You entered " + id.length + " character(s).</span>";
    return;
  }

  // 4. if statement: check against school records
  // Correct ID in the school system: Admin ID 0804226399082
  if (id === "0804226399082") {
    // Registered admin learner record: PASSED
    resultBox.className = "id-status-found";
    resultBox.innerHTML = 
      "<div style='color: green; font-weight: 800; font-size: 16px; margin-bottom: 8px;'>✓ ID found</div>" +
      "<div style='color: #111827; font-size: 13px; line-height: 1.6;'>" +
        "<table style='width: 100%; border-collapse: collapse; margin-top: 6px;'>" +
          "<tr><td style='padding: 4px; font-weight: bold; width: 35%;'>Learner ID:</td><td style='padding: 4px; font-family: monospace;'>" + id + "</td></tr>" +
          "<tr><td style='padding: 4px; font-weight: bold;'>Learner Name:</td><td style='padding: 4px;'>Onalenna Mpofu (Administrator &amp; Matriculant)</td></tr>" +
          "<tr><td style='padding: 4px; font-weight: bold;'>Grade &amp; Phase:</td><td style='padding: 4px;'>Grade 12 (NSC Final Year)</td></tr>" +
          "<tr><td style='padding: 4px; font-weight: bold;'>Matric Status:</td><td style='padding: 4px;'><span style='color: green; font-weight: 800; background-color: #DCFCE7; padding: 2px 8px; border-radius: 6px;'>✓ PASSED (Bachelor's Degree Pass)</span></td></tr>" +
          "<tr><td style='padding: 4px; font-weight: bold;'>Endorsement:</td><td style='padding: 4px; color: green; font-weight: bold;'>Eligible for Direct University Degree Entrance</td></tr>" +
        "</table>" +
        "<div style='margin-top: 10px; padding: 10px; background-color: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px;'>" +
          "<strong style='color: #166534;'>Official Subject Statement of Results:</strong><br>" +
          "• Home Language (Sepedi HL): <strong>81%</strong> (Level 7 - Distinction)<br>" +
          "• First Additional Language (English FAL): <strong>78%</strong> (Level 6 - Meritorious)<br>" +
          "• Pure Mathematics: <strong>88%</strong> (Level 7 - Distinction)<br>" +
          "• Physical Sciences: <strong>84%</strong> (Level 7 - Distinction)<br>" +
          "• Accounting: <strong>82%</strong> (Level 7 - Distinction)<br>" +
          "• Life Sciences: <strong>79%</strong> (Level 6 - Meritorious)<br>" +
          "• Life Orientation: <strong>91%</strong> (Level 7 - Distinction)<br>" +
          "<span style='color: green; font-weight: bold; display: inline-block; margin-top: 4px;'>Total Distinctions: 5 | Qualified for University Admission</span>" +
        "</div>" +
      "</div>";
  } else if (id === "0801015099081") {
    // Demonstration failed student record
    resultBox.className = "id-status-notfound";
    resultBox.innerHTML = 
      "<div style='color: green; font-weight: 800; font-size: 16px; margin-bottom: 8px;'>✓ ID found</div>" +
      "<div style='color: #111827; font-size: 13px; line-height: 1.6;'>" +
        "<table style='width: 100%; border-collapse: collapse; margin-top: 6px;'>" +
          "<tr><td style='padding: 4px; font-weight: bold; width: 35%;'>Learner ID:</td><td style='padding: 4px; font-family: monospace;'>" + id + "</td></tr>" +
          "<tr><td style='padding: 4px; font-weight: bold;'>Learner Status:</td><td style='padding: 4px;'><span style='color: red; font-weight: 800; background-color: #FEE2E2; padding: 2px 8px; border-radius: 6px;'>✗ FAILED (Did Not Meet Minimum Pass Requirements)</span></td></tr>" +
        "</table>" +
        "<p style='color: red; margin-top: 8px;'><strong>Academic Warning:</strong> Home Language mark achieved was below 40% (Level 2). Under national DBE regulations, obtaining less than 40% in Home Language results in an automatic fail for the academic year.</p>" +
      "</div>";
  } else {
    // Any other 13 digit ID starting with 0 that is not in the system:
    resultBox.className = "id-status-notfound";
    resultBox.innerHTML = "<span style='color: red; font-weight: 800; font-size: 15px;'>✗ There is no such ID in the school system</span>";
  }
}

// ----------------------------------------------------
// Smart Search Index & Handler
// ----------------------------------------------------
var SITE_SEARCH_INDEX = [
  { title: "Admissions & Learner Registration", page: "admissions", category: "Admissions", snippet: "Online learner registration, documentation checklist, and feeder zone criteria for Kaalfontein & Midrand." },
  { title: "Learner Pass / Fail Check", page: "admissions", category: "Admissions", snippet: "Check learner examination results by entering your 13-digit South African ID." },
  { title: "Learner Requirements & 7-Point Scale", page: "admissions", category: "Admissions", snippet: "The 7-point achievement scale from Level 7 (80-100%) to Level 1, minimum pass levels, and matric pass types." },
  { title: "Matric Pass Rate (95.9%)", page: "home", category: "Academics", snippet: "Record-breaking 95.9% matric pass rate with 66+ distinctions in STEM disciplines." },
  { title: "Academic Books & Digital Resources", page: "about", category: "Academics", snippet: "100% textbook allocation, daily reading hours, and digital e-libraries for all learners." },
  { title: "Our Learners, Character & Discipline", page: "about", category: "Student Life", snippet: "Over 1,600 united learners wearing the red-and-white badge with pride in Kaalfontein." },
  { title: "Principal Mr. Navhatakali Edward Netshianzwane", page: "home", category: "Leadership", snippet: "Leadership address, school values, and academic vision under Principal Mr. N. E. Netshianzwane." },
  { title: "Contact Details & Campus Map", page: "contact", category: "Contact", snippet: "Phone 082 582 7953, 29th September St, Kaalfontein, Midrand, 13 minutes from central Midrand." },
  { title: "Parent & Guardian Information Hub", page: "parent-portal", category: "Portals", snippet: "Inspect learner requirements, report cards, circulars, and attendance policies." },
  { title: "Administrator Portal (Restricted)", page: "admin-portal", category: "Portals", snippet: "Administrator session for Onalenna Mpofu to manage hero slides and admissions desk." },
  { title: "GitHub Repository (WEDE5020Website)", page: "home", category: "WEDE5020", snippet: "WEDE5020 assignment code repository and GitHub Pages live deployment submission links." }
];

function syncMobileSearch(val) {
  var searchInput = document.getElementById('site-smart-search-input');
  if (searchInput) {
    searchInput.value = val;
    runSearch(val);
  }
}

function runSearch(query) {
  var searchDropdown = document.getElementById('search-dropdown-results');
  var searchClearBtn = document.getElementById('search-clear-btn');

  var trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    if (searchDropdown) searchDropdown.classList.add('hidden');
    if (searchClearBtn) searchClearBtn.classList.add('hidden');
    return;
  }

  if (searchClearBtn) searchClearBtn.classList.remove('hidden');
  if (!searchDropdown) return;

  searchDropdown.classList.remove('hidden');

  var matches = [];
  for (var i = 0; i < SITE_SEARCH_INDEX.length; i++) {
    var item = SITE_SEARCH_INDEX[i];
    if (item.title.toLowerCase().indexOf(trimmed) !== -1 ||
        item.snippet.toLowerCase().indexOf(trimmed) !== -1 ||
        item.category.toLowerCase().indexOf(trimmed) !== -1) {
      matches.push(item);
    }
  }

  if (matches.length > 0) {
    var html = '';
    for (var m = 0; m < matches.length; m++) {
      var itemMatch = matches[m];
      html += '<li>' +
                '<button type="button" onclick="switchPage(\'' + itemMatch.page + '\'); closeSearchDropdown();" class="w-full px-4 py-3 text-left hover:bg-red-50 flex items-start gap-3 transition-colors cursor-pointer border-b border-stone-100">' +
                  '<div class="mt-1 p-1 rounded bg-stone-100 text-[#C8102E] font-bold text-xs">#</div>' +
                  '<div class="flex-1 min-w-0">' +
                    '<div class="flex items-center gap-2">' +
                      '<span class="text-xs sm:text-sm font-bold text-stone-900">' + itemMatch.title + '</span>' +
                      '<span class="text-[10px] uppercase font-semibold px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full">' + itemMatch.category + '</span>' +
                    '</div>' +
                    '<p class="text-xs text-stone-600 mt-0.5">' + itemMatch.snippet + '</p>' +
                  '</div>' +
                '</button>' +
              '</li>';
    }

    searchDropdown.innerHTML = 
      '<div class="px-4 py-2 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs font-semibold text-stone-600">' +
        '<span>FOUND ' + matches.length + ' RESULT(S)</span>' +
        '<span class="text-[#C8102E]">Click to open</span>' +
      '</div>' +
      '<ul class="max-h-80 overflow-y-auto divide-y divide-stone-100">' + html + '</ul>';

  } else {
    searchDropdown.innerHTML = 
      '<div class="p-6 text-center">' +
        '<div class="w-12 h-12 rounded-full bg-red-100 text-[#C8102E] flex items-center justify-center mx-auto mb-3 text-xl font-bold">!</div>' +
        '<h4 class="text-base font-bold text-stone-900">Result not found</h4>' +
        '<p class="text-xs text-stone-500 mt-1 max-w-xs mx-auto">' +
          'No school records or pages matched "' + query + '".' +
        '</p>' +
        '<div class="mt-4 pt-3 border-t border-stone-100 text-left">' +
          '<p class="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">Suggested Searches:</p>' +
          '<div class="flex flex-wrap gap-1.5">' +
            '<button type="button" onclick="searchForTerm(\'Admissions\')" class="text-xs px-2.5 py-1 bg-stone-100 hover:bg-[#C8102E] hover:text-white rounded text-stone-700">Admissions</button>' +
            '<button type="button" onclick="searchForTerm(\'Learner Requirements\')" class="text-xs px-2.5 py-1 bg-stone-100 hover:bg-[#C8102E] hover:text-white rounded text-stone-700">Learner Requirements</button>' +
            '<button type="button" onclick="searchForTerm(\'Matric\')" class="text-xs px-2.5 py-1 bg-stone-100 hover:bg-[#C8102E] hover:text-white rounded text-stone-700">Matric</button>' +
            '<button type="button" onclick="searchForTerm(\'Principal\')" class="text-xs px-2.5 py-1 bg-stone-100 hover:bg-[#C8102E] hover:text-white rounded text-stone-700">Principal</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }
}

function searchForTerm(term) {
  var searchInput = document.getElementById('site-smart-search-input');
  if (searchInput) {
    searchInput.value = term;
    runSearch(term);
  }
}

function closeSearchDropdown() {
  var searchDropdown = document.getElementById('search-dropdown-results');
  var searchInput = document.getElementById('site-smart-search-input');
  var searchClearBtn = document.getElementById('search-clear-btn');

  if (searchDropdown) searchDropdown.classList.add('hidden');
  if (searchInput) searchInput.value = '';
  if (searchClearBtn) searchClearBtn.classList.add('hidden');
}

// ----------------------------------------------------
// GitHub Repository & Deployment (WEDE5020Website-)
// ----------------------------------------------------
var GITHUB_REPO_NAME = "WEDE5020Website-";

function getGitHubUsername() {
  var stored = localStorage.getItem('ponelopele_github_username');
  if (stored && stored.trim() && stored.trim() !== "onalennampofu320") {
    return stored.trim();
  }
  return "Gunnerboy147";
}

function getGitHubRepoUrl() {
  return "https://github.com/" + getGitHubUsername() + "/" + GITHUB_REPO_NAME;
}

function getGitHubPagesUrl() {
  return "https://" + getGitHubUsername() + ".github.io/" + GITHUB_REPO_NAME + "/";
}

function getGitHubProfileUrl() {
  return "https://github.com/" + getGitHubUsername();
}

function getGitHubCreateRepoUrl() {
  return "https://github.com/new?name=" + GITHUB_REPO_NAME;
}

function openGitHubModal() {
  var modal = document.getElementById('github-links-modal');
  if (!modal) return;
  syncGitHubModalValues();
  modal.classList.remove('hidden');
}

function closeGitHubModal() {
  var modal = document.getElementById('github-links-modal');
  if (modal) modal.classList.add('hidden');
}

function syncGitHubModalValues() {
  var username = getGitHubUsername();
  var userInput = document.getElementById('gh-username-input');
  if (userInput && document.activeElement !== userInput) {
    userInput.value = username;
  }

  var repoUrl = getGitHubRepoUrl();
  var pagesUrl = getGitHubPagesUrl();
  var profileUrl = getGitHubProfileUrl();
  var createUrl = getGitHubCreateRepoUrl();

  var repoLink = document.getElementById('gh-repo-url-display');
  var pagesLink = document.getElementById('gh-pages-url-display');
  var openRepoBtn = document.getElementById('gh-open-repo-btn');
  var openPagesBtn = document.getElementById('gh-open-pages-btn');
  var createRepoBtn = document.getElementById('gh-create-repo-btn');
  var profileBtn = document.getElementById('gh-profile-btn');
  var headerLink = document.getElementById('header-github-direct-link');

  if (repoLink) repoLink.textContent = repoUrl;
  if (pagesLink) pagesLink.textContent = pagesUrl;
  if (openRepoBtn) {
    openRepoBtn.href = repoUrl;
    openRepoBtn.title = "Open " + repoUrl;
  }
  if (openPagesBtn) {
    openPagesBtn.href = pagesUrl;
    openPagesBtn.title = "Open " + pagesUrl;
  }
  if (createRepoBtn) {
    createRepoBtn.href = createUrl;
  }
  if (profileBtn) {
    profileBtn.href = profileUrl;
    profileBtn.textContent = "@" + username;
  }
  if (headerLink) {
    headerLink.href = repoUrl;
  }

  // Sync footer links
  var footerRepo = document.getElementById('footer-github-repo-link');
  var footerPages = document.getElementById('footer-github-pages-link');
  if (footerRepo) {
    footerRepo.href = repoUrl;
    footerRepo.textContent = repoUrl + " ↗";
  }
  if (footerPages) {
    footerPages.href = pagesUrl;
    footerPages.textContent = pagesUrl + " ↗";
  }
}

function handleGitHubUsernameChange(newVal) {
  var cleaned = newVal.trim().replace(/^@/, '');
  if (!cleaned) cleaned = "onalennampofu320";
  try {
    localStorage.setItem('ponelopele_github_username', cleaned);
  } catch (e) {}
  syncGitHubModalValues();
}

function copyTextToClipboard(text, btnElement) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      showCopiedFeedback(btnElement);
    }).catch(function() {
      fallbackCopyText(text, btnElement);
    });
  } else {
    fallbackCopyText(text, btnElement);
  }
}

function fallbackCopyText(text, btnElement) {
  var temp = document.createElement("input");
  temp.value = text;
  document.body.appendChild(temp);
  temp.select();
  try {
    document.execCommand("copy");
    showCopiedFeedback(btnElement);
  } catch (err) {}
  document.body.removeChild(temp);
}

function showCopiedFeedback(btnElement) {
  if (!btnElement) return;
  var origHtml = btnElement.innerHTML;
  btnElement.innerHTML = "✓ Copied!";
  btnElement.classList.add("bg-emerald-600", "text-white");
  setTimeout(function() {
    btnElement.innerHTML = origHtml;
    btnElement.classList.remove("bg-emerald-600", "text-white");
  }, 2200);
}

// ----------------------------------------------------
// Google Chrome Local SEO Simulation Modal
// ----------------------------------------------------
function openGoogleSeoModal() {
  var modal = document.getElementById('local-seo-preview-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeGoogleSeoModal() {
  var modal = document.getElementById('local-seo-preview-modal');
  if (modal) modal.classList.add('hidden');
}

// ----------------------------------------------------
// Social Modal & External Links Handler
// ----------------------------------------------------
function openSocialModal(platform, url, note) {
  if (platform.toLowerCase() === 'github') {
    openGitHubModal();
    return;
  }
  var modal = document.getElementById('social-info-modal');
  var title = document.getElementById('social-modal-title');
  var desc = document.getElementById('social-modal-desc');
  var urlBox = document.getElementById('social-modal-url');
  var proceedBtn = document.getElementById('social-modal-proceed-btn');

  if (!modal) return;

  if (title) title.textContent = 'External Link: ' + platform;
  if (urlBox) urlBox.textContent = url;
  if (proceedBtn) {
    proceedBtn.href = url;
    proceedBtn.setAttribute('target', '_blank');
    proceedBtn.setAttribute('rel', 'noopener noreferrer');
    proceedBtn.textContent = 'Proceed to ' + platform + ' ↗';
  }

  if (desc) {
    if (note) {
      desc.innerHTML = '<div class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs leading-relaxed">' +
                         '<strong>Official Notice:</strong> ' + note +
                       '</div>';
    } else {
      desc.innerHTML = '<p class="text-xs text-stone-600">Connecting to official page on <strong>' + platform + '</strong>.</p>';
    }
  }

  modal.classList.remove('hidden');
}

function closeSocialModal() {
  var modal = document.getElementById('social-info-modal');
  if (modal) modal.classList.add('hidden');
}

// ----------------------------------------------------
// Admissions Registration Desk
// ----------------------------------------------------
var applications = [
  { id: "APP-2026-001", learnerName: "Sipho", learnerSurname: "Ndlovu", gradeApplying: "Grade 10", gender: "Male", dob: "2010-04-12", previousSchool: "Kaalfontein Primary", parentName: "Nomsa Ndlovu", parentPhone: "082 555 1234", status: "Approved" },
  { id: "APP-2026-002", learnerName: "Lerato", learnerSurname: "Khumalo", gradeApplying: "Grade 8", gender: "Female", dob: "2012-07-23", previousSchool: "Midrand Primary School", parentName: "Thabo Khumalo", parentPhone: "083 444 9876", status: "Pending" },
  { id: "APP-2026-003", learnerName: "Bandile", learnerSurname: "Mabaso", gradeApplying: "Grade 11", gender: "Male", dob: "2009-02-18", previousSchool: "Tembisa High", parentName: "Zandile Mabaso", parentPhone: "072 111 8899", status: "Pending" },
  { id: "APP-2026-004", learnerName: "Nthabiseng", learnerSurname: "Molefe", gradeApplying: "Grade 8", gender: "Female", dob: "2012-11-05", previousSchool: "Halfway House Primary", parentName: "Kabelo Molefe", parentPhone: "081 222 3344", status: "Rejected" }
];

function handleAdmissionsSubmit(e) {
  e.preventDefault();
  var name = document.getElementById('reg-name').value;
  var surname = document.getElementById('reg-surname').value;
  var grade = document.getElementById('reg-grade').value;
  var gender = document.getElementById('reg-gender').value;
  var dob = document.getElementById('reg-dob').value;
  var prevSchool = document.getElementById('reg-prevschool').value || 'Midrand Primary';
  var parentName = document.getElementById('reg-parentname').value;
  var parentPhone = document.getElementById('reg-phone').value;

  var newId = 'APP-2026-0' + (applications.length + 1);
  var newEntry = {
    id: newId,
    learnerName: name,
    learnerSurname: surname,
    gradeApplying: grade,
    gender: gender,
    dob: dob,
    previousSchool: prevSchool,
    parentName: parentName,
    parentPhone: parentPhone,
    status: 'Pending'
  };

  applications.unshift(newEntry);
  renderAdminApplicationsTable('All');

  document.getElementById('admissions-reference-display').textContent = newId;
  document.getElementById('admissions-registration-form').classList.add('hidden');
  document.getElementById('admissions-success-container').classList.remove('hidden');
}

function resetAdmissionsForm() {
  var form = document.getElementById('admissions-registration-form');
  var success = document.getElementById('admissions-success-container');
  if (form) {
    form.reset();
    form.classList.remove('hidden');
  }
  if (success) {
    success.classList.add('hidden');
  }
}

function renderAdminApplicationsTable(filter) {
  var tbody = document.getElementById('admin-applications-tbody');
  var countTotal = document.getElementById('admin-stat-total');
  var countPending = document.getElementById('admin-stat-pending');
  var countApproved = document.getElementById('admin-stat-approved');
  var countRejected = document.getElementById('admin-stat-rejected');

  var pendingList = applications.filter(function(a) { return a.status === 'Pending'; });
  var approvedList = applications.filter(function(a) { return a.status === 'Approved'; });
  var rejectedList = applications.filter(function(a) { return a.status === 'Rejected'; });

  if (countTotal) countTotal.textContent = applications.length;
  if (countPending) countPending.textContent = pendingList.length;
  if (countApproved) countApproved.textContent = approvedList.length;
  if (countRejected) countRejected.textContent = rejectedList.length;

  if (!tbody) return;

  var displayList = filter === 'All' ? applications : applications.filter(function(a) { return a.status === filter; });

  var html = '';
  for (var i = 0; i < displayList.length; i++) {
    var app = displayList[i];
    var badgeClass = app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                     app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                     'bg-amber-100 text-amber-800';

    html += '<tr class="hover:bg-stone-50 border-b border-stone-100 text-xs">' +
              '<td class="p-3 font-mono font-bold text-stone-600">' + app.id + '</td>' +
              '<td class="p-3">' +
                '<span class="font-bold text-stone-900 block">' + app.learnerName + ' ' + app.learnerSurname + '</span>' +
                '<span class="text-[11px] text-stone-500">' + app.gender + ' • DOB: ' + app.dob + '</span>' +
              '</td>' +
              '<td class="p-3 font-bold text-stone-800">' + app.gradeApplying + '</td>' +
              '<td class="p-3 text-stone-600 truncate max-w-[140px]">' + app.previousSchool + '</td>' +
              '<td class="p-3">' +
                '<span class="font-medium text-stone-900 block">' + app.parentName + '</span>' +
                '<span class="text-[11px] text-stone-500">' + app.parentPhone + '</span>' +
              '</td>' +
              '<td class="p-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ' + badgeClass + '">' + app.status + '</span></td>' +
              '<td class="p-3 text-right">' +
                '<div class="flex items-center justify-end gap-1.5">' +
                  (app.status !== 'Approved' ? '<button type="button" onclick="setAppStatus(\'' + app.id + '\', \'Approved\')" class="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold cursor-pointer">Approve</button>' : '') +
                  (app.status !== 'Rejected' ? '<button type="button" onclick="setAppStatus(\'' + app.id + '\', \'Rejected\')" class="px-2 py-1 bg-stone-200 hover:bg-red-600 hover:text-white text-stone-700 rounded text-[11px] font-bold cursor-pointer">Reject</button>' : '') +
                '</div>' +
              '</td>' +
            '</tr>';
  }
  tbody.innerHTML = html;
}

function setAppStatus(id, newStatus) {
  for (var i = 0; i < applications.length; i++) {
    if (applications[i].id === id) {
      applications[i].status = newStatus;
      break;
    }
  }
  renderAdminApplicationsTable('All');
}

function filterAdminTable(filter) {
  var btns = document.querySelectorAll('.admin-filter-btn');
  for (var i = 0; i < btns.length; i++) {
    if (btns[i].id === 'admin-filter-' + filter) {
      btns[i].classList.add('bg-[#C8102E]', 'text-white', 'shadow');
      btns[i].classList.remove('bg-stone-100', 'text-stone-700');
    } else {
      btns[i].classList.remove('bg-[#C8102E]', 'text-white', 'shadow');
      btns[i].classList.add('bg-stone-100', 'text-stone-700');
    }
  }
  renderAdminApplicationsTable(filter);
}

// ----------------------------------------------------
// Admin Session & Slideshow Photos Customization
// ----------------------------------------------------
var ADMIN_USERNAME = 'onalenna mpofu';
var ADMIN_PASSWORD = 'onalenna@14##';

function isAdminLoggedIn() {
  return sessionStorage.getItem('ponelopele_admin_auth') === 'true';
}

function handleAdminLogin(e) {
  e.preventDefault();
  var userEl = document.getElementById('admin-username-input');
  var passEl = document.getElementById('admin-password-input');
  var errorEl = document.getElementById('admin-login-error-msg');

  var username = (userEl ? userEl.value : '').trim().toLowerCase();
  var password = passEl ? passEl.value : '';

  var isValidUser = (
    username === 'onalenna mpofu' ||
    username === 'onalenna' ||
    username === 'onalennampofu' ||
    username === 'onalennampofu320@gmail.com'
  );
  var isValidPass = (password === ADMIN_PASSWORD);

  if (isValidUser && isValidPass) {
    sessionStorage.setItem('ponelopele_admin_auth', 'true');
    if (errorEl) errorEl.classList.add('hidden');
    if (passEl) passEl.value = '';
    syncAdminPortalUI();
  } else {
    if (errorEl) {
      errorEl.classList.remove('hidden');
      errorEl.textContent = 'Access Denied: Invalid administrator username or security password. Only administrator Onalenna Mpofu has permission to access this portal.';
    }
    if (passEl) {
      passEl.classList.add('border-red-500');
      setTimeout(function() {
        passEl.classList.remove('border-red-500');
      }, 3000);
    }
  }
}

function handleAdminLogout() {
  sessionStorage.removeItem('ponelopele_admin_auth');
  syncAdminPortalUI();
}

function toggleAdminPasswordVisibility() {
  var passEl = document.getElementById('admin-password-input');
  var toggleBtn = document.getElementById('admin-pwd-toggle-btn');
  if (!passEl) return;
  if (passEl.type === 'password') {
    passEl.type = 'text';
    if (toggleBtn) toggleBtn.textContent = 'Hide';
  } else {
    passEl.type = 'password';
    if (toggleBtn) toggleBtn.textContent = 'Show';
  }
}

function syncAdminPortalUI() {
  var loginCard = document.getElementById('admin-login-card');
  var dashboard = document.getElementById('admin-dashboard-container');
  var isAuth = isAdminLoggedIn();

  if (isAuth) {
    if (loginCard) loginCard.classList.add('hidden');
    if (dashboard) dashboard.classList.remove('hidden');
    updateAdminSlidePreviews();
    renderAdminApplicationsTable('All');
  } else {
    if (loginCard) loginCard.classList.remove('hidden');
    if (dashboard) dashboard.classList.add('hidden');
  }
}

function getStoredSlideImages() {
  try {
    var saved = localStorage.getItem('ponelopele_custom_slides');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [null, null, null, null];
}

function setStoredSlideImage(index, dataUrl) {
  if (!isAdminLoggedIn()) {
    alert('Access Denied: Only administrator Onalenna Mpofu can update slide photos.');
    switchPage('admin-portal');
    return;
  }
  var arr = getStoredSlideImages();
  arr[index] = dataUrl;
  try {
    localStorage.setItem('ponelopele_custom_slides', JSON.stringify(arr));
  } catch (e) {}
  applySlideImages();
  updateAdminSlidePreviews();

  var alertEl = document.getElementById('admin-slide-alert');
  if (alertEl) {
    alertEl.classList.remove('hidden');
    setTimeout(function() {
      if (alertEl) alertEl.classList.add('hidden');
    }, 4000);
  }
}

function resetSlideImagesToDefault() {
  if (!isAdminLoggedIn()) {
    alert('Access Denied: Only administrator Onalenna Mpofu can reset slide photos.');
    switchPage('admin-portal');
    return;
  }
  try {
    localStorage.removeItem('ponelopele_custom_slides');
  } catch (e) {}
  applySlideImages();
  updateAdminSlidePreviews();

  var alertEl = document.getElementById('admin-slide-alert');
  if (alertEl) {
    alertEl.classList.remove('hidden');
    setTimeout(function() {
      if (alertEl) alertEl.classList.add('hidden');
    }, 4000);
  }
}

function applySlideImages() {
  var stored = getStoredSlideImages();
  for (var i = 0; i < 4; i++) {
    var img = document.getElementById('hero-slide-img-' + i);
    if (img) {
      if (stored && stored[i] && typeof stored[i] === 'string' && stored[i].length > 50 && stored[i].indexOf('data:image') === 0) {
        img.src = stored[i];
      } else {
        img.src = DEFAULT_SLIDE_IMAGES[i];
      }
    }
  }
}

function updateAdminSlidePreviews() {
  var stored = getStoredSlideImages();
  for (var i = 0; i < 4; i++) {
    var p = document.getElementById('admin-preview-slide-' + i);
    if (p) {
      if (stored && stored[i] && typeof stored[i] === 'string' && stored[i].length > 50 && stored[i].indexOf('data:image') === 0) {
        p.src = stored[i];
      } else {
        p.src = DEFAULT_SLIDE_IMAGES[i];
      }
    }
  }
}

function handleSingleSlideUpload(event, index) {
  if (!isAdminLoggedIn()) {
    alert('Access Denied: Only administrator Onalenna Mpofu can upload slide photos.');
    switchPage('admin-portal');
    return;
  }
  var file = event.target.files && event.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    setStoredSlideImage(index, e.target.result);
  };
  reader.readAsDataURL(file);
}

function handleBatchSlideUpload(event) {
  if (!isAdminLoggedIn()) {
    alert('Access Denied: Only administrator Onalenna Mpofu can upload slide photos.');
    switchPage('admin-portal');
    return;
  }
  var files = event.target.files;
  if (!files || files.length === 0) return;
  var count = Math.min(files.length, 4);
  var loaded = 0;
  var stored = getStoredSlideImages();

  for (var i = 0; i < count; i++) {
    (function(fileIdx) {
      var file = files[fileIdx];
      var reader = new FileReader();
      reader.onload = function(e) {
        stored[fileIdx] = e.target.result;
        loaded++;
        if (loaded === count) {
          try {
            localStorage.setItem('ponelopele_custom_slides', JSON.stringify(stored));
          } catch (err) {}
          applySlideImages();
          updateAdminSlidePreviews();
          var alertEl = document.getElementById('admin-slide-alert');
          if (alertEl) {
            alertEl.classList.remove('hidden');
            setTimeout(function() {
              if (alertEl) alertEl.classList.add('hidden');
            }, 4000);
          }
        }
      };
      reader.readAsDataURL(file);
    })(i);
  }
}

// ----------------------------------------------------
// Page Initialization
// ----------------------------------------------------
window.addEventListener('load', function() {
  applySlideImages();
  startSlideAutoplay();
  syncAdminPortalUI();
  syncGitHubModalValues();

  // Search input listeners
  var searchInput = document.getElementById('site-smart-search-input');
  var searchClearBtn = document.getElementById('search-clear-btn');
  var searchDropdown = document.getElementById('search-dropdown-results');

  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      runSearch(e.target.value);
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', closeSearchDropdown);
  }

  document.addEventListener('click', function(e) {
    if (searchInput && searchDropdown && !searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
      searchDropdown.classList.add('hidden');
    }
  });
});