import { Auth } from 'aws-amplify';

const ADMIN_GROUP_NAME = 'Admin'
const NAME = 'name'
const FAMILY_NAME = 'family_name'
const PHONE = 'phone_number'

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

        // groups assigned at signin - not dynamically updated
        var groups = state.user.signInUserSession.accessToken.payload["cognito:groups"]
        for (var i in groups) {
            if (ADMIN_GROUP_NAME === groups[i])  { return true }
        }

        return false    
    },
    getFirstName:(state) => { return (state.userInfo == null ? null : state.userInfo.attributes[NAME]) },
    getLastName:(state) => { return (state.userInfo == null ? null : state.userInfo.attributes[FAMILY_NAME]) },
    getPhone:(state) => { 
        if (state.userInfo == null) { return null }
        
        var phone = state.userInfo.attributes[PHONE]
        if (phone != null) { 
            phone = phone.substring(2); // remove country code (i.e. "+1")
            if (phone.length == 10) { 
                phone = phone.substring(0,3) + "-" + phone.substring(3,6) + "-" + phone.substring(6)
            }
        }
        
        return phone;
    }
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
        commit('SET_AUTH_USER', null) 
        commit('SET_AUTH_USER_INFO', null) 
    },
    async updateUser ({ dispatch }, user ) { 
        // sparse update
        var attributes = { }
        if (user.firstName != null) { attributes[NAME] = user.firstName }
        if (user.lastName != null) { attributes[FAMILY_NAME] = user.lastName }
        if (user.phone != null) { attributes[PHONE] = "+1" + user.phone.replace("-", "").replace("-", "") }

        let result = await Auth.updateUserAttributes(state.user, attributes);
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


