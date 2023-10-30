import { createStore } from "vuex"
 
export default createStore({
    state() {
        return {
            messages: []
        }
    },
 
    mutations: {
        appendMessage (state, newMessage) {
            state.messages.push(newMessage)
        },
 
        prependMessage (state, newMessage) {
            state.messages.unshift(newMessage)
        },
 
        setMessages (state, newMessages) {
            state.messages = newMessages
        },
    },
 
    getters: {
        getMessages (state) {
            return state.messages
        }
    }
})