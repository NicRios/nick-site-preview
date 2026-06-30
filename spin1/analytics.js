// PostHog analytics for nick-rios.com
// Project: PostHog "Default project" (us.posthog.com). Public ingestion key (safe client-side).
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('phc_mS93BG2ndRtomKoQLmAXUoDeDroiJ5er6wSahVvahXiq',{
  api_host:'https://us.i.posthog.com',
  person_profiles:'identified_only',
  capture_pageview:true,
  capture_pageleave:true,
  autocapture:true,
  disable_session_recording:true   // personal site: keep off so it doesn't consume the shared project's replay quota
});

// --- explicit conversion events (autocapture covers the rest) ---
(function(){
  function txt(el){return el&&el.textContent?el.textContent.trim().slice(0,80):undefined;}
  document.addEventListener('click',function(e){
    var a=e.target.closest('a,button'); if(!a) return;
    var href=a.getAttribute('href')||'';
    if(a.classList.contains('navcta')||a.classList.contains('mm-cta')||/contact\.html/.test(href)&&/work together/i.test(a.textContent||''))
      posthog.capture('cta_lets_work_together_click',{location:a.className||'cta'});
    if(/resume\.html/.test(href)) posthog.capture('resume_open');
    if(/linkedin\.com/.test(href)) posthog.capture('linkedin_click');
    var card=e.target.closest('a.case'); if(card) posthog.capture('case_study_click',{project:txt(card.querySelector('.ch'))});
    var note=e.target.closest('a.fncard'); if(note) posthog.capture('field_note_click',{note:txt(note.querySelector('.fnt'))});
  },true);
  function onSubmit(id,ev){var f=document.getElementById(id); if(f) f.addEventListener('submit',function(){posthog.capture(ev);});}
  onSubmit('subform','newsletter_subscribe_submit');
  onSubmit('cform','contact_form_submit');
  var copy=document.getElementById('copy')||document.getElementById('copyem');
  if(copy) copy.addEventListener('click',function(){posthog.capture('email_copy');});
  var printb=document.querySelector('.printbtn'); if(printb) printb.addEventListener('click',function(){posthog.capture('resume_print_pdf');});
})();
