import { createStore } from "vuex";
import coachesModule from './modules/coaches/index.js'
const store = createStore({
    // modules:modules or just modules:
    modules:{
        coaches: coachesModule
    }
});
export default store;