// Import main css
import '~/assets/style/index.scss';

import Buefy from 'buefy'

import browserDetect from 'vue-browser-detect-plugin'

// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

import VueScrollTo from 'vue-scrollto'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import {
    faArrowDown, faArrowLeft, faAngleDoubleDown, faSyncAlt, faCaretRight, faBars,
    faListUl, faEllipsisH, faTimes, faAngleUp, faAngleDown, faShareAlt, faBook,
    faFileDownload, faLink, faCamera, faMapMarkerAlt, faEnvelope, faSearch,
    faPhone, faGlobeAmericas, faInfoCircle, faExternalLinkAlt
  }
  from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false;
library.add(
  faFacebook, faFacebookF, faTwitter, faInstagram, faArrowDown, faArrowLeft, faAngleDoubleDown, faSyncAlt,
  faCaretRight, faBars, faListUl, faEllipsisH, faTimes, faAngleUp, faAngleDown, faShareAlt, faBook, faCopy, faSearch,
  faFileDownload, faLink, faCamera, faMapMarkerAlt, faEnvelope, faPhone, faGlobeAmericas, faInfoCircle, faExternalLinkAlt)

export default function (Vue, { router, head, isClient }) {
  head.htmlAttrs = { lang: 'es' }
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.component('font-awesome', FontAwesomeIcon)

  Vue.use(VueScrollTo)

  Vue.use(Buefy)

  Vue.filter('number', function(value) {
    if (!value) return ''
    if (isNaN(value)) return value
    return parseInt(value).toLocaleString('de-DE', {style: 'decimal', localeMatcher: 'best fit'})
  })

  if (isClient) {
    Vue.use(browserDetect)
    Vue.component('l-map', () => import ('vue2-leaflet').then(m => m.LMap))
    Vue.component('l-tile-layer', () => import ('vue2-leaflet').then(m => m.LTileLayer))
    Vue.component('l-geo-json', () => import ('vue2-leaflet').then(m => m.LGeoJson))
    Vue.component('l-marker', () => import ('vue2-leaflet').then(m => m.LMarker))
    Vue.component('l-icon', () => import ('vue2-leaflet').then(m => m.LIcon))
    Vue.component('l-control', () => import ('vue2-leaflet').then(m => m.LControl))
    Vue.component('l-control-zoom', () => import ('vue2-leaflet').then(m => m.LControlZoom))
    Vue.component('l-control-layers', () => import ('vue2-leaflet').then(m => m.LControlLayers))
  }

}
