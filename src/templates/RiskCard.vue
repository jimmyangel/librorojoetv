<template>
  <Layout>
    <SideBar>
      <template v-slot:title>
        {{$page.labels.vcard.sidepaneltitle}}
      </template>
      <template v-slot:sidebar>
        <div class="box">
          <CollapsibleList v-if="pathParent" :list="collapsibleList" :allOpen="true" />
        </div>
      </template>
      <template v-slot:content>
        <div class="red-line">

          <PageBanner
            :banner="$page.riskCard.cardimage"
            :caption="$page.riskCard.cardimagecaption"
            :lead="$page.labels.vcard.bannerlead"
            link="/fichas"
            :title="$page.riskCard.formattedtitle ? $page.riskCard.formattedtitle : $page.riskCard.title"
            :citationPre="$page.riskCard.citationPre"
            :citationPost="$page.riskCard.citationPost"
            :subtitle="$page.riskCard.plantformation ? `(${$page.riskCard.plantformation})` : null">
            <template v-slot:follow>
              <hr align="left" width="50%" style="margin: 1rem 0">
              <div style="display: flex; height: 50px;" class= "hero-text">
                <img :src="threatCategories[$page.riskCard.category].img.src" height="50" width="50" />
                <span style="font-size: small; margin-top: auto; margin-bottom: auto; padding-left: 10px;"><b>{{threatCategories[$page.riskCard.category].text}}</b></span>
              </div>
            </template>
          </PageBanner>

          <section class="section is-center-narrow">
            <div class="tile is-vertical is-parent">
              <div class="tile is-child box is-size-5 is-size-6-mobile">
                <h1>{{$page.labels.vcard.description}}</h1>
                <TextWithRefsAndPhotos
                  :text="$page.riskCard.description"
                  :refs="$page.references.references"
                  :photos="$page.riskCard.photos">
                </TextWithRefsAndPhotos>
                <h1>{{$page.labels.vcard.distribution}}</h1>
                <TextWithRefsAndPhotos
                  :text="$page.riskCard.distribution"
                  :refs="$page.references.references"
                  :photos="$page.riskCard.photos">
                </TextWithRefsAndPhotos>
                <div class="inline-figure has-text-centered">
                  <br>
                  <figure>
                    <g-image v-if="$page.riskCard.distributionmap" :src="$page.riskCard.distributionmap" />
                  </figure>
                  <figcaption style="max-width: 80%; margin: 0px auto;">
                    <div class="is-size-6 is-size-7-mobile">
                      <br>
                      <span v-html="$page.riskCard.formattedtitle ? $page.riskCard.formattedtitle : $page.riskCard.title"></span>
                      <span v-html="$page.labels.vcard.distributionmapcaption"></span>
                    </div>
                  </figcaption>
                </div>
                <h1 v-if="$page.riskCard.areain2010">{{$page.labels.vcard.distributionchanges}}</h1>
                <div v-if="$page.riskCard.areain2010" class="tile is-parent" style="padding-top: 0;">
                  <div v-if="$page.riskCard.stateleveltable.length" class="tile is-child is-2"></div>
                  <div v-if="$page.riskCard.stateleveltable.length" class="tile is-child is-8">
                    <div class="has-text-centered is-size-6 has-text-weight-bold">
                      <span v-html="$page.labels.vcard.areaheading"></span>:
                      <br>
                      <span class="is-size-7"><b>({{$page.labels.vcard.table1}})</b></span>
                      <br><br>
                    </div>
                    <table align="center" class="statetable table is-size-6 is-size-7-mobile">
                      <thead>
                        <tr>
                          <th v-if="$page.riskCard.formationColumn">{{$page.labels.vcard.formation}}</th>
                          <th>{{$page.labels.vcard.state}}</th>
                          <th class="has-text-right">1988</th>
                          <th class="has-text-right">2010</th>
                          <th class="has-text-right">{{$page.labels.vcard.difference}}</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in $page.riskCard.stateleveltable">
                          <td v-if="$page.riskCard.formationColumn"><b>{{item.formation}}</b></td>
                          <td>{{item.state}}</td>
                          <td class="has-text-right">{{item.areain1988 | number}}</td>
                          <td class="has-text-right">{{item.areain2010 | number}}</td>
                          <td class="has-text-right">{{ (difference(item.areain2010,item.areain1988)) | number}}</td>
                          <td :style="'color: ' + redOrGreen(item.areain1988 - item.areain2010) + ';'" class="has-text-right">{{ (item.areain1988 - item.areain2010) | upOrDown}}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td v-if="$page.riskCard.formationColumn"></td>
                          <th>Total</th>
                          <th class="has-text-right">{{($page.riskCard.stateleveltable.reduce((a, b) => +a + +numbernobrackets(b.areain1988), 0)) | number}}</th>
                          <th class="has-text-right">{{($page.riskCard.stateleveltable.reduce((a, b) => +a + +numbernobrackets(b.areain2010), 0)) | number}}</th>
                          <th class="has-text-right">{{($page.riskCard.stateleveltable.reduce((a, b) => +a + +numbernobrackets(b.areain2010), 0)) - ($page.riskCard.stateleveltable.reduce((a, b) => +a + +numbernobrackets(b.areain1988), 0)) | number}}</th>
                          <th></th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div v-if="$page.riskCard.areain2010" class="tile is-parent">
                  <div class="tile is-child is-2"></div>
                  <div class="tile is-child is-8 is-size-6 has-text-centered">
                    <b>{{$page.labels.vcard.areain1988}} (km<sup>2</sup>): </b>{{$page.riskCard.areain1988 | number}}<br>
                    <b>{{$page.labels.vcard.areain2010}} (km<sup>2</sup>): </b>{{$page.riskCard.areain2010 | number}}<br>
                    <span class="is-size-7"><b>({{$page.labels.vcard.figures1aand1b}})</b></span>
                    <ClientOnly>
                      <div v-for="item in $page.riskCard.mapcompare">
                        <br>
                        <div class="has-text-centered is-size-7 has-text-weight-bold" >{{item.caption}}</div>
                        <VueCompareImage  v-if="item.in2010" style="border-style: solid; border-color: dimgrey;" :leftImage="item.in1988.src" leftLabel="1988" :rightImage="item.in2010.src" rightLabel="2010" />
                        <div style="padding-top: 8px;">
                          <div v-for="il in item.interventionlegend" style="float: left;" class="has-text-left is-size-7">
                            <span class="intervention-legend-item" :style="'background-image: url(' + il.image.src + ');'"></span>
                            <span style="padding-left: 4px; padding-right: 4px;">{{il.text}}</span>
                          </div>
                          <br>
                        </div>
                      </div>
                    </ClientOnly>
                  </div>
                </div>
                <h1>{{$page.labels.vcard.nationalriskofcollapse}}</h1>
                <div class="text-block tile is-child box is-size-5 is-size-6-mobile">
                  <div class="has-text-centered">
                    <b>{{$page.labels.vcard.nationalriskofcollapse}}: </b>
                    {{threatCategories[$page.riskCard.category].text.toUpperCase()}}
                    <img :src="threatCategories[$page.riskCard.category].img.src" height="30" width="30" style="margin-bottom: -5px;">
                  </div>
                </div>
                <div class="tile is-parent">
                  <div class="tile is-child is-2"></div>
                  <div class="tile is-child is-8 is-size-6 has-text-centered">
                    <b>{{$page.labels.vcard.threatlevel}}: </b><br>
                    <span class="is-size-7"><b>({{$page.labels.vcard.figure1c}})</b></span>
                    <div v-for="item in $page.riskCard.threatlevelmaps">
                      <br>
                      <div class="has-text-centered is-size-7 has-text-weight-bold" >{{item.caption}}</div>
                      <figure style="display: inline-block;">
                        <g-image v-if="item" style="border-style: solid; border-color: dimgrey;" :src="item.map"></g-image>
                        <figcaption>
                          <div v-for="tl in item.threatcategories" style="float: left;" class="has-text-left is-size-7">
                            <span class="legend-item" :style="'background:' + threatCategories[tl].color"></span>
                            <span style="padding-left: 4px; padding-right: 4px;"> {{threatCategories[tl].text}}</span>
                          </div>
                          <br>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
                <div class="tile is-parent">
                  <div v-if="$page.riskCard.riskofcolapsestatelevel.length" class="tile is-child is-2"></div>
                  <div v-if="$page.riskCard.riskofcolapsestatelevel.length" class="tile is-child is-8">
                    <div class="has-text-centered"><b>{{$page.labels.vcard.riskofcollapseby}} {{($page.riskCard.zonelabel).toLowerCase()}}:</b><br>
                      <span class="is-size-7"><b>({{$page.labels.vcard.table2}})</b></span>
                      <br><br>
                    </div>
                    <table align="center" class="risktable table is-size-6 is-size-7-mobile">
                      <thead>
                        <tr>
                          <th v-if="$page.riskCard.formationColumn"></th>
                          <th></th>
                          <th align="center" :colspan="$page.riskCard.criteriaused.length - 1">
                            <!-- <b-tooltip position="is-top" type="is-warning" label="Versión v1.0, 2010"> -->
                              <b>{{$page.labels.vcard.criteria}}</b>
                            <!-- </b-tooltip> -->
                          </th>
                          <th></th>
                        </tr>
                        <tr>
                          <th v-if="$page.riskCard.formationColumn">{{$page.labels.vcard.formation}}</th>
                          <th>{{$page.riskCard.zonelabel}}</th>
                          <th v-for="value in $page.riskCard.criteriaused" align="center">
                            <b-dropdown v-if="criteria[value]" class="criteria-box" position="is-bottom-left">
                              <a slot="trigger">
                                <span v-html="value"></span>&nbsp;<font-awesome size="xs" :icon="['fas', 'angle-down']"/>
                              </a>
                              <b-dropdown-item class="has-text-weight-normal has-text-left" custom>
                                <div class="has-text-weight-bold has-text-centered">Criterio {{value}}<br><br></div>
                                <span class="has-text-weight-medium">{{criteria[value.charAt(0)]}}</span>
                                <span v-if="value.length>1"><br><br>{{criteria[value]}}</span>
                                <small><br><br>{{$page.labels.vcard.criteriaversion}}</small>
                              </b-dropdown-item>
                            </b-dropdown>
                            <span v-else v-html="value"></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in $page.riskCard.riskofcolapsestatelevel">
                          <td v-if="$page.riskCard.formationColumn"><b>{{item.formation}}</b></td>
                          <td>{{item.zone}}</td>
                          <td v-if="item.area" class="has-text-right">{{item.area | decimal(1)}}</td>
                          <td align="center" v-for="value in item.threatcategories">
                            <b-tooltip v-if="threatCategories[value]" :label="threatCategories[value] ? threatCategories[value].text : ''" position="is-top" type="is-warning">
                              <div class="iconInTable">
                                <img :src="threatCategories[value].img.src">
                              </div>
                            </b-tooltip>
                            <div v-else>{{value}}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div v-if="$page.riskCard.content != '\n'" class="container is-size-5 has-text-centered">
                <div v-show="!showMore" @click="showMore = !showMore">
                  <button class="button is-primary is-medium has-text-weight-semibold">
                    <p v-if="!showMore">{{$page.labels.vcard.readmore}} <font-awesome :icon="['fas', 'angle-down']"/></p>
                  </button>
                </div>
              </div>
              <div v-if="showMore" class="tile is-parent">
                <!-- <div class="d-content tile is-child is-size-5" v-html="$page.riskCard.content"></div> -->
                <transition name="fade" appear>
                  <TextWithRefsAndPhotos class="tile is-child box is-size-5 is-size-6-mobile"
                    :text="$page.riskCard.content"
                    :refs="$page.references.references"
                    :photos="$page.riskCard.photos"
                    :isContent="true" />
                  </TextWithRefsAndPhotos>
                </transition>
              </div>
            </div>
          </section>
        </div>
      </template>
    </SideBar>
  </Layout>
