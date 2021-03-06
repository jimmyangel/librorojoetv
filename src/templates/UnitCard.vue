<template>
  <Layout>
    <SideBar>
      <template v-slot:title>
        {{$page.labels.unit.sidepaneltitle}}
      </template>
      <template v-slot:sidebar>
        <div class="box">
          <CollapsibleList :list="collapsibleList" />
        </div>
      </template>

      <template v-slot:content>
        <div class="red-line">

          <PageBanner
            :banner="$page.unitCard.cardimage"
            :caption="$page.unitCard.cardimagecaption"
            :lead="$page.labels.unit.bannerlead"
            link="/unidades"
            :title="$page.unitCard.title"
            />
          </PageBanner>

          <section class="section is-center-narrow">
            <div class="tile is-ancestor">
              <div class="tile is-vertical is-parent">
                <div class="tile is-parent">
                  <!-- <div class="d-content tile is-child is-size-5" v-html="$page.riskCard.content"></div> -->
                  <TextWithRefsAndPhotos class="tile is-child box is-size-5 is-size-6-mobile"
                    :text="$page.unitCard.content"
                    :refs="$page.references.references"
                    :photos="$page.unitCard.photos"
                    :isContent="true" />
                  </TextWithRefsAndPhotos>
                </div>
              </div>
            </div>
          </section>
        </div>
      </template>


    </SideBar>
  </Layout>
</template>

<page-query>
  query UnitCard ($path: String!) {
    unitCard: unitCard (path: $path) {
      title
      cardimage
      cardimagecaption
      photos {
        photokey
        photourl
        photocaption
        isCentered
      }
      content
    }
    references: references (id: "unidades") {
      references {
        referencekey
        reference
      }
    }
    unitCardsIndex: unitCardsIndex (path: "/content/explore/units-index") {
      title
      mapTitle
      legendItems {
        name
        isHeading
        isIndented
        hasSeparator
        label
        group
        color
        legend
        cardPath
      }
    }
    labels (id: "labels") {
      unit {
        sidepaneltitle
        bannerlead
      }
    }
  }
</page-query>

<style lang="scss" scoped>
  @import "~/assets/style/_variables";

  .current-item {
    font-style: italic;
    font-weight: bold;
  }

</style>

<style lang="scss">

  @import "~/assets/style/_variables";

  /* This is needed to adjust the anchors to account for fixed navbar */
  [id]::before {
    content: '';
    display: block;
    height: $navbar-height/2;
    margin-top: $navbar-height*-1/2;
    visibility: hidden;
  }
</style>



<script>
  import PageBanner from '~/components/PageBanner.vue'
  import CollapsibleList from '~/components/CollapsibleList.vue'
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'
  import SideBar from '~/components/SideBar.vue'

  export default {
    metaInfo: {
      title: 'Región'
    },
    mounted () {
    },
    components: {
      PageBanner,
      CollapsibleList,
      TextWithRefsAndPhotos,
      SideBar
    },
    methods: {
      isCurrentItem: function(item) {
        return item.cardPath != this.$route.path.replace(/\/$/, '').match(/\/[^\/]+$/)[0].substring(1) + this.$route.hash
      }
    },
    computed: {
      collapsibleList: function() {
        let cl = []
        let pIdx = -1
        this.$page.unitCardsIndex.legendItems.forEach((item, index) => {
          if (item.isHeading) {
            pIdx++
            cl.push({
              parentLabel: item.label,
              parentLink: '/unidades/' + item.cardPath,
              children: []
            })
          } else {
            cl[pIdx].children.push({
              childLabel: item.label,
              childLink: '/unidades/' + item.cardPath,
              isIndented: item.name.length > 2,
              hasSeparator: item.hasSeparator,
              noHighlight: true
            })
          }
        })
        return cl
      },
      pageTitle() {
        return 'Unidades de paisaje: ' + this.$page.unitCard.title
      },
      pageImage() {
        return this.$page.unitCard.cardimage.src
      }
    }
  }

</script>
