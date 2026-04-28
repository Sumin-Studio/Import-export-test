/**
 * Xero Build Navigator chat — expects NAVIGATOR_LOGIC (navigator-chat-data.js)
 * and NAVIGATOR_PAGE_CONFIG on the host page.
 */
(function () {
  var STORAGE_TOPIC = "navigator:lastTopicSlug";
  var STORAGE_JOURNEY_COMPLETE = "navigator:journeyComplete";

  var el = {};
  var topics = [];
  var stepIndex = 0;
  var view = "question";
  var methodsExitLock = false;

  function $(id) {
    return document.getElementById(id);
  }

  function getConfig() {
    var c = window.NAVIGATOR_PAGE_CONFIG;
    if (!c || !c.phaseKey || !c.topicSlugs || !c.topicSlugs.length) return null;
    return c;
  }

  function getPhaseData() {
    var cfg = getConfig();
    if (!cfg || !window.NAVIGATOR_LOGIC || !window.NAVIGATOR_LOGIC.phases) return null;
    return window.NAVIGATOR_LOGIC.phases[cfg.phaseKey];
  }

  function yesSlugsKey() {
    var c = getConfig();
    if (!c || !c.phaseKey) return "navigator:__unknown__:yesSlugs";
    return "navigator:" + c.phaseKey + ":yesSlugs";
  }

  function readYesSet() {
    try {
      var raw = localStorage.getItem(yesSlugsKey());
      if (!raw) return [];
      var a = JSON.parse(raw);
      return Array.isArray(a) ? a : [];
    } catch (e) {
      return [];
    }
  }

  function writeYesSet(arr) {
    try {
      localStorage.setItem(yesSlugsKey(), JSON.stringify(arr));
    } catch (e) {}
  }

  function isAllTopicsYes() {
    var c = getConfig();
    if (!c || !c.topicSlugs || !c.topicSlugs.length) return false;
    var have = readYesSet();
    for (var i = 0; i < c.topicSlugs.length; i++) {
      if (have.indexOf(c.topicSlugs[i]) === -1) return false;
    }
    return true;
  }

  function isNavigatorPhaseAllYes(phaseKey, topicSlugs) {
    if (!topicSlugs || !topicSlugs.length) return false;
    var key = "navigator:" + phaseKey + ":yesSlugs";
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return false;
      var have = JSON.parse(raw);
      if (!Array.isArray(have)) return false;
      for (var j = 0; j < topicSlugs.length; j++) {
        if (have.indexOf(topicSlugs[j]) === -1) return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  function readPhaseYesSlugsArray(phaseKey) {
    if (!phaseKey) return [];
    var key = "navigator:" + phaseKey + ":yesSlugs";
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return [];
      var have = JSON.parse(raw);
      return Array.isArray(have) ? have : [];
    } catch (e) {
      return [];
    }
  }

  function isEntireNavigatorJourneyComplete(phases) {
    if (!phases || !phases.length) return false;
    for (var i = 0; i < phases.length; i++) {
      var p = phases[i];
      if (!p || !p.phaseKey || !p.slugs || !p.slugs.length) return false;
      if (!isNavigatorPhaseAllYes(p.phaseKey, p.slugs)) return false;
    }
    return true;
  }

  function getFirstIncompleteNavigatorTarget(phases) {
    if (!phases || !phases.length) return null;
    for (var i = 0; i < phases.length; i++) {
      var p = phases[i];
      if (!p || !p.href || !p.phaseKey || !p.slugs || !p.slugs.length) continue;
      var have = readPhaseYesSlugsArray(p.phaseKey);
      for (var j = 0; j < p.slugs.length; j++) {
        var slug = p.slugs[j];
        if (have.indexOf(slug) === -1) return { href: p.href, slug: slug };
      }
    }
    return null;
  }

  function clearAllNavigatorPhaseYesStorage(phases) {
    if (!phases || !phases.length) return;
    for (var i = 0; i < phases.length; i++) {
      var pk = phases[i] && phases[i].phaseKey;
      if (!pk) continue;
      try {
        localStorage.removeItem("navigator:" + pk + ":yesSlugs");
      } catch (e) {}
    }
    try {
      sessionStorage.removeItem(STORAGE_TOPIC);
      sessionStorage.removeItem(STORAGE_JOURNEY_COMPLETE);
    } catch (e) {}
  }

  function markSlugYes(slug) {
    if (!slug) return;
    var have = readYesSet();
    if (have.indexOf(slug) === -1) {
      have.push(slug);
      writeYesSet(have);
    }
    var c = getConfig();
    if (c && typeof c.onYesForSlug === "function") c.onYesForSlug(slug);
    if (c && typeof c.onJourneyComplete === "function" && isAllTopicsYes()) c.onJourneyComplete();
  }

  function buildTopicList() {
    var phase = getPhaseData();
    var cfg = getConfig();
    if (!phase || !phase.topicsBySlug) return [];
    var out = [];
    for (var i = 0; i < cfg.topicSlugs.length; i++) {
      var slug = cfg.topicSlugs[i];
      var t = phase.topicsBySlug[slug];
      if (t) out.push(Object.assign({ slug: slug }, t));
    }
    return out;
  }

  function startingStepIndex() {
    var slug = null;
    try {
      slug = sessionStorage.getItem(STORAGE_TOPIC);
    } catch (e) {}
    if (!slug || !topics.length) return 0;
    for (var i = 0; i < topics.length; i++) {
      if (topics[i].slug === slug) return i;
    }
    return 0;
  }

  /** After the topic at fromIndex is marked Yes, next index in topic order (wrapping) whose slug is not in readYesSet(). */
  function nextIncompleteStepIndex(fromIndex) {
    var have = readYesSet();
    var n = topics.length;
    if (n < 1) return 0;
    for (var o = 1; o <= n; o++) {
      var i = (fromIndex + o) % n;
      if (have.indexOf(topics[i].slug) === -1) return i;
    }
    return fromIndex;
  }

  function clearChatToInitial() {
    stepIndex = 0;
    view = "question";
    methodsExitLock = false;
    if (el.topicTitle) el.topicTitle.textContent = "";
    if (el.question) el.question.textContent = "";
    if (el.actions) el.actions.hidden = false;
    if (el.btnNo) el.btnNo.hidden = false;
    if (el.btnYes) el.btnYes.hidden = false;
    if (el.methods) {
      el.methods.classList.remove("navigator-chat__methods--exit-up");
      el.methods.hidden = true;
      el.methods.textContent = "";
    }
    if (el.back) el.back.hidden = true;
    if (el.success) el.success.hidden = true;
  }

  function methodsSectionHeading(topic) {
    if (topic.exampleMethodsHeading) return topic.exampleMethodsHeading;
    return "Example methods for " + (topic.title || "");
  }

  function renderMethods(topic) {
    var wrap = el.methods;
    if (!wrap) return;
    wrap.classList.remove("navigator-chat__methods--exit-up");
    wrap.textContent = "";
    var h3 = document.createElement("h3");
    h3.className = "navigator-chat__methods-heading";
    h3.textContent = methodsSectionHeading(topic);
    wrap.appendChild(h3);
    var p = document.createElement("p");
    p.className = "navigator-chat__methods-responsible";
    p.textContent = "Responsible: " + (topic.responsible || "");
    wrap.appendChild(p);
    var ul = document.createElement("ul");
    var bullets = topic.bullets || [];
    for (var i = 0; i < bullets.length; i++) {
      var li = document.createElement("li");
      li.textContent = bullets[i];
      ul.appendChild(li);
    }
    wrap.appendChild(ul);
  }

  function setQuestionAnimation() {
    var q = el.question;
    if (!q) return;
    q.classList.remove("navigator-chat__question--enter");
    q.offsetHeight;
    q.classList.add("navigator-chat__question--enter");
  }

  function showQuestion() {
    view = "question";
    var topic = topics[stepIndex];
    if (!topic || !el.question) return;
    if (el.topicTitle) el.topicTitle.textContent = topic.title || "";
    el.question.textContent = topic.question;
    setQuestionAnimation();
    if (el.actions) el.actions.hidden = false;
    if (el.btnNo) el.btnNo.hidden = false;
    if (el.btnYes) el.btnYes.hidden = false;
    if (el.methods) {
      el.methods.classList.remove("navigator-chat__methods--exit-up");
      el.methods.hidden = true;
    }
    if (el.back) el.back.hidden = true;
    if (el.success) el.success.hidden = true;
  }

  function showMethods() {
    view = "methods";
    var topic = topics[stepIndex];
    if (!topic) return;
    renderMethods(topic);
    if (el.actions) el.actions.hidden = false;
    if (el.btnYes) el.btnYes.hidden = false;
    if (el.btnNo) el.btnNo.hidden = true;
    if (el.methods) {
      el.methods.classList.remove("navigator-chat__methods--exit-up");
      el.methods.hidden = false;
    }
    if (el.back) el.back.hidden = false;
    if (el.success) el.success.hidden = true;
  }

  function showSuccess() {
    view = "success";
    if (el.topicTitle) el.topicTitle.textContent = "";
    if (el.question) el.question.textContent = "";
    if (el.actions) el.actions.hidden = true;
    if (el.methods) {
      el.methods.classList.remove("navigator-chat__methods--exit-up");
      el.methods.hidden = true;
    }
    if (el.back) el.back.hidden = true;
    if (el.success) el.success.hidden = false;
  }

  function advanceFromCurrentTopicYes() {
    var t = topics[stepIndex];
    if (!t) return;
    var prevIndex = stepIndex;
    markSlugYes(t.slug);
    if (isAllTopicsYes()) {
      showSuccess();
      return;
    }
    stepIndex = nextIncompleteStepIndex(prevIndex);
    try {
      if (topics[stepIndex] && topics[stepIndex].slug) {
        sessionStorage.setItem(STORAGE_TOPIC, topics[stepIndex].slug);
      }
    } catch (e) {}
    showQuestion();
  }

  function onYes() {
    if (view === "question") {
      advanceFromCurrentTopicYes();
      return;
    }
    if (view === "methods") {
      onYesFromMethods();
    }
  }

  function onYesFromMethods() {
    if (methodsExitLock) return;
    if (!el.methods) return;
    var methodsEl = el.methods;
    if (methodsEl.classList.contains("navigator-chat__methods--exit-up")) return;

    methodsExitLock = true;
    var finished = false;
    var fallbackT = null;

    function runAdvance() {
      if (finished) return;
      finished = true;
      methodsExitLock = false;
      methodsEl.classList.remove("navigator-chat__methods--exit-up");
      methodsEl.removeEventListener("transitionend", onTe);
      if (fallbackT !== null) {
        clearTimeout(fallbackT);
        fallbackT = null;
      }
      advanceFromCurrentTopicYes();
    }

    function onTe(ev) {
      if (ev.target !== methodsEl) return;
      if (ev.propertyName !== "transform" && ev.propertyName !== "opacity") return;
      runAdvance();
    }

    methodsEl.offsetHeight;
    methodsEl.classList.add("navigator-chat__methods--exit-up");
    methodsEl.addEventListener("transitionend", onTe);
    fallbackT = window.setTimeout(runAdvance, 500);
  }

  function onNo() {
    if (view !== "question") return;
    showMethods();
  }

  function onBack() {
    if (view !== "methods") return;
    showQuestion();
  }

  function onContinueExplore() {
    var c = getConfig();
    var href = c && c.continueHref;
    if (typeof href === "string" && href.length) {
      window.location.href = href;
    } else {
      window.location.href = "xpf-navigator.html";
    }
  }

  function cacheElements() {
    el.root = $("navigator-chat");
    el.topicTitle = $("navigator-chat-topic-title");
    el.question = $("navigator-chat-question");
    el.actions = $("navigator-chat-actions");
    el.methods = $("navigator-chat-methods");
    el.back = $("navigator-chat-back");
    el.success = $("navigator-chat-success");
    el.btnYes = $("navigator-chat-yes");
    el.btnNo = $("navigator-chat-no");
    el.btnContinue = $("navigator-chat-continue");
  }

  function onOpen() {
    cacheElements();
    topics = buildTopicList();
    if (!topics.length || !el.question) return;
    if (isAllTopicsYes()) {
      showSuccess();
    } else {
      stepIndex = startingStepIndex();
      try {
        if (topics[stepIndex] && topics[stepIndex].slug) {
          sessionStorage.setItem(STORAGE_TOPIC, topics[stepIndex].slug);
        }
      } catch (e) {}
      showQuestion();
    }
    var fill = document.querySelector(".plot-journey-panel__fill");
    if (fill) fill.removeAttribute("aria-hidden");
  }

  function onClose() {
    clearChatToInitial();
    var fill = document.querySelector(".plot-journey-panel__fill");
    if (fill) fill.setAttribute("aria-hidden", "true");
  }

  function resetJourney() {
    try {
      sessionStorage.removeItem(STORAGE_TOPIC);
      sessionStorage.removeItem(STORAGE_JOURNEY_COMPLETE);
    } catch (e) {}
    try {
      localStorage.removeItem(yesSlugsKey());
    } catch (e) {}
    cacheElements();
    if (!el.question) return;
    clearChatToInitial();
  }

  function init() {
    cacheElements();
    if (!el.btnYes || !el.btnNo) return;
    el.btnYes.addEventListener("click", onYes);
    el.btnNo.addEventListener("click", onNo);
    if (el.back) el.back.addEventListener("click", onBack);
    if (el.btnContinue) el.btnContinue.addEventListener("click", onContinueExplore);
  }

  window.NavigatorChat = {
    init: init,
    onOpen: onOpen,
    onClose: onClose,
    resetJourney: resetJourney,
    isJourneyComplete: isAllTopicsYes,
  };
  window.isNavigatorPhaseAllYes = isNavigatorPhaseAllYes;
  window.isEntireNavigatorJourneyComplete = isEntireNavigatorJourneyComplete;
  window.getFirstIncompleteNavigatorTarget = getFirstIncompleteNavigatorTarget;
  window.clearAllNavigatorPhaseYesStorage = clearAllNavigatorPhaseYesStorage;
  window.getNavigatorYesSlugsKey = function (phaseKey) {
    return "navigator:" + phaseKey + ":yesSlugs";
  };
  window.NAVIGATOR_JOURNEY_STORAGE_KEYS = {
    lastTopic: STORAGE_TOPIC,
    journeyComplete: STORAGE_JOURNEY_COMPLETE,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
