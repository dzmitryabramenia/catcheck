import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import store from '../store'
import { Store } from 'vuex';
import state from 'src/store/modules/state';


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */


export default route(function (/* { store, ssrContext } */) {
  
   const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({

    scrollBehavior: (to, from, savedPosition) => { 
      if (to.hash) {

        
            //store().state.allTokens
            return {
              el: to.hash,
              top: 57,
              behavior: 'smooth'
            }
         
            // const data = store().state.options1
            // resolve(data)

          
       
/*         p.then(() => {
          console.log('Hello Router')
          return {
           
          }
        }) */

/*         console.log('to.hash else if ', to.hash)
        return {
          el: to.hash,
          top: 51,
          behavior: 'smooth',
        } */
      } else {
        return {left: 0, top: 0}
      }
    },
    /* scrollBehavior(to, from, savedPosition) {
      console.log(savedPosition)
      if (savedPosition) {
        return savedPosition;
      } else if (to.hash) {
        console.log('to.hash else if ', to.hash)
        return {
          selector: to.hash,
          behavior: 'smooth',
        }
      } else {
        return {x: 0, y: 100}
      }
    },  */
    mode: 'history',
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from, next) => {
    const auth = to.meta.requiresAuth
    if (auth && !await firebase.getCurrentUser()) {
      next('/');
    } else {
      next();
    }
  })



  return Router
})

