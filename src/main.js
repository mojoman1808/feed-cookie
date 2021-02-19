import {createApp} from 'vue';

import App from './App.vue';
import FeedCookie from './components/FeedCookie.vue';
import FeedingPersons from './components/FeedingPersons.vue';

const app = createApp(App);
app.component('feed-cookie', FeedCookie);
app.component('feeding-persons', FeedingPersons);

app.mount('#app');