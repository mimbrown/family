import VueRouter from 'vue-router';

import FamilyTree from './components/FamilyTree';
import Members from './components/Members';
import Member from './components/Member';
import Login from './components/Login';
import History from './components/History';
import Writings from './components/Writings';
import Writing from './components/Writing';

import SnapshotForm from './components/forms/SnapshotForm';
import HistoryForm from './components/forms/HistoryForm';

const routes = [
  { path: '/', redirect: '/members' },
  { path: '/login', component: Login },
  { path: '/members', component: Members },
  { path: '/members/:id', component: Member, meta: { tools: [
    { icon: 'create', fn: 'startEditing' }
  ], full: true } },
  { path: '/writings', component: Writings },
  { path: '/writings/:id', component: Writing, meta: { tools: ['list'] } },
  { path: '/history', redirect: '/history/1' },
  { path: '/history/:id', component: History, meta: { tools: [
    { icon: 'create', fn: 'startEditing' },
    { icon: 'add', fn: 'addNew' }
  ] } },
  { path: '/familytree', redirect: '/familytree/2' },
  { path: '/familytree/:id', component: FamilyTree, meta: { fullscreen: true } },

  { path: '/edit/members/:id', component: SnapshotForm },
  { path: '/edit/history/:id', component: HistoryForm }
];

const router = new VueRouter({ routes });

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') {
    return next();
  }
  const token = window.localStorage.getItem('accessToken');
  if (token) {
    return next();
  }
  next('/login');
});

export default router;