</template>

<page-query>
  query RiskCard ($path: String!) {
    riskCard: riskCard (path: $path) {
      title
      formattedtitle
      citationPre
      citationPost
      plantformation
      category
      description
      cardimage
      cardimagecaption
      distribution
      distributionmap
      areain1988
      areain2010
      formationColumn
      stateleveltable {
        formation
        state
        areain1988
        areain2010
      }
      mapcompare {
        in2010
        in1988
        caption
        interventionlegend {
          image
          text
        }
      }
      threatlevelmaps {
        map
        caption
        threatcategories
      }
      zonelabel
      criteriaused
      riskofcolapsestatelevel {
        formation
        zone
        area
        threatcategories
      }
      photos {
        photokey
        photourl
        photocaption
        isCentered
      }
      content
    }
    references: references (id: "fichas") {
      references {
        referencekey
        reference
      }
    }
    riskCardsIndex: riskCardsIndex (path: "/content/explore/vcards-index") {
    	legendItems {
        name
        group
        color
        legend
        cardPath
        plantformation
      }
    }
    labels (id: "labels") {
      vcard {
        sidepaneltitle
        bannerlead
        description
        distribution
        distributionmapcaption
        distributionchanges
        areaheading
        table1
        formation
        state
        difference
        areain1988
        areain2010
        figures1aand1b
        situation
        nationalriskofcollapse
        threatlevel
        figure1c
        riskofcollapseby
        table2
        criteria
        criteriaversion
        readmore
        criteriaLabels {
          code
          text
        }
      }
      global {
        threatCategories {
          code
          text
          color
          img
        }
      }
    }
  }
