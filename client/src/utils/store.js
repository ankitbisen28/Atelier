import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'



const useAppStore = create(
    persist(
        (set, get) => ({
            cart: [],
            fav: [],
            addToCart:(elem)=>{
                if (cart.length < 1) {
                    set({cart:[...state.cart , elem]});
                }
                else{
                    state.cart.forEach(element => {
                        // element logic 
                        // compare with product id
                    });

                    // push element
                }
            }
        }),
        {
            name: 'app-store', // name of the item in the storage (must be unique)
        },
    ),
)

export {useAppStore}