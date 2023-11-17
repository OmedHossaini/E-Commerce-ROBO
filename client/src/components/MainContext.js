import { createContext,useReducer } from "react";  

const initialState = {  
    itemsIndex: {},
    companiesIndex: {},
    items: [],
    companies: [],
    cart: [],
  };
 
const reducer = (state, action) => { 
     
    switch(action.type) {
    case 'receive-item-info-from-server': {
      const _tempItemsIndex = {};
      const _tempItemsArray= []; 
      for (let _i = 0; _i < Object.keys(action.data).length; _i +=1)
      { 
        const _item = action.data[String(_i)]; 
        if (_item === undefined) {console.log("the i",_i);}
        _tempItemsArray[_i] = {..._item};
        _tempItemsIndex[_item._id] = _i;  
        
      }    
      console.log(_tempItemsArray);

        return {
          ...state,
          items: _tempItemsArray,
          itemsIndex: _tempItemsIndex,
        } 
        
    }
      

    default: {
              throw new Error(`Unrecognized action: ${action.type}`);
        }
    }

}

export const MainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

    const receiveItemInfoFromServer = (data) => {
      dispatch({
        type: "receive-item-info-from-server",
        data: {...data},
      }); 
    }; 

    const inputSearch = (data) => {
      dispatch({
        type:"input-search",
        data:{...data},
      });

    }

    const addToCart = (data) => {
      dispatch({
        type: "add-to-cart",
        data: {...data},
      }); 
    }; 

    const checkoutPurchase = (data) => {
      dispatch({
        type: "checkout-purchase",
        data: {...data},
      }); 
    }; 

  return (
    <MainContext.Provider
      value={{
        state,
        actions: { 
          addToCart,
          receiveItemInfoFromServer,
          checkoutPurchase,
        },
      }}
    >
      {children}
    </MainContext.Provider>
  );
};



export const MainContext = createContext();