</page-query>

<style lang="scss" scoped>
  @import "~/assets/style/_variables";

  .with-margin {
    margin-left: 1rem;
  }

  @media only screen and (max-width: 1024px) {
    .statetable {
      font-size: 0.8em !important;
    }
  }

  @media only screen and (max-width: 400px) {
    .statetable, .risktable  {
      font-size: 0.5em !important;
    }
    .statetable td, th {
      padding: 1px;
    }

    .iconInTable {
      width: 18px !important;
      height: 18px !important;
    }
  }

  @media only screen and (min-width: 800px) {
    .categoryicon {
      position: absolute;
      right: 0px;
      top: 0px;
      margin-top: -15px;
    }
  }

  .iconInTable {
    width: 30px;
    height: 30px;
  }

  .risktable {
    /*border: solid $primary 2px; */
    border-collapse: separate;
  }

  .intervention-legend-item {
    height: 12px;
    width: 14px;
    display: inline-block;
  }

  @media only screen and (min-width: 769px) {
    .distribution-map {
      width: 50%;
      float: right;
    }
  }

  .legend-item {
    margin-bottom: -1.5px;
    height: 12px;
    width: 20px;
    display: inline-block;
  }

  .button {
    border-radius: 7px;
  }

  .button:hover {
    color: $button-hover-text-color;
  }

  .button {
    padding-left: 30px;
    padding-right: 30px;
  }

  ::v-deep .handle {
    border: 2px solid gray !important;
  }

  ::v-deep .right-arrow {
    border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) gray !important;
  }

  ::v-deep .left-arrow {
    border-color: rgba(0, 0, 0, 0) gray rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) !important;
  }

  ::v-deep .line {
    background: gray !important;
  }

  ::v-deep .left-label, ::v-deep .right-label {
    font-weight: bold;
  }

  ::v-deep .criteria-box>.dropdown-menu {
    min-width: 30em;
  }

