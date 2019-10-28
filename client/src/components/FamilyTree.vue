<template>
  <v-row class="fill-height">
    <v-col v-if="$vuetify.breakpoint.mdAndUp || tree" class="family-tree-container" :style="{ 'margin-bottom': margin }" cols="12" md="6">
      <svg class="family-tree pa-1">
        <FamilyGeneration
          v-if="parents"
          :members="parents"
          y="0%"
          height="22%"
          @select="onSelect"
        />
        <FamilyUnion
          v-if="typeof parentMarriage === 'boolean'"
          :divorced="parentMarriage"
          y="0%"
          height="22%"
        />
        <FamilyPath
          v-if="parents && current"
          :connections="parents.length"
          :pull="hasSignificantOthers"
          y="23%"
          height="15%"
        />
        <FamilyGeneration
          v-if="current"
          :members="current"
          y="39%"
          height="22%"
          @select="onSelect"
          @cycle="onCycle"
          firstIsEgo
        />
        <FamilyUnion
          v-if="typeof marriage === 'boolean'"
          :divorced="marriage"
          y="39%"
          height="22%"
        />
        <FamilySpouseCycle
          v-if="allSignificantOthers && allSignificantOthers.length > 1 && selectedSigificantOtherIndex === 0"
          x="80%"
          y="47%"
          width="20%"
          height="6%"
          @cycle="onCycle"
        />
        <FamilySpouseCycle
          v-if="allSignificantOthers && allSignificantOthers.length > 1 && selectedSigificantOtherIndex > 0"
          x="50%"
          y="47%"
          width="20%"
          height="6%"
          left
          @cycle="onCycle"
        />
        <FamilyPath
          v-if="children && current"
          :connections="children.length"
          :currentConnections="current.length"
          lower
          y="62%"
          height="15%"
        />
        <FamilyGeneration
          v-if="children"
          :members="children"
          y="78%"
          height="22%"
          @select="onSelect" 
        />
      </svg>
    </v-col>
    <v-col v-if="$vuetify.breakpoint.mdAndUp || text" class="family-tree-container" :style="{ 'margin-bottom': margin }" cols="12" md="6">
      <div class="family-tree pa-3">
        <p>{{ buildInfo(current && current[0]) }}</p>
        <v-expansion-panels v-if="relations.length > 0">
          <v-expansion-panel v-for="(relation, i) in relations" :key="i">
            <v-expansion-panel-header>{{ relation.title }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list>
                <v-list-item @click="onSelect(member.id)" v-for="member in relation.members" :key="member.id">
                  {{ member.nickname || member.first_name }} {{ member.last_name }}
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-col>
    <v-footer absolute v-if="$vuetify.breakpoint.smAndDown">
      <v-row justify="center">
        <v-btn text :color="tree ? 'primary' : 'secondary'" @click="tree = !(text = false)">
          <v-icon left>nature</v-icon> Tree View
        </v-btn>
        <v-btn text :color="text ? 'primary' : 'secondary'" @click="text = !(tree = false)">
          <v-icon left>format_list_bulleted</v-icon> Text View
        </v-btn>
      </v-row>
    </v-footer>
  </v-row>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import FamilyGeneration from './FamilyGeneration';
import FamilyPath from './FamilyPath';
import FamilyUnion from './FamilyUnion';
import FamilySpouseCycle from './FamilySpouseCycle';

export default {
  components: {
    FamilyGeneration,
    FamilyPath,
    FamilySpouseCycle,
    FamilyUnion
  },
  name: 'FamilyTree',
  data () {
    return {
      allChildren: null,
      allSignificantOthers: null,
      parentMarriage: null,
      parents: null,
      current: null,
      hasSignificantOthers: false,
      selectedSigificantOther: null,
      selectedSigificantOtherIndex: 0,
      spouses: null,
      text: false,
      tree: true
    }
  },
  computed: {
    children () {
      const { selectedSigificantOther, allChildren } = this;
      if (selectedSigificantOther && allChildren) {
        const children = allChildren.filter(({ other_parent_id: id }) => id === selectedSigificantOther.id);
        return children && children.length > 0 ? children : null;
      }
      return allChildren;
    },
    margin () {
      return this.$vuetify.breakpoint.mdAndUp ? '0' : '48px';
    },
    marriage () {
      const { selectedSigificantOther } = this;
      return selectedSigificantOther && selectedSigificantOther.divorced;
    },
    relations () {
      const relations = [];
      const { spouses, parents, allChildren } = this;
      if (spouses) {
        relations.push({ title: 'Spouses', members: spouses });
      }
      if (parents) {
        relations.push({ title: 'Parents', members: parents });
      }
      if (allChildren) {
        relations.push({ title: 'Children', members: allChildren });
      }
      return relations;
    }
  },
  methods: {
    buildInfo (ego) {
      let info = '';
      if (ego) {
        info += ego.first_name;
        if (ego.middle_name) {
          info += ` ${ego.middle_name}`;
        }
        info += ` ${ego.last_name}`;
        if (ego.birth_date) {
          info += `, born ${moment(ego.birth_date).format('ll')}`;
        }
        if (ego.death_date) {
          info += `, died ${moment(ego.death_date).format('ll')}`;
        }
      }
      return info;
    },
    onSelect (id) {
      this.$router.push({ path: `/familytree/${id}` });
    },
    async load () {
      const { id } = this.$route.params;
      const {
        data: {
          babyParents,
          ego,
          parentMarriage,
          parents,
          spouses,
          children
        }
      } = await axios.get(`/api/familytree/${id || 2}`);
      this.parents = (parents && parents.length > 0) ? parents : null;
      this.allChildren = (children && children.length > 0) ? children : null;
      const current = [ego];
      const significantOthers = [];
      this.spouses = spouses;
      if (spouses) {
        significantOthers.push(...spouses);
      }
      if (babyParents) {
        significantOthers.push(...babyParents);
      }
      const hasSignificantOthers = significantOthers.length > 0;
      if (hasSignificantOthers) {
        const [significantOther] = significantOthers;
        current.push(significantOther);
        this.selectedSigificantOther = significantOther;
      } else {
        this.selectedSigificantOther = null;
      }
      this.selectedSigificantOtherIndex = 0;
      this.current = current;
      this.allSignificantOthers = significantOthers;
      this.hasSignificantOthers = hasSignificantOthers;
      this.parentMarriage = parentMarriage;
    },
    onCycle (num) {
      const { allSignificantOthers, selectedSigificantOther } = this;
      if (allSignificantOthers && selectedSigificantOther) {
        const newIndex = allSignificantOthers.indexOf(selectedSigificantOther) + num;
        const newSignificantOther = allSignificantOthers[newIndex];
        if (newSignificantOther) {
          this.current = [this.current[0], newSignificantOther];
          this.selectedSigificantOther = newSignificantOther;
          this.selectedSigificantOtherIndex = newIndex;
        }
      }
    }
  },
  props: {

  },
  created () {
    this.load();
  },
  watch: {
    $route: 'load'
  }
}
</script>

<style lang="scss">
.family-tree-container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
}
.family-tree {
  flex: 1;
  max-width: 500px;
}
</style>
