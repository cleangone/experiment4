import { Auth } from 'aws-amplify';

const ADMIN_GROUP_NAME = 'Admin'
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

// user.username looks like an ID because accounts are set up with email, thus it is generated
const state = {
    user: null,
    userInfo: null
};

const getters = {
    isSignedIn:(state) => { return state.user != null },
    getUserId:(state)  => { return (state.user == null ? null : state.user.username) },
    isAdmin:(state)  => { 
        if (state.user == null) return false;

        // these are the groups assigned at signin - not dynamically updated
        var groups = state.user.signInUserSession.accessToken.payload["cognito:groups"]
        for (var i in groups) {
            if (ADMIN_GROUP_NAME === groups[i])  { return true }
        }

        return false    
    },
    getUser:(state) => { 
        return (state.userInfo == null ? 
            new UserObj(null, null, null) :
            new UserObj(state.userInfo.attributes[NAME], state.userInfo.attributes[FAMILY_NAME], state.userInfo.attributes[PHONE]))
    },

    getFirstName:(state) => { return (state.userInfo == null ? null : state.userInfo.attributes[NAME]) }
};

const actions = {
    async findUser({ commit, dispatch }) {
      try {
        const user = await Auth.currentAuthenticatedUser();
        commit('SET_AUTH_USER', user) 
        dispatch('getCurrentUserInfo')
      }
      catch(e) {
        console.log('Error calling Auth.currentAuthenticatedUser: ', e);
        dispatch('logout')
      }
    },
    async logout ({ commit } ) { 
        alert("logging out")
        commit('SET_AUTH_USER', null) 
        commit('SET_AUTH_USER_INFO', null) 
    },
    async updateUser ({ dispatch }, userObj ) { 
        let result = await Auth.updateUserAttributes(state.user, userObj.getAttributes());
        if (result == "SUCCESS") {
           dispatch('getCurrentUserInfo')
        }
    },
    async getCurrentUserInfo ({ commit, dispatch } ) { 
        try {
            const userInfo = await Auth.currentUserInfo()
            commit('SET_AUTH_USER_INFO', userInfo) 
        } catch (err) {
            console.log('Error calling Auth.currentUserInfo: ', err);
            dispatch('logout')
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