</style>

<script>

  import PageBanner from '~/components/PageBanner.vue'
  import CollapsibleList from '~/components/CollapsibleList.vue'
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'
  import SideBar from '~/components/SideBar.vue'
  import slugify from 'slugify'

  slugify.extend({'/': '-'})

  export default {
    metaInfo: {
      title: 'Ficha'
    },
    created() {
      this.$page.labels.vcard.criteriaLabels.forEach(item => {
        this.criteria[item.code] = item.text
      })
      this.$page.labels.global.threatCategories.forEach(item => {
        this.threatCategories[item.code] = {text: item.text, color: item.color, img: item.img}
      })
    },
    data() {
      return {
        threatCategories: {},
        criteria: {},
        showMore: false,
        currentSlug: null,
        pathParent: null
      }
    },
    mounted () {
      this.pathParent = this.$route.path.replace(/\/$/, '').replace(/\/[^\/]+$/,'')
      this.currentSlug = this.$route.path.replace(/\/$/, '').match(/\/[^\/]+$/)[0].substring(1)
    },
    updated () {
    },
    beforeRouteUpdate (to, from, next) {
      this.currentSlug = to.path.replace(/\/$/, '').match(/\/[^\/]+$/)[0].substring(1)
      if (to.path != from.path) {
        this.showMore = false
      }
      next()
    },
    filters: {
      decimal: function(value, decimals) {
        if (!value) return ''
        return Number(value).toLocaleString('de-DE', {style: 'decimal', minimumFractionDigits: decimals})
        //return parseFloat(value).toFixed(decimals).toLocaleString('es-VE', {style: 'decimal'})
      },
      upOrDown: function(value) {
        if (!value) return ''
        if (value === 0) return ''
        return (value < 0) ? '▲' : '▼'
      }
    },
    components: {
      PageBanner,
      CollapsibleList,
      VueCompareImage: () => import ('vue-compare-image').then(m => m),
      TextWithRefsAndPhotos,
      SideBar
    },
    methods: {
      redOrGreen: function(value) {
        if (!value) return ''
        return (value < 0) ? 'green' : 'red'
      },
      difference: function (a, b) {
        a = (a === null ? '' : a)
        b = (b === null ? '' : b)
        return a.replace(/[\<\>]/g, '') - b.replace(/[\<\>]/g, '')
      },
      numbernobrackets: function (a) {
        a = (a === null ? '' : a)
        return Number(a.replace(/[\<\>]/g, ''))
      },
      slugify: function(t) {
        return slugify(t, {lower: true})
      },
      getTargetSlug: function(t) {
        return t.cardPath ? slugify(t.cardPath, {lower: true}) : slugify(t.name, {lower: true})
      },
      isTitle: function(i) {
        let pf = this.$page.riskCardsIndex.legendItems[i].plantformation
        if (pf) {
          if (i > 0) {
            return (pf === this.$page.riskCardsIndex.legendItems[i-1].plantformation) ? false : true
          } else {
            return true
          }
        }
        return false
      }
    },
    computed: {
      collapsibleList: function() {
        let cl = []
        let p = null
        this.$page.riskCardsIndex.legendItems.forEach((item, index) => {
          if (this.isTitle(index)) {
            cl.push({
              parentLabel: item.plantformation,
              children: [
                {
                  childLabel: item.name,
                  childLink: this.pathParent + '/' + this.getTargetSlug(item)
                }
              ]
            })
          } else {
            if (item.plantformation) {
              index = cl.findIndex((currentValue) => {
                return currentValue.parentLabel === item.plantformation
              })
              if (index >=0) {
                cl[index].children.push({
                  childLabel: item.name,
                  childLink: this.pathParent + '/' + this.getTargetSlug(item)
                })
              }
            } else {
              cl.push({
                parentLabel: item.name,
                parentLink: this.pathParent + '/' + this.getTargetSlug(item)
              })
            }
          }
        })
        return cl
      },
      pageTitle() {
        return 'Riesgo de colapso: ' + this.$page.riskCard.title
      },
      pageImage() {
        return this.$page.riskCard.cardimage.src
      }
    }
  }
</script>
