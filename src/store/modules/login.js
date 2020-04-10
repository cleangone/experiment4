import { Auth } from 'aws-amplify';

const NAME = 'name'
const FAMILY_NAME = 'family_name'
const PHONE = 'phone_number'

function UserObj(firstName, lastName, phoneAttribute) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = (phoneAttribute == null ? null : phoneAttribute.substring(2));
    
    if (this.phone != null && this.phone.length == 10) { 
        this.phone = this.phone.substring(0,3) + "-" + this.phone.substring(3,6) + "-" + this.phone.substring(6)
    }

    this.getAttributes = function() { 
        return { 
            name:this.firstName, 
            family_name:this.lastName, 
            phone_number:this.phoneDisplayToAttribute() }
    }

    this.phoneDisplayToAttribute = function() { 
        return (this.phone == null ? null : "+1" + this.phone.replace("-", "").replace("-", ""));
    }
}

// user.username looks like an ID because accounts are set up with email
const state = {
    user: null,
    userInfo: null
};

const getters = {
    isSignedIn:(state) => { return state.user != null },
    getUserId:(state)  => { return (state.user == null ? null : state.user.username) },

    getUser:(state) => { 
        return (state.userInfo == null ? 
            new UserObj(null, null, null) :
            new UserObj(state.userInfo.attributes[NAME], state.userInfo.attributes[FAMILY_NAME], state.userInfo.attributes[PHONE]))
    },

    getFirstName:(state) => { return (state.userInfo == null ? null : state.userInfo.attributes[NAME]) }
};

// actions: do an action and then call a mutation to mutate the state
const actions = {
    async findUser({ commit }) {
      try {
        const user = await Auth.currentAuthenticatedUser();
        try {
            const userInfo = await Auth.currentUserInfo()
            commit('SET_AUTH_USER', user) 
            commit('SET_AUTH_USER_INFO', userInfo) 
        } catch (err) {
            console.log('error fetching user info: ', err);
            commit('SET_AUTH_USER', null) 
            commit('SET_AUTH_USER_INFO', null) 
        }
      }
      catch(e) {
        console.log('user not logged in');
            commit('SET_AUTH_USER', null) 
            commit('SET_AUTH_USER_INFO', null) 
      }
    },
    async logout ({ commit } ) { 
            commit('SET_AUTH_USER', null) 
            commit('SET_AUTH_USER_INFO', null) 
    },
    async updateUser ({ commit }, userObj ) { 
        let result = await Auth.updateUserAttributes(state.user, userObj.getAttributes());
        if (result == "SUCCESS")
        {
            try {
                const userInfo = await Auth.currentUserInfo()
                commit('SET_AUTH_USER_INFO', userInfo) 
            } catch (err) {
                console.log('error fetching user info after update: ', err);
                commit('SET_AUTH_USER', null) 
                commit('SET_AUTH_USER_INFO', null) 
            }
        }
    }
}; 

const mutations = {
    SET_AUTH_USER: (state, user) => { 
        state.user = (user == null ? null : user)
    },
    SET_AUTH_USER_INFO: (state, userInfo) => { 
        state.userInfo = (userInfo == null ? null : userInfo)
    }
}

export default {
    state,
    getters, 
    actions,
    mutations
}


