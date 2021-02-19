<template>
    <section id="feed-cookie">
        <header>
            <h1>Feed Cookie</h1>
        </header>
          <h2 v-if="timeDifference">{{ msToTime(this.maxTime - this.timeDifference) }}</h2>
        <div id="input-area">
          <button @click="addUser">Neuer Cookie-Feeder</button>
          <input type="text" v-model="enterUserValue">
          <!-- delet section -->
          <button @click="deletUser">Delet Cookie-Feeder</button>
          <select v-model="deselectedUser">
            <option disabled value="null">Name auswählen</option>
            <option
              :value="user" 
              :key="user.id"
              v-for="user in users">{{ user.name }}
            </option>
          </select>
          
       
          <!-- <button @click="deselectedUser"></button> -->
          <button @click="addFeeding">Füttern</button>
          <select v-model="selectedUser">
            <option disabled value="null">Name auswählen</option>
          <option
            :value="user" 
            :key="user.id"
            v-for="user in users">{{ user.name }}
          </option>
          </select>
          
        </div>
        <ul>
            <feed-cookie
            v-for="feeding in feedings"
            :feeding="feeding"
            :key="feeding.hour">
            </feed-cookie>
          </ul>
    </section>
</template>

<script>

import FeedCookie from './components/FeedCookie.vue'
// import FeedingPersons from './components/FeedingPersons.vue';
export default {
  components: { FeedCookie},
    data() {
        return {
            users: [
              {
                id: 1,
                name: 'Günter'
              },
              {
                id: 2,
                name: 'Patrick'
              }
            ],

            selectedUser: null,
            enterUserValue: '',
            deselectedUser: null,

            enteredNameValue: '',
            hour: 0,
            feedings: [],
            timeDifference: 0,
            maxTime: 18000000
        }
    },
    methods: {
        deletUser() {
          this.users = this.users.filter((user) => {
            if (this.deselectedUser && this.deselectedUser.id != user.id ) {
              console.log(user);
              return user;
            }
            console.log(this.deselectedUser);
            this.deselectedUser = null;
          });
        },
        addUser() {
          if (!this.enterUserValue) {
            console.log(this.enterUserValue);
            return;
          }
          const user = {
            id: this.users[this.users.length - 1].id + 1,
            name: this.enterUserValue
          }
          this.users.push(user);
          console.log(user);

          this.saveItems();

          this.enterUserValue = '';
        },
        msToTime(timeDifference) {
          
            let seconds = Math.floor((timeDifference / 1000) % 60),
                minutes = Math.floor((timeDifference / (1000 * 60)) % 60),
                hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);

                hours = (hours < 10) ? "0" + hours : hours;
                minutes = (minutes < 10) ? "0" + minutes : minutes;
                seconds = (seconds < 10) ? "0" + seconds : seconds;
                if (timeDifference >= 0) {
                    return `Noch ${hours}:  ${minutes}: ${seconds} bis zur Fütterung!` 
                } else {
                  return 'Bitte Katze füttern!!!';
                }
        }, 

        updateLastFeeding(lastFeeding) {
            this.timeDifference = new Date() - lastFeeding;
            // console.log(lastFeeding);
            // console.log(lastFeeding);
            // console.log(this.timeDifference);
        },
        addFeeding() {
          if (!this.selectedUser) {
            return
          }
            const feeding = {
                user: this.selectedUser,
                hour: new Date().toLocaleString('DE'),
                timeInHours: new Date()
            };
            // console.log(feeding);

            this.updateLastFeeding(feeding.timeInHours);


            this.feedings.unshift(feeding);

            this.saveItems();
        },

        saveItems() {
            const feedings = JSON.stringify(this.feedings);
            localStorage.setItem('key', feedings);

            const users = JSON.stringify(this.users);
            localStorage.setItem('id', users);
        },

        getItems() {
            const items = localStorage.getItem('key');
            if (items) { 
                this.feedings = JSON.parse(items);
                const a = new Date(this.feedings[0].timeInHours) 
                this.updateLastFeeding(a);
                
            }

            const users = localStorage.getItem('id');
            if (users) {
               this.users = JSON.parse(users);
            }
        },
    },

    created() {
        this.getItems();
        setInterval(() => {
            const a = new Date(this.feedings[0].timeInHours) 
            this.updateLastFeeding(a);
        }, 1000)
    },

    
}
</script>


<style>
  * {
  box-sizing: border-box;
}

html {
  display: flex;
  justify-content: center;
  background-color: #ffffff;
}

body {
  font-family: 'Jost', sans-serif;
  margin: 0;
  width: 50%;
  height: 100%;

  display: flex;
  justify-content: center;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem;
  border-radius: 10px;
  padding: 1rem;
  background-color: #ff944d;
  color: white;
  text-align: center;
}

#input-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 200px;
  max-width: 70%;
  min-width: 70%;
  margin: 0 auto;
}

#feed-cookie {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  background-color: #f4f4f4;
  min-width: 360px;
}

/* #feed-cookie {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
} */

h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #ff944d;
  margin: 0 0 1rem 0;
}

#feed-cookie#auswahl {
  display: flex;
  /* flex-direction: column; */
  margin: 20px;
  max-width: 200px;
  justify-content: space-around;
  align-items: center;
}

#feed-cookie ul {
  list-style: none;
  margin: 1rem 0;
  padding: 0;
}

#feed-cookie li {
  margin: 1rem 0;
  font-size: 1.25rem;
  font-weight: bold;
  background-color: #ff944d;
  padding: 0.5rem;
  color: #1f1f1f;
  border-radius: 25px;
}

#feed-cookie input {
  font: inherit;
  border: 1px solid #ccc;
}

#feed-cookie input:focus {
  outline: none;
  border-color: #ff944d;
  background-color: #d7fdeb;
}

#feed-cookie button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #ff944d;
  background-color: #ff944d;
  color: white;
  padding: 0.05rem 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
}

#feed-cookie button:hover,
#feed-cookie button:active {
  background-color: #f0bd9b;
  border-color: #ff944d;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
} 

#feed-cookie h2 {
  font-size: 1.5rem;
  border-bottom: 4px solid #ccc;
  color: #ff944d;
  margin: 0 0 1rem 0;
}

#feed-cookie p {
  margin-top: 0;
  margin-bottom: 0;
}

#feed-cookie ul {
  list-style: none;
  margin: 1rem 0;
  padding: 0;
}

#feed-cookie li {
  margin: 1rem 0;
  font-size: 1.25rem;
  font-weight: bold;
  background-color: #ff944d;
  padding: 0.5rem;
  color: #ffffff;
  border-radius: 25px;
}

#feed-cookie input {
  font: inherit;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

#feed-cookie input:focus {
  outline: none;
  border-color: #ff944d;
  background-color: #ebd9a8;
  
}

#feed-cookie button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #ff944d;
  background-color: #ff944d;
  color: white;
  padding: 0.05rem 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
}

#feed-cookie button:hover,
#feed-cookie button:active {
  background-color: #f0bd9b;
  border-color: #ff944d;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

#feed-cookie select {
  margin-bottom: 20px;
}
</style>