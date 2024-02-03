import { defineStore } from 'pinia'

export const Saved = defineStore('Saved', () => {
   
        const Client =JSON.parse(localStorage.getItem('Client'));
    },
    {
        persist:true
    }
    
  )