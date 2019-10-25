import VueRouter from 'vue-router';

import FamilyTree from './components/FamilyTree';
import Members from './components/Members';
import Member from './components/Member';
import Login from './components/Login';
import History from './components/History';
import Writings from './components/Writings';
import Writing from './components/Writing';

import SnapshotForm from './components/SnapshotForm';
import HistoryForm from './components/HistoryForm';

const routes = [
  { path: '/', redirect: '/members' },
  { path: '/login', component: Login },
  { path: '/members', component: Members },
  { path: '/members/:id', component: Member, meta: { editUrl: true } },
  { path: '/writings', component: Writings },
  { path: '/writings/:id', component: Writing },
  { path: '/history', redirect: '/history/1' },
  { path: '/history/:id', component: History, meta: { editUrl: true } },
  { path: '/familytree', redirect: '/familytree/2' },
  { path: '/familytree/:id', component: FamilyTree },

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
