<template>
  <v-layout column>
    <v-flex family-tree-container pa-3>
      <svg v-if="view === 'tree'" class="family-tree">
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
      <div v-else-if="view === 'text'" class="family-tree">
        <p>{{ buildInfo(current && current[0]) }}</p>
        <v-expansion-panel>
          <v-expansion-panel-content v-if="spouses">
            <template v-slot:header>
              <div>Spouses</div>
            </template>
            <v-list>
              <v-list-tile @click="onSelect(member.id)" v-for="member in spouses" :key="member.id">
                {{ member.nickname || member.first_name }} {{ member.last_name }}
              </v-list-tile>
            </v-list>
          </v-expansion-panel-content>
          <v-expansion-panel-content v-if="parents">
            <template v-slot:header>
              <div>Parents</div>
            </template>
            <v-list>
              <v-list-tile @click="onSelect(member.id)" v-for="member in parents" :key="member.id">
                {{ member.nickname || member.first_name }} {{ member.last_name }}
              </v-list-tile>
            </v-list>
          </v-expansion-panel-content>
          <v-expansion-panel-content v-if="allChildren">
            <template v-slot:header>
              <div>Children</div>
            </template>
            <v-list>
              <v-list-tile @click="onSelect(member.id)" v-for="member in allChildren" :key="member.id">
                {{ member.nickname || member.first_name }} {{ member.last_name }}
              </v-list-tile>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </div>
    </v-flex>
    <v-bottom-nav
      :active.sync="view"
      :value="true"
      absolute
      mandatory
      color="transparent"
    >
      <v-btn value="tree">
        <span>Tree View</span>
        <v-icon>nature</v-icon>
      </v-btn>
      <v-btn value="text">
        <span>Text View</span>
        <v-icon>format_list_bulleted</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-layout>
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
      view: 'tree'
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
    marriage () {
      const { selectedSigificantOther } = this;
      return selectedSigificantOther && selectedSigificantOther.divorced;
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
  margin-bottom: 56px;
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
