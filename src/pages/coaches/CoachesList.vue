<template>
  <div>
    <base-dialog :show='!!error' @close='handleError'>
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter='setFilters'></coach-filter>
    </section>
    <section>
      <base-card>
        <div class='controls'>
          <base-button mode='outline' @click='loadCoaches'>Refresh</base-button>
          <router-link to='/auth?redirect=register'>
            <base-button v-if='!isLoggedIn'>Login to Register as coach</base-button>
          </router-link>
          <base-button v-if='!isCoach && !isLoading && isLoggedIn' link to='/register'>Register as Coach</base-button>
        </div>
        <div v-if='isLoading'>
          <base-spinner></base-spinner>
        </div>
        <ul v-if='hasCoaches'>
          <coach-item v-for='coach in filteredCoaches' :key='coach.id' :id='coach.id' :first-name='coach.firstName'
                      :last-name='coach.lastName' :rate='coach.hourlyRate' :areas='coach.areas'></coach-item>
        </ul>
        <h3 v-else>
          No coaches Available
        </h3>
      </base-card>
    </section>
  </div>
</template>
<script>
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import CoachItem from '../../components/coaches/CoachItem.vue';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';
import BaseButton from '@/components/ui/BaseButton.vue';


export default {
  components: {
    BaseButton,
    BaseSpinner,
    CoachItem,
    CoachFilter
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilter: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isCoach() {
      // console.log(this.$store.getters['coaches/isCoach']);
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      // console.log(coaches);
      return coaches.filter(coach => {
          if (coach.areas.includes('frontend') && this.activeFilter.frontend) {
            return true;
          }
          if (coach.areas.includes('backend') && this.activeFilter.backend) {
            return true;
          }
          if (coach.areas.includes('career') && this.activeFilter.career) {
            return true;
          }
          // console.log(coach)

          return false;

        }
      );
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    }

  },
  created() {
    // console.log(this.loadCoaches())
    this.loadCoaches();
  },
  methods: {
    setFilters(updateFilters) {
      this.activeFilter = updateFilters;
    },
    async loadCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches');
      } catch (e) {
        this.error = e;
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>