<template>
  <div>
    <!--    <a-switch v-model="isDrawer">绘制图形</a-switch>-->
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import 'ol/ol.css'
import TileLayer from 'ol/layer/Tile';
import {OSM, Stamen, XYZ} from "ol/source";
import {View, Map, Feature} from "ol";
import VectorLayer from "ol/layer/Vector";
import {LineString, Point, Polygon} from "ol/geom";
import {fromLonLat, transform, transformExtent} from "ol/proj";
import {Icon, Text, Style, Circle, Stroke, Fill} from "ol/style";
import VectorSource from "ol/source/Vector";
import {Draw, DragBox, Select} from "ol/interaction";
import {GeoJSON} from "ol/format";
import {platformModifierKeyOnly} from 'ol/events/condition';

export default {
  name: "OlMap",
  data() {
    return {
      isDrawer: false
    }
  },
  created() {
    this.map = null;
  },
  mounted() {
    this.vectorSource = new VectorSource({
      wrapX: false
    })
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
    })
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new Stamen({
            layer: 'watercolor',

          }),
        }),
        new TileLayer({
          source: new OSM({
            wrapX: false,
          }),
        }),
        // new TileLayer({
        //   source: new XYZ({
        //     url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        //     wrapX: false
        //   })
        // }),
        this.vectorLayer
      ],
      view: new View({
        center: fromLonLat([104.912777, 34.730746]), //地图中心坐标
        zoom: 4.3,
        // smoothExtentConstraint: false,
        // showFullExtent: true,
        // extent: this.formExtent([-180, -90, 180, 90])
        // rotation: 0.5
      })
    })
    console.log('map', this.map)
    this.addEvents()
    // this.addDrawer()
    this.setCursor()
    this.addCountryBorder()

    // start: addFeature +++++
    const feature = new Feature({
      geometry: new Point(fromLonLat([116, 39])),
      name: '北京'
    })
    feature.setStyle(
      new Style({
        image: new Icon({
          src: require('@/assets/img/logo.png'),
          // anchor: [0.5, 46],
          scale: 0.2
        }),
        text: new Text({
          text: '北京',
        })
      })
    )
    this.vectorSource.addFeature(feature)
    // console.log('getS', feature.getStyle(), feature.getGeometry())
    const f2 = new Feature({
      geometry: new LineString([
        fromLonLat([-60, 20]),
        fromLonLat([45, 30])
      ]),
    });
    f2.setStyle(
      new Style({
        stroke: new Stroke({color: '#f00', width: 10}),
      })
    );
    f2.on('sClick', (e) => {
      this.$message.info('click')
      this.zoomTo(e.event.coordinate)
    })
    this.vectorSource.addFeature(f2)
    // end: addFeature +++++
  },
  methods: {
    addLabel(coordinate = []) {
      const feature = new Feature({
        geometry: new Point(coordinate),
      })
      feature.setStyle(new Style({
        text: new Text({
          text: this.transform(coordinate).map(Math.floor).join(' , '),
          stroke: new Stroke({
            color: 'red'
          })
        })
      }))
      this.vectorSource.addFeature(feature)
    },
    // 添加画图工具
    addDrawer() {
      const source = new VectorSource();
      const vector = new VectorLayer({
        source: source,
        style: new Style({
          fill: new Fill({
            color: 'rgba(155, 155, 155, 0.2)'
          }),
        })
      });
      this.map.addLayer(vector)
      const draw = new Draw({
        source: source,
        type: 'LineString',
        maxPoints: 2,
        condition: platformModifierKeyOnly,
        geometryFunction: function (coordinates, geometry) {
          // console.log('geometryFunction', coordinates, geometry )
          if (!geometry) {
            geometry = new Polygon([]);
          }
          const start = coordinates[0];
          const end = coordinates[1];
          geometry.setCoordinates([
            [start, [start[0], end[1]], end, [end[0], start[1]], start]
          ]);
          return geometry;
        },
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new Stroke({
            color: '#ffcc33',
            width: 2
          }),
          image: new Circle({
            radius: 5,
            fill: new Fill({
              color: '#ffcc33'
            })
          })
        })
      })
      this.map.addInteraction(draw)
    },
    // 添加选择交互
    addSelect() {
      const select = new Select({
        layers: (l) => {
          // console.log('layer', l.get('name'))
          return l.get('name') === 'borderLayer'
        },
        style: (feature) => {
          const white = [255, 255, 255, 1];
          const blue = [0, 153, 255, 1];
          const width = 3;
          // console.log('feature', feature.values_.name, feature.getGeometry())
          const style = [
            new Style({
              stroke: new Stroke({
                color: white,
                width: width + 2,
              }),
            }),
            new Style({
              stroke: new Stroke({
                color: 'red',
                width: width,
              }),
            }),
            new Style({
              text: new Text({
                scale: 1.5,
                text: feature.values_.name,
                fill: new Fill({
                  color: 'blue'
                }),
                stroke: new Stroke({
                  color: '#0ee162'
                }),

              }),
              fill: new Fill({
                color: [155, 155, 155, 0.5],
              }),
            })
          ]
          return style
        }
      });
      this.map.addInteraction(select);
      const selectedFeatures = select.getFeatures();
      console.log('selected', selectedFeatures)
      const dragBox = new DragBox({
        condition: platformModifierKeyOnly,
      });
      this.map.addInteraction(dragBox);
      dragBox.on('boxend', () => {
        // features that intersect the box geometry are added to the
        // collection of selected features

        // if the view is not obliquely rotated the box geometry and
        // its extent are equalivalent so intersecting features can
        // be added directly to the collection
        const rotation = this.map.getView().getRotation();
        const oblique = rotation % (Math.PI / 2) !== 0;

        const candidateFeatures = oblique ? [] : selectedFeatures;
        const extent = dragBox.getGeometry().getExtent();

        const getJiaoDu = (s = 361) => {
          const yushu = s % 360 // 1
          if (yushu > 180) {
            return -Math.abs(360 - yushu)
          } else if (yushu < -180){
            return Math.abs(yushu + 360)
          } else {
            return yushu
          }
        }
        // this.formExtent(this.transform(extent).map(i => i % 180))
        const tempExtent = this.transform(extent).map((item, i) => {
          if (i % 2 === 0) {
            // return item - 360 * Math.floor((item + 180) / 360)
            return getJiaoDu(item)
          }
          return item
        })
        const transExtent = this.formExtent(tempExtent)

        this.borderSource.forEachFeatureIntersectingExtent(transExtent, function (feature) {
          candidateFeatures.push(feature);
        });
        console.log('drag-extent1', tempExtent, transExtent, candidateFeatures)

        // when the view is obliquely rotated the box extent will
        // exceed its geometry so both the box and the candidate
        // feature geometries are rotated around a common anchor
        // to confirm that, with the box geometry aligned with its
        // extent, the geometries intersect
        if (oblique) {
          const anchor = [0, 0];
          const geometry = dragBox.getGeometry().clone();
          geometry.rotate(-rotation, anchor);
          const extent = geometry.getExtent();
          candidateFeatures.forEach(function (feature) {
            const geometry = feature.getGeometry().clone();
            geometry.rotate(-rotation, anchor);
            if (geometry.intersectsExtent(extent)) {
              selectedFeatures.push(feature);
            }
          });
        }
      });

      dragBox.on('boxstart', function () {
        selectedFeatures.clear();
      });

    },
    setCursor() {
      this.map.on('pointermove', (e) => {
        const hit = this.map.hasFeatureAtPixel(e.pixel);
        if (hit) {
          this.map.getTargetElement().style.cursor = 'pointer';
        } else {
          this.map.getTargetElement().style.cursor = '';
        }
      });
    },
    addEvents() {
      this.map.on('click', (e) => {
        console.log('mapClick', this.transform(e.coordinate), e.pixel)
        this.addLabel(e.coordinate)
        this.map.forEachFeatureAtPixel(e.pixel, (fea) => {
          console.log('forEachFeatureAtPixel', fea)
          fea.dispatchEvent({type: 'sClick', event: e})
        })
      })
    },
    transform(coordinate = []) {
      return (coordinate.length === 4 ? transformExtent : transform)(coordinate, 'EPSG:3857', 'EPSG:4326')
    },
    formExtent(extent) {
      return transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
    },
    zoomTo(center = []) {
      const view = this.map.getView()
      view.animate({
        center: center,
        zoom: view.getZoom() + 1,
        // duration: 3
      })
      // view.setZoom(view.getZoom() + 1)
      // view.setCenter(center)
    },
    addCountryBorder() {
      this.borderSource = new VectorSource({
        url: 'data/geojson/countries.geojson',
        format: new GeoJSON(),
        // wrapX: false,
      })
      const vectorLayer = new VectorLayer({
        source: this.borderSource,
        style: (feature, resolution) => {
          // console.log('features', feature.values_, resolution)
          return [
            new Style({
              fill: new Fill({
                color: 'rgba(255,255,255,0.4)',
              }),
              stroke: new Stroke({
                color: 'red'
              })
            })
          ]
        },
      })
      vectorLayer.set('name', 'borderLayer')
      this.map.addLayer(vectorLayer)
      this.addSelect()
    }
  }
}
</script>

<style scoped lang="less">
#map {
  height: 600px;
  width: 100%;
}
</style>
